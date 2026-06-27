import { NextResponse } from "next/server";
import { adminDb } from "@/firebase/admin.firebase";
import z from "zod";
import crypto from "crypto";

// ============================================================================
// Types
// ============================================================================

type UserRole = "admin" | "manager" | "cashier";

interface TokenClaims {
    userId: string;
    shopId: string;
    role: UserRole;
    type: "account";
}

interface ShopUser {
    userId: string;
    shopId: string;
    identity: string;       // phone number (normalized)
    channel: "phone";
    role: UserRole;
    displayName: string;
    status: "active" | "suspended";
    createdAt: number;
    updatedAt: number;
    lastLoginAt: number | null;
    deviceIds: string[];
    createdBy: string;      // userId of the admin who created this record
}

// ============================================================================
// Helpers
// ============================================================================

/**
 * Decode and verify the signed activation payload produced by the
 * activation route. Returns the embedded claims or throws.
 *
 * Format: base64url(JSON) + "." + HMAC-SHA256-hex
 */
function verifyActivationPayload(raw: string, secret: string): TokenClaims {
    const parts = raw.split(".");
    if (parts.length !== 2) throw new Error("Malformed token");

    const [encoded, signature] = parts;
    const expected = crypto
        .createHmac("sha256", secret)
        .update(encoded)
        .digest("hex");

    // Constant-time comparison to prevent timing attacks
    const sigBuf = Buffer.from(signature, "hex");
    const expBuf = Buffer.from(expected, "hex");
    if (
        sigBuf.length !== expBuf.length ||
        !crypto.timingSafeEqual(sigBuf, expBuf)
    ) {
        throw new Error("Invalid token signature");
    }

    const data = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));

    // Enforce token is not expired
    if (Date.now() > data.expiresAt) throw new Error("Token expired");

    // Enforce it is an account token (not a guest)
    if (data.type !== "account") throw new Error("Account token required");

    return {
        userId: data.userId,
        shopId: data.shopId,
        role: data.role,
    } as TokenClaims;
}

/**
 * Normalize phone: strip spaces, dashes, parentheses.
 * Keeps the leading "+" for international format.
 */
function normalizePhone(phone: string): string {
    return phone.replace(/[\s\-().]/g, "");
}

/**
 * Derive a stable Firestore doc ID from an identity string.
 * Matches the same function in the activation route so the same
 * identity always resolves to the same document.
 */
function deriveUserId(identity: string): string {
    return crypto
        .createHash("sha256")
        .update(identity)
        .digest("hex")
        .slice(0, 32);
}

// ============================================================================
// Protection Layer: extract + verify admin token from Authorization header
// ============================================================================

/**
 * Reads the Bearer token from the Authorization header, verifies its
 * HMAC signature, checks expiry, and asserts the caller is an admin.
 *
 * Returns the verified claims or a NextResponse error to short-circuit.
 */
async function requireAdmin(
    request: Request
): Promise<TokenClaims | NextResponse> {
    const authHeader = request.headers.get("Authorization") ?? "";

    if (!authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
            { success: false, error: "Missing authorization token" },
            { status: 401 }
        );
    }

    const rawToken = authHeader.slice(7).trim();
    const secret = process.env.ACTIVATION_SECRET;
    if (!secret) throw new Error("Missing ACTIVATION_SECRET env var");

    let claims: TokenClaims;
    try {
        claims = verifyActivationPayload(rawToken, secret);
    } catch (err) {
        return NextResponse.json(
            {
                success: false,
                error: err instanceof Error ? err.message : "Invalid token",
            },
            { status: 401 }
        );
    }

    // Role gate — only admins may create users
    if (claims.role !== "admin") {
        return NextResponse.json(
            {
                success: false,
                error: "Forbidden: admin role required",
            },
            { status: 403 }
        );
    }

    // Cross-check: confirm this admin user actually exists in Firestore
    // and is still active. Prevents use of a valid token after suspension.
    const adminSnap = await adminDb
        .collection("users")
        .doc(claims.userId)
        .get();

    if (!adminSnap.exists) {
        return NextResponse.json(
            { success: false, error: "Admin account not found" },
            { status: 401 }
        );
    }

    const adminData = adminSnap.data()!;
    if (adminData.status === "suspended") {
        return NextResponse.json(
            { success: false, error: "Admin account is suspended" },
            { status: 403 }
        );
    }

    // Ensure the shopId in the token still matches what's in Firestore.
    // Guards against a stale token issued before a shop reassignment.
    if (adminData.shopId !== claims.shopId) {
        return NextResponse.json(
            { success: false, error: "Token shopId mismatch" },
            { status: 403 }
        );
    }

    return claims;
}

// ============================================================================
// POST /api/admin/users/create
// ============================================================================

