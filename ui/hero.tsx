import { APK_LINK } from '@/const/links.const';
import { useTranslation } from '@/provider/translation';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Star, Download, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection({ zainFont }: { zainFont: string }) {


    const { scrollY } = useScroll();
    const yBackground = useTransform(scrollY, [0, 500], [0, 150]);
    const opacityBackground = useTransform(scrollY, [0, 300], [0.5, 0.2]);

    const t = useTranslation();


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const phoneVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
        visible: {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.4,
            },
        },
    };

    return (
        <section className="relative w-full flex items-center overflow-hidden py-2 px-4 min-h-screen">
            {/* BACKGROUND IMAGE LAYER */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: yBackground }}
            >
                <Image
                    src="/bg-home.jpg"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <motion.div
                    className="absolute inset-0 bg-white/50 backdrop-blur-sm"
                    style={{ opacity: opacityBackground }}
                />
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                {/* LEFT CONTENT */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    {/* Rating Badge */}
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center gap-2 mb-4"
                    >
                        <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{
                                        delay: 0.5 + i * 0.1,
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 10
                                    }}
                                >
                                    <Star size={16} fill="currentColor" />
                                </motion.div>
                            ))}
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                            5+ {t.hero.shops}
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.div variants={itemVariants}>
                        <h1 className={`${zainFont} text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 tracking-tight`}>
                            {t.hero.takeControl}{" "}
                            <motion.span
                                className="inline-block bg-clip-text text-transparent bg-linear-to-r from-sky-600 to-emerald-500"
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                style={{
                                    backgroundSize: '200% 200%',
                                }}
                            >
                                {t.hero.yourBiz}
                            </motion.span>{" "}
                            {t.hero.today}.
                        </h1>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-lg"
                    >
                        {t.hero.heroDesc}. <strong>Simamia App</strong> —{t.hero.msemo}.
                    </motion.p>

                    {/* CTA BUTTONS */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href={`${APK_LINK}`}
                            className="group relative flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-lg hover:shadow-sky-200 active:scale-95"
                        >
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <Download size={20} />
                            </motion.div>
                            {t.common.apk}
                            <motion.div
                                className="absolute inset-0 rounded-2xl bg-white/20"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </Link>

                        <Link
                            href="#demo"
                            className="group flex items-center justify-center gap-2 border-2 border-gray-200 hover:bg-gray-50 px-8 py-4 rounded-2xl text-lg font-bold text-gray-700 transition-all active:scale-95"
                        >
                            <motion.div
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <PlayCircle size={20} />
                            </motion.div>
                            {t.hero.demo}
                        </Link>
                    </motion.div>

                    {/* Trust Indicator */}
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center gap-2 text-sm text-gray-500 font-medium"
                    >
                        <motion.span
                            className="flex h-2 w-2 rounded-full bg-sky-500"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [1, 0.5, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        {t.hero.usedBy} 🇹🇿
                    </motion.div>
                </motion.div>

                {/* RIGHT VISUAL */}
                <motion.div
                    className="relative flex justify-center"
                    variants={phoneVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        animate={{
                            y: [0, -15, 0],
                            rotate: [0, 1, -1, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.5, 1],
                        }}
                        className="relative w-70 md:w-87.5 z-20"
                    >
                        {/* PHONE FRAME */}
                        <motion.div
                            className="rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gray-900 bg-gray-900 aspect-9/19"
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Image
                                src="/app-dashboard-en.png"
                                alt="Simamia App Dashboard"
                                width={400}
                                height={800}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </motion.div>

                        {/* Glow Effect */}
                        <motion.div
                            className="absolute -inset-4 bg-linear-to-r from-sky-500/30 to-emerald-500/30 rounded-[3.5rem] blur-2xl -z-10"
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.div>

                    {/* Floating Elements */}
                    <motion.div
                        className="absolute top-10 right-10 bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg"
                        animate={{
                            y: [0, -10, 0],
                            x: [0, 5, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5,
                        }}
                    >
                        <Star className="text-yellow-500" size={24} fill="currentColor" />
                    </motion.div>

                    <motion.div
                        className="absolute bottom-20 left-5 bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg"
                        animate={{
                            y: [0, 10, 0],
                            x: [0, -5, 0],
                        }}
                        transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1,
                        }}
                    >
                        <Download className="text-sky-600" size={24} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}