"use client";

import { useTranslation } from "@/provider/translation";
import ContactSupport from "@/ui/ContactSupport";
import PageHero from "@/ui/pageHero";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";


export default function ContactPage() {
  const phoneNumber = "255798700900"; 

  const t = useTranslation();
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(t.common.whatsapp)}`;

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* Hero Section */}
      <PageHero
        tag="Contact Us"
        title="We Listen, We Help"
        subtitle="Let’s Build Your Digital Retail Infrastructure"
        description={
          <>
            Have questions about offline syncing, setting up multi-branch operations, or migrating your ledger books safely? Our local team is ready to assist.
          </>
        }

        ctas={[
          {
            label: "Via WhatsApp",
            href: whatsappUrl,
            icon: MessageCircle,
            iconPosition: "left",
          },
          {
            label: "Via Phone",
            href: "tel:+255798700900",
            variant: "secondary",
            icon: ArrowRight,
            iconPosition: "right",
          },
        ]}
      />

      <ContactSupport />

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