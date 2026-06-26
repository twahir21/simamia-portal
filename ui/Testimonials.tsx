"use client";

import { APK_LINK } from "@/const/links.const";
import { Quote, Star, Smartphone, TrendingUp, ShieldCheck } from "lucide-react";

type Testimonial = {
    name: string;
    business: string;
    location: string;
    rating: number;
    quote: string;
    avatarBg: string;
    initials: string;
};

const testimonials: Testimonial[] = [
    {
        name: "Mama Rehema",
        business: "Duka la Nafaka",
        location: "Dar es Salaam",
        rating: 5,
        quote:
            "Sikuwa najua madeni yangu yalikuwa mangapi. Simamia imenionesha kwa sekunde — sasa napata faida yangu halisi kila siku!",
        avatarBg: "bg-sky-500",
        initials: "MR",
    },
    {
        name: "Juma Hassan",
        business: "Mini Market",
        location: "Zanzibar",
        rating: 5,
        quote:
            "Nilikuwa na daftari nyingi zilizopotea. Sasa mauzo yote, madeni, na faida — yote kwenye simu yangu. Ni rahisi sana!",
        avatarBg: "bg-sky-600",
        initials: "JH",
    },
    {
        name: "Amina Mwinyi",
        business: "Duka la Nguo",
        location: "Arusha",
        rating: 5,
        quote:
            "Wateja wangu wanadai, lakini sasa Simamia inakumbusha kila deni. Biashara yangu imekua kwa 40% ndani ya miezi mitatu!",
        avatarBg: "bg-sky-400",
        initials: "AM",
    },
];

const features = [
    {
        icon: Smartphone,
        title: "Kutoka Kwenye Simu",
        desc: "Simamia biashara yako popote ulipo.",
    },
    {
        icon: TrendingUp,
        title: "Faida Moja kwa Moja",
        desc: "Angalia faida zako kwa kubonyeza tu.",
    },
    {
        icon: ShieldCheck,
        title: "Bila Daftari",
        desc: "Hakuna mahesabu ya mkono tena.",
    },
];

export default function Testimonials() {
    return (
        <section className="bg-linear-to-b from-sky-50 to-white border-t border-sky-300 py-20 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-sm font-semibold tracking-wide mb-4">
                        Ushuhuda
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                        Wanavyosema Wafanyabiashara
                    </h2>
                    <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        <span className="font-semibold text-sky-700">Simamia App</span> —
                        Simamia mauzo, fuatilia madeni, na angalia faida zako moja kwa moja
                        kutoka kwenye simu yako,{" "}
                        <span className="italic">bila daftari wala mahesabu</span>.
                    </p>
                </div>

                {/* Feature pills */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
                        >
                            <div className="shrink-0 w-12 h-12 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
                                <f.icon size={22} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900 text-sm">
                                    {f.title}
                                </h4>
                                <p className="text-slate-500 text-xs">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Testimonial cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                        <article
                            key={t.name}
                            className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
                        >
                            {/* Quote icon */}
                            <div className="absolute -top-4 left-6 w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-md">
                                <Quote size={18} />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-0.5 mt-2 mb-4">
                                {Array.from({ length: t.rating }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className="fill-sky-500 text-sky-500"
                                    />
                                ))}
                            </div>

                            {/* Quote text */}
                            <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                                "{t.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                <div
                                    className={`${t.avatarBg} w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm`}
                                >
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 text-sm">
                                        {t.name}
                                    </p>
                                    <p className="text-slate-500 text-xs">
                                        {t.business} · {t.location}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-14">
                    <a 
                    href={APK_LINK} 
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-full shadow-lg shadow-sky-200 hover:shadow-sky-300 transition-all">
                        <Smartphone size={18} />
                        Pakua Simamia App
                    </a>
                    <p className="text-slate-500 text-sm mt-3">
                        Bure · Rahisi · Salama
                    </p>
                </div>
            </div>
        </section>
    )}