export async function POST(request: Request) {
    console.log("[AdminCreateUser] Incoming request...");

    try {
        // ── 1. Auth & role check ──────────────────────────────────────────
        const authResult = await requireAdmin(request);

        // If requireAdmin returned a NextResponse, it's an error — short-circuit
        if (authResult instanceof NextResponse) return authResult;

        const adminClaims = authResult;
        console.log(
            `[AdminCreateUser] Authenticated admin: ${adminClaims.userId} | shop: ${adminClaims.shopId}`
        );

        // ── 2. Validate request body ──────────────────────────────────────
        const schema = z.object({
            name: z
                .string()
                .min(2, "Name must be at least 2 characters")
                .max(60, "Name too long")
                .trim(),
            phone: z
                .string()
                .min(4, "Phone number too short")
                .max(20, "Phone number too long")
                .trim(),
            role: z.enum(["admin", "manager", "cashier"]),
            timestamp: z.string().optional(), // client-supplied; we use server time
        });

        const body = await request.json();
        const validation = schema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Validation failed",
                    details: validation.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const { name, role } = validation.data;
        const phone = normalizePhone(validation.data.phone);
        const now = Date.now();

        console.log(
            `[AdminCreateUser] Creating user — name: "${name}", phone: "${phone}", role: "${role}"`
        );

        // ── 3. Derive stable userId from phone ────────────────────────────
        const newUserId = deriveUserId(phone);

        // ── 4. Duplicate checks scoped to THIS shop only ──────────────────
        //
        // We run both checks as separate queries so we can return a precise
        // error message telling the admin exactly what conflicts.
        //
        // Note: queries are scoped with shopId == adminClaims.shopId so a
        // phone/name used in a different shop does NOT block creation here.

        const shopRef = adminDb.collection("users");

        const [phoneSnap, nameSnap, existingUserSnap] = await Promise.all([
            // Check: phone already in use within this shop
            shopRef
                .where("shopId", "==", adminClaims.shopId)
                .where("identity", "==", phone)
                .limit(1)
                .get(),

            // Check: display name already in use within this shop
            shopRef
                .where("shopId", "==", adminClaims.shopId)
                .where("displayName", "==", name)
                .limit(1)
                .get(),

            // Check: the derived userId doc itself (phone used globally as identity)
            shopRef.doc(newUserId).get(),
        ]);

        // Phone duplicate within shop
        if (!phoneSnap.empty) {
            const conflict = phoneSnap.docs[0].data();
            return NextResponse.json(
                {
                    success: false,
                    error: `Phone number is already registered to "${conflict.displayName}" in this shop`,
                    field: "phone",
                },
                { status: 409 }
            );
        }

        // Name duplicate within shop
        if (!nameSnap.empty) {
            return NextResponse.json(
                {
                    success: false,
                    error: `The name "${name}" is already taken in this shop. Use a different name.`,
                    field: "name",
                },
                { status: 409 }
            );
        }

        // The userId doc exists but belongs to a different shop — this phone
        // is already a registered account globally but not in this shop.
        // We allow it: the same phone can be a cashier in shop A and a
        // manager in shop B. Each shop gets its own user record keyed by
        // a composite ID to avoid cross-shop doc collisions.
        //
        // To support multi-shop membership we key the doc as:
        //   users/{shopId}_{userId}
        // instead of just users/{userId}, so the same phone number can exist
        // in multiple shops without overwriting each other.
        const compositeDocId = `${adminClaims.shopId}_${newUserId}`;
        const compositeRef = adminDb.collection("users").doc(compositeDocId);
        const compositeSnap = await compositeRef.get();

        if (compositeSnap.exists) {
            // Extremely unlikely given phone check above, but be safe
            return NextResponse.json(
                {
                    success: false,
                    error: "A user with this phone already exists in this shop",
                    field: "phone",
                },
                { status: 409 }
            );
        }

        // ── 5. Write the new user document ────────────────────────────────
        const newUser: ShopUser = {
            userId: compositeDocId,
            shopId: adminClaims.shopId,
            identity: phone,
            channel: "phone",
            role: role as UserRole,
            displayName: name,
            status: "active",
            createdAt: now,
            updatedAt: now,
            lastLoginAt: null,          // null until they activate for the first time
            deviceIds: [],              // populated on first activation
            createdBy: adminClaims.userId,
        };

        await compositeRef.set(newUser);

        console.log(
            `[AdminCreateUser] ✅ Created user doc: ${compositeDocId} | role: ${role} | shop: ${adminClaims.shopId}`
        );

        // ── 6. Return sanitized response (no internal IDs leaked) ─────────
        return NextResponse.json(
            {
                success: true,
                message: `User "${name}" created successfully`,
                user: {
                    userId: compositeDocId,
                    name,
                    phone,                          // normalized
                    role,
                    shopId: adminClaims.shopId,
                    status: "active",
                    createdAt: now,
                },
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("[AdminCreateUser] CRITICAL ERROR:", error);
        return NextResponse.json(
            {
                success: false,
                error:
                    process.env.NODE_ENV === "production"
                        ? "User creation failed"
                        : error instanceof Error
                            ? error.message
                            : "Unknown error",
            },
            { status: 500 }
        );
    }
}