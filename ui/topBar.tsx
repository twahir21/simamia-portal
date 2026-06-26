"use client";

import Image from "next/image";
import Link from "next/link";
import logoImg from "@/public/favicon.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/provider/language-provider";
import { useTranslation } from "@/provider/translation";

export const TopBar = () => {
  const { lang, toggleLang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = useTranslation();

  const navLinks = [
    {
      href: "/",
      label: t.nav.home,
    },
    {
      href: "/about",
      label: t.nav.about,
    },
    {
      href: "/help-center",
      label: t.nav.help,
    },
    {
      href: "/download",
      label: t.nav.download,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="overflow-hidden rounded-xl bg-sky-100 p-1">
            <Image
              src={logoImg}
              alt="Simamia Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>

          <div className="leading-none">
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              Simamia App
            </h1>
            <span className="text-xs font-medium text-sky-600">
              {t.nav.smart}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-sky-600"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <motion.button
            onClick={toggleLang}
            whileHover={{ translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            className="
              group relative overflow-hidden cursor-pointer
              hidden sm:flex items-center gap-3
              rounded-2xl
              border border-sky-200/70
              bg-linear-to-r from-sky-50 via-white to-slate-50
              px-2 py-2 pr-4
              shadow-sm
              transition-shadow duration-300
              hover:shadow-md
            "
          >
            {/* Hover Glow */}
            <div
              className="
                absolute inset-0 opacity-0
                bg-linear-to-r from-sky-200/20 to-slate-200/20
                transition-opacity duration-300
                group-hover:opacity-100
              "
            />

            {/* Flag with Flip Animation */}
            <motion.div
              key={lang}
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="
                relative z-10
                flex h-9 w-9 items-center justify-center
                rounded-full
                bg-linear-to-br from-sky-500 to-sky-700
                text-lg shadow-sm
              "
            >
              {lang === "en" ? "🇬🇧" : "🇹🇿"}
            </motion.div>

            {/* Text */}
            <div className="relative z-10 flex flex-col items-start leading-none">
              <span className="text-[10px] uppercase tracking-wider text-slate-500">
                Language
              </span>
              {/* Animated Text Swap */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -5, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-sm font-semibold text-slate-700"
                >
                  {lang === "en" ? "English" : "Swahili"}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.button>

          {/* Mobile Language Button */}
          <motion.button
            onClick={toggleLang}
            whileTap={{ scale: 0.9 }}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl border border-sky-200
              bg-sky-50 text-lg
              sm:hidden
            "
          >
            <motion.span
              key={lang}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {lang === "en" ? "🇬🇧" : "🇹🇿"}
            </motion.span>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            whileTap={{ scale: 0.95 }}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl border border-slate-200
              bg-white text-slate-700 shadow-sm
              transition hover:bg-slate-50
              md:hidden
            "
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileMenuOpen ? "close" : "menu"}
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Smooth Mobile Menu Expansion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 gap-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="
                      block rounded-xl px-4 py-3
                      text-sm font-medium text-slate-700
                      transition-colors duration-200
                      hover:bg-sky-50
                      hover:text-sky-600
                    "
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
