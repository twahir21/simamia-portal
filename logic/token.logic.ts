import jwt from 'jsonwebtoken';

export const generateToken = (
    uid: string, 
    expiryDate: number, 
    status: "Active" | "Inactive"
) => {
    try {
        const privateKey = process.env.JWT_PRIVATE_KEY!.replace(/\\n/g, '\n');
  
        const licenseData = {
            uid,
            lastOnline: Date.now(),
            exp: expiryDate,
            status
        };

        // Sign using RS256 (Asymmetric)
        const token = jwt.sign(licenseData, privateKey, { algorithm: 'RS256' });

        return token;

    } catch (error) {
        console.error("JWT Signing Error:", error);
        throw new Error("TOKEN_GENERATION_FAILED");
    }
}


interface LicensePayload {
  uid: string;
  lastOnline: number;
  status: "Active" | "Inactive";
  exp: number; // Standard JWT expiry claim
  iat: number; // Standard Issued At claim
}

export const verifyLicenseToken = (token: string): LicensePayload | null => {
  try {
    // 1. Get Public Key from .env (with the same newline fix)
    const publicKey = process.env.JWT_PUBLIC_KEY?.replace(/\\n/g, '\n');

    if (!publicKey) {
      throw new Error("PUBLIC_KEY_MISSING");
    }

    // 2. Verify using the Public Key and specify the RS256 algorithm
    const decoded = jwt.verify(token, publicKey, { 
      algorithms: ['RS256'] 
    }) as LicensePayload;

    return decoded;
  } catch (error) {
    // This will catch: 
    // - Expired tokens (TokenExpiredError)
    // - Tampered tokens (JsonWebTokenError)
    // - Wrong public key
    console.error("Token verification failed:", error);
    return null; 
  }
};