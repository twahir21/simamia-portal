"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react"; // 1. Replace useMemo with useState and useEffect

interface Star {
    id: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
}

export default function FallingStars({ count = 40 }: { count?: number }) {
    // 2. Start with an empty array. 
    // This ensures the server and the initial client render output an empty container, preventing the mismatch error.
    const [stars, setStars] = useState<Star[]>([]);

    // 3. Generate the random stars ONLY after the component mounts in the browser.
    useEffect(() => {
        const generatedStars: Star[] = Array.from({ length: count }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 6 + 4,
            delay: Math.random() * 8,
            opacity: Math.random() * 0.7 + 0.3,
        }));
        setStars(generatedStars);
    }, [count]); // Re-generate if the count prop changes

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute rounded-full bg-white shadow-[0_0_6px_1px_rgba(255,255,255,0.8)]"
                    style={{
                        left: `${star.left}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        top: "-10px",
                    }}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{
                        y: ["0vh", "110vh"],
                        opacity: [0, star.opacity, star.opacity, 0],
                    }}
                    transition={{
                        duration: star.duration,
                        delay: star.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
}