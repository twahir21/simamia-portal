"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import FallingStars from "./FallingStars";

export type HeroCTA = {
    label: string;
    href: string;
    variant?: "primary" | "secondary";
    external?: boolean;
    /** Icon component from lucide-react */
    icon?: LucideIcon;
    /** Position of the icon relative to the label */
    iconPosition?: "left" | "right";
};

export type PageHeroProps = {
    tag?: string;
    title: string;
    subtitle?: string;
    description?: ReactNode;
    ctas?: HeroCTA[];
    starsCount?: number;
    gradient?: string;
    ariaLabel?: string;
};

export default function PageHero({
    tag,
    title,
    subtitle,
    description,
    ctas = [],
    starsCount = 50,
    gradient = "from-sky-950 via-sky-600 to-sky-900",
    ariaLabel = "Page hero",
}: PageHeroProps) {
    return (
        <section
            aria-label={ariaLabel}
            className={`relative w-full overflow-hidden bg-linear-to-b ${gradient}`}
        >
            <FallingStars count={starsCount} />

            <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center px-6 py-10 text-center sm:px-10 md:py-18">
                {tag && (
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/90 backdrop-blur-sm sm:text-sm"
                    >
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                        {tag}
                    </motion.span>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="bg-linear-to-r from-white via-sky-100 to-white bg-clip-text text-4xl font-extrabold tracking-tight text-transparent drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl"
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        className="mt-4 flex flex-wrap items-center justify-center gap-2 text-base font-medium text-white/90 sm:text-lg md:text-xl"
                    >
                        <span>{subtitle}</span>
                    </motion.p>
                )}

                {description && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="mt-6 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base md:text-lg"
                    >
                        {description}
                    </motion.p>
                )}

                {ctas.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.55 }}
                        className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
                    >
                        {ctas.map((cta) => {
                            const isPrimary = cta.variant !== "secondary";
                            const base =
                                "rounded-xl px-6 py-3 text-sm font-semibold sm:text-base transition inline-flex items-center gap-2";
                            const variantClass = isPrimary
                                ? "bg-white text-sky-800 shadow-lg hover:bg-sky-100 hover:shadow-xl"
                                : "border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20";

                            const Icon = cta.icon;
                            const iconElement = Icon && (
                                <Icon className="h-5 w-5" strokeWidth={2} />
                            );

                            const content = (
                                <>
                                    {cta.iconPosition !== "right" && iconElement}
                                    <span>{cta.label}</span>
                                    {cta.iconPosition === "right" && iconElement}
                                </>
                            );

                            // Use Link for internal navigation, <a> for external
                            if (cta.external) {
                                return (
                                    <Link
                                        key={cta.href + cta.label}
                                        href={cta.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${base} ${variantClass}`}
                                    >
                                        {content}
                                    </Link>
                                );
                            }

                            return (
                                <Link
                                    key={cta.href + cta.label}
                                    href={cta.href}
                                    className={`${base} ${variantClass}`}
                                >
                                    {content}
                                </Link>
                            );
                        })}
                    </motion.div>
                )}
            </div>
        </section>
    );
}