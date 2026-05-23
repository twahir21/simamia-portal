"use client";

import { PHONE_LINK, PHONE_SUPPORT } from "@/const/links.const";
import { useLanguage } from "@/provider/language-provider";
import { useTranslation } from "@/provider/translation";
import HowItWorks from "@/ui/howItworks";
import { motion } from "framer-motion";
import {
  Smartphone,
  WifiOff,
  Zap,
  TrendingUp,
  MapPin,
  Download,
  Mail,
  Phone,
  ArrowRight,
  Shield,
  Users,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {

  const t = useTranslation();
  const { lang } = useLanguage();
  

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-sky-50 via-white to-slate-50 pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-800 rounded-full text-sm font-semibold mb-6"
          >
            <span className="w-2 h-2 bg-sky-600 rounded-full animate-pulse" />
            {t.about.founded}
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            SIMAMIA <span className="text-sky-600">APP</span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-slate-600 mb-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.aboutHero.tagline}
          </motion.p>

          <motion.p
            className="text-lg text-slate-500 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t.aboutHero.description}
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/user-guide.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/25 hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5" />
              {t.aboutHero.downloadBtn}
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 hover:border-sky-300 text-slate-700 hover:text-sky-700 font-semibold rounded-xl transition-all duration-300"
            >
              {t.aboutHero.learnMoreBtn}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission & Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                {lang === "en" ? "Our" : "Dhamira"}{" "}
                <span className="text-sky-600">
                  {lang === "en" ? "Mission" : "Yetu"}
                </span>
              </h2>

              <p className="text-lg text-slate-600 leading-relaxed">
                {t.aboutPage.missionDescription}
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-sky-50 p-6 rounded-2xl border border-sky-100"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-sky-100 rounded-xl">
                  <MapPin className="w-6 h-6 text-sky-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    {t.aboutPage.howItStartedTitle}
                  </h3>
                  <p className="text-slate-600">
                    {t.aboutPage.howItStartedDescription}{" "}
                    <span className="font-semibold text-sky-700">
                      {t.aboutPage.location}
                    </span>
                    . {t.aboutPage.howItStartedDescriptionEnd}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-linear-to-br from-sky-100 to-slate-100 p-8 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white p-6 rounded-2xl shadow-lg shadow-sky-100/50 text-center">
                  <Users className="w-10 h-10 text-sky-600 mx-auto mb-3" />
                  <p className="font-bold text-slate-900">
                    {t.aboutPage.smallShopsTitle}
                  </p>
                  <p className="text-sm text-slate-500">
                    {t.aboutPage.smallShopsSubtitle}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg shadow-sky-100/50 text-center mt-8">
                  <BarChart3 className="w-10 h-10 text-sky-600 mx-auto mb-3" />
                  <p className="font-bold text-slate-900">
                    {t.aboutPage.miniMarketsTitle}
                  </p>
                  <p className="text-sm text-slate-500">
                    {t.aboutPage.miniMarketsSubtitle}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg shadow-sky-100/50 text-center -mt-8">
                  <Smartphone className="w-10 h-10 text-sky-600 mx-auto mb-3" />
                  <p className="font-bold text-slate-900">
                    {t.aboutPage.noPosTitle}
                  </p>
                  <p className="text-sm text-slate-500">
                    {t.aboutPage.noPosSubtitle}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg shadow-sky-100/50 text-center">
                  <TrendingUp className="w-10 h-10 text-sky-600 mx-auto mb-3" />
                  <p className="font-bold text-slate-900">
                    {t.aboutPage.trackEverythingTitle}
                  </p>
                  <p className="text-sm text-slate-500">
                    {t.aboutPage.trackEverythingSubtitle}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Unique Features */}
      <section className="py-16 bg-linear-to-b from-white to-sky-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              {t.uniqueFeatures.header.title1}{" "}
              <span className="text-sky-600">
                {t.uniqueFeatures.header.titleAccent}
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t.uniqueFeatures.header.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-sky-100/50 transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center mb-6">
                <WifiOff className="w-7 h-7 text-sky-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {t.uniqueFeatures.offlineCard.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {t.uniqueFeatures.offlineCard.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-sky-100/50 transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-sky-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {t.uniqueFeatures.speedCard.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {t.uniqueFeatures.speedCard.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works - Visual Flow */}
      <HowItWorks />

      {/* Tech Stack */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              {t.techStack.title}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-md border border-slate-200">
                <Smartphone className="w-5 h-5 text-sky-600" />
                <span className="font-semibold text-slate-700">
                  Expo (React Native)
                </span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-md border border-slate-200">
                <div className="w-5 h-5 bg-sky-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  N
                </div>
                <span className="font-semibold text-slate-700">
                  Next.js Server
                </span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-md border border-slate-200">
                <Shield className="w-5 h-5 text-sky-600" />
                <span className="font-semibold text-slate-700">
                  {t.techStack.offlineLabel}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-linear-to-br from-sky-600 to-sky-700 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl shadow-sky-500/25"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.getInTouch.title}
          </h2>
          <p className="text-sky-100 text-lg mb-8 max-w-xl mx-auto">
            {t.getInTouch.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
            <a
              href="mailto:huduma@simamia.co.tz"
              className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-white text-sky-700 rounded-xl font-semibold hover:bg-sky-50 transition-colors duration-300"
            >
              <Mail className="w-5 h-5" />
              huduma@simamia.co.tz
            </a>
            <a
              href={`${PHONE_LINK}`}
              className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-sky-800 text-white rounded-xl font-semibold hover:bg-sky-900 transition-colors duration-300"
            >
              <Phone className="w-5 h-5" />
              {PHONE_SUPPORT}
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
