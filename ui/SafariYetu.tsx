"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Globe, Code2, Cpu, PlaySquare, Calendar } from 'lucide-react';

interface Milestone {
    date: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

const milestones: Milestone[] = [
    {
        date: "Desemba 2025",
        title: "Kuzaliwa kwa Wazo (The Idea)",
        description: "Hapa ndipo cheche ya kwanza ya Simamia App ilipowaka. Baada ya kuona changamoto za mtaani, wazo rasmi la kutengeneza mfumo thabiti wa usimamizi wa biashara lilizaliwa rasmi.",
        icon: Lightbulb,
        color: "bg-sky-500",
    },
    {
        date: "Februari 2026",
        title: "Tovuti & Kikoa Rasmi (Landing Page & Domain)",
        description: "Tulizindua Landing Page yetu ya kwanza na kukata domain rasmi. Hii ilikuwa hatua muhimu ya kuweka alama yetu ya kwanza mtandaoni na kuanza kukusanya maoni ya awali.",
        icon: Globe,
        color: "bg-slate-700",
    },
    {
        date: "Machi 2026",
        title: "Android APK v1.1.0",
        description: "Toleo la kwanza kabisa la mfumo (Beta testing APK) lilizaliwa rasmi. Tulianza majaribio ya ndani kwa ndani na wafanyabiashara wachache ili kuona jinsi mfumo unavyofanya kazi mtaani.",
        icon: Code2,
        color: "bg-sky-600",
    },
    {
        date: "Mei 2026",
        title: "Maboresho Makubwa: APK v1.1.2",
        description: "Baada ya kupokea mrejesho kutoka kwenye majaribio ya awali, tulizindua toleo la v1.1.2 lililokuwa na kasi zaidi, usalama wa juu wa data, na muonekano rahisi zaidi kutumia.",
        icon: Cpu,
        color: "bg-slate-800",
    },
    {
        date: "Julai 2026",
        title: "Kusimama Imara Play Store!",
        description: "Hatua kubwa ya mafanikio! Simamia App sasa inapatikana rasmi Google Play Store. Kila mfanyabiashara anaweza kuipakua kwa urahisi na kuanza kuongoza biashara yake kidijitali.",
        icon: PlaySquare,
        color: "bg-sky-600",
    },
];

export default function SafariYetu() {
    return (
        <section className="bg-linear-to-b from-slate-100 to-slate-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-5xl mx-auto">

                {/* Header Rasmi */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-sm font-medium mb-4">
                        <Calendar size={16} />
                        <span>Hatua kwa Hatua</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Safari ya Ukuaji wa <span className="text-sky-600">Simamia App</span>
                    </h2>
                    <p className="mt-3 text-slate-600 max-w-xl mx-auto text-base">
                        Tazama jinsi tulivyotoka kwenye wazo la kawaida na kuwa suluhisho kamili linaloaminika kiganjani mwako.
                    </p>
                </div>

                {/* Timeline Container */}
                <div className="relative">

                    {/* Mstari wa Katikati (Desktop tu) */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />

                    <div className="space-y-12 md:space-y-16">
                        {milestones.map((item, index) => {
                            const IconComp = item.icon;
                            const isEven = index % 2 === 0;

                            return (
                                <div key={index} className="relative flex flex-col md:flex-row items-stretch">

                                    {/* Dot/Icon ya Katikati */}
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                                        className={`absolute left-4 md:left-1/2 w-10 h-10 rounded-full ${item.color} text-white flex items-center justify-center -translate-x-1/2 z-20 shadow-md`}
                                        style={{ top: '4px' }}
                                    >
                                        <IconComp className="w-5 h-5" />
                                    </motion.div>

                                    {/* Upande wa Kushoto (Desktop Only) */}
                                    {/* FIX: Added 'hidden md:flex' so it never renders on mobile, preventing hydration mismatch */}
                                    <div className={`hidden md:flex w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 ${isEven ? 'md:justify-end' : 'md:justify-start md:opacity-0 md:pointer-events-none'}`}>
                                        {isEven && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -40 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, ease: "easeOut" }}
                                                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 text-left md:text-right w-full max-w-md relative"
                                            >
                                                <span className="text-sm font-bold text-sky-600 uppercase tracking-wider">{item.date}</span>
                                                <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">{item.title}</h3>
                                                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Upande wa Kulia (Mobile & Desktop Fallback) */}
                                    {/* FIX: Removed 'typeof window' check. Always render the card and let Tailwind handle visibility */}
                                    <div className={`flex w-full md:w-1/2 pl-12 md:pl-12 ${!isEven ? 'md:justify-start' : 'md:justify-end md:hidden'}`}>
                                        <motion.div
                                            initial={{ opacity: 0, x: 40 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 text-left w-full max-w-md relative"
                                        >
                                            <span className="text-sm font-bold text-sky-600 uppercase tracking-wider">{item.date}</span>
                                            <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">{item.title}</h3>
                                            <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                                        </motion.div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                </div>

            </div>
        </section>
    );
}