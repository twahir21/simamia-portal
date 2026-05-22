import { BRIQ_SMS_LINK } from "@/const/links.const";

function genRandom(length = 11) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Sanitizes and validates Tanzania phone numbers to fit Briq API requirements.
 * Replaces leading +255 or 0 with 255, and ensures it only starts with 255.
 * @param phone
 */
const sanitizeTanzanianNumber = (phone: string): string => {
    // Remove all spaces, dashes, or special characters except '+'
    let cleaned = phone.replace(/[^0-9+]/g, "");

    if (cleaned.startsWith("+255")) {
        cleaned = "255" + cleaned.slice(4);
    } else if (cleaned.startsWith("0")) {
        cleaned = "255" + cleaned.slice(1);
    }

    // Strict validation: must be exactly 255 followed by 9 digits (e.g., 255712345678)
    const tzPattern = /^255\d{9}$/;
    if (!tzPattern.test(cleaned)) {
        throw new Error(`Invalid Tanzanian phone number format: ${phone}. Must start with 255, +255, or 0.`);
    }

    return cleaned;
};

export const sendSMSOTP = async (recipientNumber: string, otpCode: string) => {
    try {
        // 1. Sanitize the incoming phone number based on your curl specification
        const sanitizedRecipient = sanitizeTanzanianNumber(recipientNumber);

        const message = `<#> Namba yako ya kuthibitisha Simamia ni: ${otpCode}.
            Itatumika kwa dakika 5.

            ${genRandom()}`;

        const options = {
            method: "POST",
            headers: {
                "X-API-Key": process.env.BRIQ_API!,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: message,
                recipients: [sanitizedRecipient], // Using the sanitized number
                sender_id: "Simamia APP",          // Left exact (Case sensitive)
            }),
        };

        const res = await fetch(BRIQ_SMS_LINK, options);

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Briq API responded with status ${res.status}: ${errorText}`);
        }

        const data = await res.json();
        return data;

    } catch (err) {
        console.error("Error sending OTP:", err);
        throw err;
    }
};