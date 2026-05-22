import { BRIQ_SMS_LINK } from "@/const/links.const";

export const sendSMSOTP = async (otpCode: number, recipientNumber: string) => {

    const message = `${otpCode} is your Simamia App verification code. Do not share it with anyone.`;

    const options = {
        method: "POST",
        headers: {
            "X-API-Key": process.env.BRIQ_API!, 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: message,
            recipients: [recipientNumber],
            sender_id: "Simamia APP",
        }),
    };

    try {
        const res = await fetch(BRIQ_SMS_LINK, options);
        const data = await res.json();
        console.log("OTP sent response:", data);
        return data;
    } catch (err) {
        console.error("Error sending OTP:", err);
        throw err;
    }
}
