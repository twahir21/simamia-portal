"use strict";

import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export default function HadithiYetu() {
    return (
        <section className="bg-gradient-to-b from-slate-50 to-slate-100 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-6xl mx-auto">

                {/* Container ya Grid: Kwenye simu ni column 1, kwenye desktop (md) inakuwa columns 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* UPANDE WA KUSHOTO: Maandishi (Text Content) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col justify-center space-y-5"
                    >

                        <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                            Simamia ilizaliwa baada ya kuona changamoto halisi wanazokutana nazo wafanyabiashara wadogo na wa kati katika kusimamia mauzo, hesabu za bidhaa, na mtiririko wa pesa kila siku. Tulitaka kuondoa madaftari na mifumo migumu ya kizamani.
                        </p>

                        <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                            Leo, Simamia imekuwa zaidi ya mfumo wa usimamizi; ni mshirika wa ukuaji kwa mamia ya biashara. Tunaendelea kubuni mbinu mpya za kiteknolojia ili kurahisisha uendeshaji wa biashara kote nchini, kumpa mmiliki udhibiti kamili, na kukuza uchumi wa kidijitali.
                        </p>
                    </motion.div>

                    {/* UPANDE WA KULIA: Picha (Image Container) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        className="relative w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-200"
                    >
                        {/* 
              Hapa utaweka tag ya Next.js <Image /> au <img> ya kawaida.
              Nimetumia placeholder image (Unsplash) inayoonyesha mfanyabiashara akitumia kifaa cha kidijitali.
            */}
                        <img
                            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
                            alt="Mjasiriamali akitumia Simamia App"
                            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                        />

                        {/* Gradient Overlay madhubuti ili kuendana na rangi za Sky/Slate */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />
                    </motion.div>

                </div>

            </div>
        </section>
    );
}