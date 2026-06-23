"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import ProblemSolution from "@/ui/ProblemSoln";
import Features from "@/ui/Features";
import FAQ from "@/ui/faq";
import { Righteous } from "next/font/google";
import WhatsAppButton from "@/ui/whatsapp";
import { APK_LINK, APK_VERSION } from "@/const/links.const";
import { useTranslation } from "@/provider/translation";
import playStoreBadge from "@/public/play.png";
import HeroSection from "@/ui/hero";

const zain = Righteous({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const t = useTranslation()

  return (
    <>
      {/* Hero  */}
      <HeroSection zainFont={zain.className}/>

      {/* Solution */}
      <ProblemSolution />

      {/* Features */}
      <Features />

      <section className="w-full py-20 bg-slate-900 text-white" id="apk">
        <div className="max-w-6xl mx-auto px-4 text-center rounded-3xl p-8 bg-white/10 backdrop-blur-lg border border-white/20">
          <div className="relative inline-block mb-6">
            {/* Subtle "glow" or "aura" behind the text */}
            <div className="absolute -inset-1 bg-linear-to-r from-sky-400 to-indigo-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />

            <h2 className="relative text-3xl md:text-5xl font-extrabold tracking-tight">
              <span
                className={`${zain.className} bg-clip-text text-transparent bg-linear-to-r from-white via-sky-100 to-white`}
              >
                {t.hero.start}
              </span>
              <br />
              <span className="relative">
                <span className="text-sky-400">{t.hero.smarter}</span>
                {/* Decorative Brush/Underline Effect */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-2 text-sky-500/50"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 25 0, 50 5 T 100 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
          </div>

          <p className="text-lg opacity-90 mb-8">
            {t.hero.noNet}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* APK Download (Styled like a premium app badge) */}
            <Link
              href={APK_LINK}
              download
              className="
                inline-flex items-center gap-3 px-5 py-3 
                bg-white/10 hover:bg-white/20 backdrop-blur-sm
                border border-white/20 hover:border-[#3DDC84]/50
                rounded-xl shadow-lg hover:shadow-[#3DDC84]/10
                transition-all duration-300 group
              "
              aria-label="Download Android APK"
            >
              {/* Animated Android Icon */}
              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 fill-[#3DDC84] drop-shadow-sm group-hover:rotate-6 transition-transform duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.523 15.3414C17.0609 15.3414 16.6903 14.9708 16.6903 14.5087C16.6903 14.0465 17.0609 13.6759 17.523 13.6759C17.9852 13.6759 18.3558 14.0465 18.3558 14.5087C18.3558 14.9708 17.9852 15.3414 17.523 15.3414ZM6.477 15.3414C6.01485 15.3414 5.64424 14.9708 5.64424 14.5087C5.64424 14.0465 6.01485 13.6759 6.477 13.6759C6.93915 13.6759 7.30976 14.0465 7.30976 14.5087C7.30976 14.9708 6.93915 15.3414 6.477 15.3414ZM17.8431 11.2335L19.9881 7.51811C20.1255 7.2798 20.0438 6.97491 19.8055 6.83751C19.5673 6.70012 19.2624 6.7818 19.125 7.02011L16.9427 10.8C15.4641 10.1227 13.7915 9.75 12 9.75C10.2085 9.75 8.53592 10.1227 7.05731 10.8L4.875 7.02011C4.7376 6.7818 4.43272 6.70012 4.1945 6.83751C3.95627 6.97491 3.8745 7.2798 4.0119 7.51811L6.15693 11.2335C2.61331 13.1539 0.20892 16.8228 0 21.1111H24C23.7911 16.8228 21.3867 13.1539 17.8431 11.2335Z" />
                </svg>
                {/* Subtle glow effect */}
                <span className="absolute inset-0 bg-[#3DDC84]/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="flex flex-col text-left">
                <span className="text-[10px] font-semibold text-white/70 uppercase tracking-widest">
                  {t.hero.downloadNow}
                </span>
                <span className="text-lg font-bold text-white leading-none">
                  {t.common.apk}
                </span>
              </div>

              {/* Badge */}
              <span className="ml-2 px-2 py-0.5 text-[10px] font-bold bg-[#3DDC84] text-slate-900 rounded-full">
                {APK_VERSION}
              </span>
            </Link>

            {/* Google Play (Coming Soon - High Quality Image Badge) */}
            <div className="relative group w-50 h-15 cursor-not-allowed">
              {/* The clean badge image rendering underneath the overlay */}
              <Image
                src={playStoreBadge}
                alt="Pakua kwenye Google Play"
                quality={100}
                className="w-full h-full object-contain opacity-40 select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Faq */}
      <FAQ />

      <WhatsAppButton />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Simamia",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Android",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Offline-first business management app for sales, expenses, debts, and stock tracking.",
            url: "https://simamia.co.tz",
          }),
        }}
      />
    </>
  );
}



