"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { Download, PlayCircle, Star } from "lucide-react";
import { motion } from "framer-motion";
import ProblemSolution from "@/ui/ProblemSoln";

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

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 tracking-tight">
              Chukua Udhibiti wa{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-sky-600 to-emerald-500">
                Biashara Yako
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
              href="#download"
              className="group relative flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-lg hover:shadow-sky-200 active:scale-95"
            >
              <Download size={20} className="group-hover:bounce" />
              Sajili Duka Lako
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
  </>
}



