import z from "zod";

export const registerSchema = z.object({
    shopName: z.string().min(2, "Shop Name is not valid").max(100).trim(),

    phoneNumber: z
        .string("Phone Number is not valid Tanzania Number")
        .regex(/^(\+255|0)[67]\d{8}$/)
        .transform(val => val.replace(/\s+/g, "")), // removing spaces

    email: z
        .preprocess( // remove space before validation
            (val) => typeof val === 'string' ? val.trim() : val,
            z.email("Invalid Email address").toLowerCase()
        ),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Password must not exceed 50 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
});