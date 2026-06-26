"use client";

import { useLanguage } from "@/provider/language-provider";
import { useTranslation } from "@/provider/translation";
import PageHero from "@/ui/pageHero";
import SafariYetu from "@/ui/SafariYetu";
import HadithiYetu from "@/ui/Story";
import TeamSection from "@/ui/Team";
import Testimonials from "@/ui/Testimonials";
import { motion } from "framer-motion";
import {
    Smartphone,
    WifiOff,
    Zap,
    TrendingUp,
    MapPin,
    Download,
    ArrowRight,
    Shield,
    Users,
    BarChart3,
    MessageCircle,
    Sparkles,
} from "lucide-react";

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
      <PageHero
        tag={t.about.founded}
        title={t.about.story}
        subtitle={t.aboutHero.tagline}
        description={
          <>
            {t.aboutHero.description}
          </>
        }
        ctas={[
          {
            label: t.aboutHero.downloadBtn,
            href: "/user-guide.pdf",
            icon: Download,
            iconPosition: "left",
          },
          {
            label: t.aboutHero.learnMoreBtn,
            href: "/#how-it-works",
            variant: "secondary",
            icon: ArrowRight,
            iconPosition: "right",
          },
        ]}
      />

      <HadithiYetu />

      <SafariYetu />


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

      <TeamSection />

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

      <Testimonials />

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full bg-linear-to-br from-sky-700 to-sky-800 py-8 sm:py-10 text-center relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/20 border border-sky-500/30 rounded-full text-xs font-bold text-sky-300 tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Hujaona Jibu Lako?
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Wasiliana Nasi Moja kwa Moja
          </h2>
          <p className="text-sm text-white max-w-xl mx-auto mb-6 leading-relaxed">
            Timu yetu ya usaidizi iko tayari kukusaidia. Tupigie simu, tutumie ujumbe WhatsApp,
            au tembelea ofisi yetu Dar es Salaam.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/255798700900?text=Habari%2C%20nina%20maswali%20kuhusu%20Simamia%20App"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4" />
              Tuma WhatsApp
            </a>

            <a
              href="/faqs"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition backdrop-blur-sm"
            >
              Ukurasa wa Maswali
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}