"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { Download, PlayCircle, Star } from "lucide-react";
import { motion } from "framer-motion";
import ProblemSolution from "@/ui/ProblemSoln";
import Features from "@/ui/Features";
import FAQ from "@/ui/faq";
import { Righteous } from "next/font/google";
import WhatsAppButton from "@/ui/whatsapp";
import { APK_LINK } from "@/const/links.const";

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

  return <>
    {/* Hero  */}
    <section className="relative w-full flex items-center overflow-hidden py-2 px-4">
      
      {/* BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-home.jpg" // Modern retail/office background
          alt="Background"
          fill
          className="object-cover opacity-50" // Low opacity to keep text readable
          priority
        />
        {/* Gradient Overlay to ensure contrast */}
        {/* <div className="absolute inset-0 bg-linear-to-l from-white via-white/90 to-gray-50" /> */}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div data-aos="fade-up">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <span className="text-sm font-medium text-gray-600">5+ Shops Verified</span>
            </div>

            <h1 className={` ${zain.className} text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 tracking-tight`}>
              Chukua Udhibiti wa{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-sky-600 to-emerald-500">
                BIASHARA YAKO
              </span>{" "}
              Leo.
            </h1>

            <p className="mt-6 text-gray-600 text-lg md:text-xl leading-relaxed max-w-lg">
              Simamia mauzo, fuatilia madeni, na angalia faida zako moja kwa moja
              kutoka kwenye simu yako. <strong>Simamia App</strong> — Biashara yako, teknolojia yetu.
            </p>
          </motion.div>

          {/* CTA BUTTONS */}
          <motion.div 
            className="mt-8 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link
              href={`${APK_LINK}`}
              className="group relative flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-lg hover:shadow-sky-200 active:scale-95"
            >
              <Download size={20} className="group-hover:bounce" />
              Download APK
            </Link>

            <Link
              href="#demo"
              className="flex items-center justify-center gap-2 border-2 border-gray-200 hover:bg-gray-50 px-8 py-4 rounded-2xl text-lg font-bold text-gray-700 transition-all active:scale-95"
            >
              <PlayCircle size={20} />
              Angalia Demo
            </Link>
          </motion.div>

          <p className="mt-6 flex items-center gap-2 text-sm text-gray-500 font-medium">
            <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
            Inatumika na wafanyabiashara wadogo kote Tanzania 🇹🇿
          </p>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative flex justify-center" data-aos="zoom-in-left">
          <motion.div
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative w-70 md:w-87.5 z-20"
          >
            
            {/* PHONE FRAME */}
            <div className="rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gray-900 bg-gray-900 aspect-9/19">
              <Image
                src="/app-dashboard-en.png" 
                alt="Simamia App Dashboard"
                width={400}
                height={800}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* BACKGROUND DECORATION */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-transparent rounded-full blur-3xl -z-10 opacity-60" />
        </div>
      </div>
    </section>

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
            <span className={`${zain.className} bg-clip-text text-transparent bg-linear-to-r from-white via-sky-100 to-white`}>
              Start Managing Your Business 
            </span>
            <br />
            <span className="relative">
              <span className="text-sky-400">Smarter Today</span>
              {/* Decorative Brush/Underline Effect */}
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-sky-500/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </div>

        <p className="text-lg opacity-90 mb-8">
          Offline-ready. Fast. Built for real businesses in Africa.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

          {/* APK Download */}
          <a
            href={`${APK_LINK}`}
            className="flex items-center gap-3 px-8 py-3 bg-white text-indigo-600 font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform duration-200 group"
          >
            {/* Android Icon */}
            <svg 
              viewBox="0 0 24 24" 
              className="w-6 h-6 fill-indigo-600 group-hover:rotate-12 transition-transform" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.523 15.3414C17.0609 15.3414 16.6903 14.9708 16.6903 14.5087C16.6903 14.0465 17.0609 13.6759 17.523 13.6759C17.9852 13.6759 18.3558 14.0465 18.3558 14.5087C18.3558 14.9708 17.9852 15.3414 17.523 15.3414ZM6.477 15.3414C6.01485 15.3414 5.64424 14.9708 5.64424 14.5087C5.64424 14.0465 6.01485 13.6759 6.477 13.6759C6.93915 13.6759 7.30976 14.0465 7.30976 14.5087C7.30976 14.9708 6.93915 15.3414 6.477 15.3414ZM17.8431 11.2335L19.9881 7.51811C20.1255 7.2798 20.0438 6.97491 19.8055 6.83751C19.5673 6.70012 19.2624 6.7818 19.125 7.02011L16.9427 10.8C15.4641 10.1227 13.7915 9.75 12 9.75C10.2085 9.75 8.53592 10.1227 7.05731 10.8L4.875 7.02011C4.7376 6.7818 4.43272 6.70012 4.1945 6.83751C3.95627 6.97491 3.8745 7.2798 4.0119 7.51811L6.15693 11.2335C2.61331 13.1539 0.20892 16.8228 0 21.1111H24C23.7911 16.8228 21.3867 13.1539 17.8431 11.2335Z" />
            </svg>
            Download APK
          </a>

          {/* Play Store Coming Soon */}
          <button
            disabled
            className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-gray-900 to-black border border-white/10 opacity-80 cursor-not-allowed shadow-md"
          >
            {/* Official-style Play Icon */}
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-6 h-6"
              >
                <path fill="#34A853" d="M325.3 234.3L104.6 13.7c-8.4-8.4-22.1-8.4-30.5 0-2.3 2.3-4 5.2-4.9 8.3l256.1 256.1z"/>
                <path fill="#4285F4" d="M69.2 21.9C68.4 24.9 68 28 68 31.2v449.6c0 3.2.4 6.3 1.2 9.3L325.3 277.7 69.2 21.9z"/>
                <path fill="#FBBC04" d="M403.5 256c0-7.7-4-14.9-10.6-19l-67.6-41.7-79.2 79.2 79.2 79.2 67.6-41.7c6.6-4.1 10.6-11.3 10.6-19z"/>
                <path fill="#EA4335" d="M325.3 277.7L69.2 490.1c.9 3.1 2.6 6 4.9 8.3 8.4 8.4 22.1 8.4 30.5 0l220.7-220.7z"/>
              </svg>
            </div>

            <div className="flex flex-col leading-tight text-left">
              <span className="text-[10px] uppercase tracking-wide text-gray-400">
                Coming soon on
              </span>
              <span className="text-sm font-semibold text-white">
                Google Play
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>

    {/* Faq */}
    <FAQ />

    <WhatsAppButton />

  </>
}



