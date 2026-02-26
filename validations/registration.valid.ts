import z from "zod";

export const registerSchema = z.object({
    shopName: z.string().min(2, "Shop Name is not valid").max(100).trim(),

    phoneNumber: z
        .string("Phone Number is not valid Tanzania Number")
        .regex(/^(\+255|0|255)[67]\d{8}$/)
        .transform(val => val.replace(/\s+/g, "")), // removing spaces

    email: z
        .preprocess( // remove space before validation
            (val) => typeof val === 'string' ? val.trim() : val,
            z.email("Invalid Email address").toLowerCase()
        )
});