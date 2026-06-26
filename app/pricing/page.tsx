"use client";

import { APK_LINK } from "@/const/links.const";
import PageHero from "@/ui/pageHero";
import PricingSection from "@/ui/Pricing";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Flame,
} from "lucide-react";


export default function PricingPage() {

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-sky-500 selection:text-white">

      {/* Hero Section */}
      <PageHero
        tag="Fair, Simple Local Pricing"
        title="Anza Bure"
        subtitle="Invest in Your Business Growth, Not Complex Software"
        description={
          <>
            Anza Bure, Simamia Kila kitu Bila Bando. Chagua kifurushi kinachofaa ukubwa wa duka lako. Hakuna ada zilizofichwa.
          </>
        }
      />

      <PricingSection />

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
            <Flame className="w-3.5 h-3.5" />
            Anza Leo Bila Malipo
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Tayari Kujaribu Simamia App?
          </h2>
          <p className="text-sm text-white max-w-xl mx-auto mb-6 leading-relaxed">
            Pakua app sasa na uanze majaribio yako ya bure. Hakuna kadi ya benki inayohitajika.
            Ghairi wakati wowote.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={APK_LINK}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-emerald-500/20"
            >
              Anza Majaribio ya Bure
              <ArrowRight className="w-4 h-4" />
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
