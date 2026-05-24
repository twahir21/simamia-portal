import { redis } from "./redis.config";

export const checkRateLimit = async (identity: string, channel: string): Promise<boolean> => {
    const key = `otp_limits:${channel}:${identity}`;

    // Attempt to set the key with a 60-second expiration, ONLY if it doesn't exist
    // 'NX' = Only set if not exist. 'EX' = Expire in seconds.
    const acquired = await redis.set(key, "locked", "EX", 60, "NX");

    // If acquired is null, the key already exists (user is rate-limited)
    if (!acquired) {
        // Optional: Increment an internal counter if you still want to track abuse counts
        await redis.incr(`otp_abuse_count:${channel}:${identity}`).catch(() => { });
        return false;
    }

    return true;
};