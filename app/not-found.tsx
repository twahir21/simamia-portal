"use client";

import { motion } from "framer-motion";
import { Compass, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full bg-white overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Soft Background Washes & Decorative Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-sky-100/50 via-sky-50/30 to-transparent" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.45, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-100 rounded-full filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto">
        {/* Floating Icon */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mb-6"
        >
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 4, 0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="text-sky-600"
          >
            <Compass className="w-20 h-20 sm:w-24 sm:h-24" strokeWidth={1.5} />
          </motion.div>
          <div className="absolute -inset-4 bg-sky-100/60 rounded-full blur-xl -z-10" />
        </motion.div>

        {/* 404 Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-8xl sm:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-b from-sky-700 via-sky-500 to-slate-500 mb-2"
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4"
        >
          Lost in the clouds?
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-md mx-auto"
        >
          The page you&apos;re looking for has either moved, been removed, or
          never existed. Let&apos;s navigate you back to familiar territory.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-2xl shadow-lg shadow-sky-500/25 transition-all duration-300 hover:shadow-sky-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </motion.div>

        {/* Decorative Divider & Footer-like Note */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 w-16 h-1 bg-linear-to-r from-sky-300 to-slate-300 rounded-full"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-4 text-sm text-slate-400 tracking-wide"
        >
          Error: PAGE_NOT_FOUND
        </motion.p>
      </div>
    </main>
  );
}
