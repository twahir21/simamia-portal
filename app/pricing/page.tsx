"use client";

import { motion } from "framer-motion";
import {
  Check,
  HelpCircle,
  Sparkles,
  ShieldAlert,
  Smartphone,
  Layers,
  CloudLightning,
  ChevronDown,
  Building2,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface PricingPlan {
  name: string;
  priceTZS: string;
  period?: string;
  description: string;
  badge?: string;
  ctaText: string;
  ctaLink: string;
  features: string[];
  isPopular?: boolean;
  isEnterprise?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Kawaida (Free)",
    priceTZS: "0",
    period: "forever",
    description:
      "Perfect for single-operator Registration or Guest Mode sandboxes looking to ditch paper.",
    ctaText: "Get Started Free",
    ctaLink: "/download",
    features: [
      "100% Offline core sales registry",
      "Up to 150 unique inventory products",
      "Scan, Smart Search & Service Selling tabs",
      "Local daily profit & expense calculator",
      "Single-device standalone installation",
    ],
  },
  {
    name: "Duka Pro",
    priceTZS: "15,000",
    period: "per month",
    description:
      "Designed for growing retail shops needing absolute data safety and staff tracking.",
    badge: "Most Popular",
    isPopular: true,
    ctaText: "Start 14-Day Trial",
    ctaLink: "/download?plan=pro",
    features: [
      "Everything in Kawaida plan",
      "Unlimited product inventory listings",
      "Automatic end-of-day Cloud Backup",
      "Multi-staff accounts with permissions",
      "Save sale as Debt, Expense, or Cash/Digital",
      "Supplier debt & credit balance loggers",
      "Priority WhatsApp technical support",
    ],
  },
  {
    name: "Enterprise",
    priceTZS: "Custom Pricing",
    description:
      "Tailored structures for multi-location wholesale, major distribution chains, and custom builds.",
    isEnterprise: true,
    ctaText: "Contact Us",
    ctaLink: "/contact",
    features: [
      "Everything in Duka Pro plan",
      "Multi-branch global inventory sync",
      "Custom ERP & accounting integrations",
      "Advanced cross-store analytics dashboards",
      "Dedicated account manager",
      "Custom hardware POS integration assistance",
      "On-site staff deployment training",
    ],
  },
];

const faqs = [
  {
    q: "Does SIMAMIA really work without internet?",
    a: "Yes! Core features like checking out customers, adding stock, tracking cash vs mobile money, and viewing profit metrics run completely locally on your smartphone. You only need a connection if you want to back up data to the cloud or sync records across multiple devices.",
  },
  {
    q: "How do I pay for the Pro plan in Tanzania?",
    a: "We accept all major mobile money platforms including M-Pesa, Tigo Pesa, Airtel Money, and HaloPesa directly through our automated billing dashboard inside the app.",
  },
  {
    q: "What happens if I lose my phone?",
    a: "If you are on our Duka Pro plan, your data is securely backed up automatically whenever your device detects an active internet connection. You can log into your new phone and restore everything instantly.",
  },
];

export default function PricingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* Structural Blur Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-gradient-to-br from-sky-200/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/4" />
      </div>

      {/* Header Core Content */}
      <section className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8 z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 border border-sky-200/60 rounded-full text-xs font-bold text-sky-800 tracking-wide uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            Fair, Simple Local Pricing
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900"
          >
            Invest in Your Business Growth, <br className="hidden sm:inline" />{" "}
            Not Complex Software
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed"
          >
            Start for free, manage everything offline, and upgrade only when you
            need automated cloud backups or staff tracking modules. No hidden
            fees.
          </motion.p>
        </div>
      </section>

      {/* Pricing Matrix 3-Column Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + index * 0.05,
                type: "spring",
                stiffness: 100,
              }}
              className={`relative bg-white rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.isPopular
                  ? "border-sky-500 shadow-xl shadow-slate-200/60 ring-4 ring-sky-500/5"
                  : plan.isEnterprise
                    ? "border-slate-900 shadow-md shadow-slate-900/5"
                    : "border-slate-200/80 shadow-xs hover:border-slate-300"
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 right-6 -translate-y-1/2">
                  <span className="px-3 py-1 bg-gradient-to-r from-sky-500 to-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md shadow-sky-500/10">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed min-h-[32px]">
                      {plan.description}
                    </p>
                  </div>
                  {plan.isEnterprise && (
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-800">
                      <Building2 className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="flex items-baseline gap-1.5 pt-2 border-t border-slate-100">
                  <span
                    className={`tracking-tight ${
                      plan.isEnterprise
                        ? "text-2xl sm:text-3xl font-black text-slate-900"
                        : "text-3xl sm:text-4xl font-black text-slate-900"
                    }`}
                  >
                    {plan.priceTZS === "0"
                      ? "Free"
                      : plan.priceTZS.includes("Custom")
                        ? plan.priceTZS
                        : `TZS ${plan.priceTZS}`}
                  </span>
                  {plan.period && (
                    <span className="text-xs font-semibold text-slate-400">
                      /{plan.period}
                    </span>
                  )}
                </div>

                <ul className="space-y-3.5 pt-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-xs text-slate-600"
                    >
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          plan.isPopular
                            ? "bg-sky-50 text-sky-600"
                            : plan.isEnterprise
                              ? "bg-slate-900 text-slate-200"
                              : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href={plan.ctaLink}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all text-center block ${
                    plan.isPopular
                      ? "bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20"
                      : plan.isEnterprise
                        ? "bg-slate-950 hover:bg-slate-800 text-white shadow-md"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Local Capability Metric Blueprint Divider */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 grid sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 bg-slate-800 border border-slate-700/60 rounded-xl flex items-center justify-center shrink-0 text-sky-400">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-tight">
                Android Native
              </h4>
              <p className="text-[11px] text-slate-400">
                Runs smoothly on all budget mobile devices.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 bg-slate-800 border border-slate-700/60 rounded-xl flex items-center justify-center shrink-0 text-sky-400">
              <CloudLightning className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-tight">
                Zero-Data Mode
              </h4>
              <p className="text-[11px] text-slate-400">
                Calculates offline, avoiding data bundle costs.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 bg-slate-800 border border-slate-700/60 rounded-xl flex items-center justify-center shrink-0 text-sky-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-tight">
                Instant Syncing
              </h4>
              <p className="text-[11px] text-slate-400">
                Upload data instantly when network returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Component Engine */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <div className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Got Questions? We Have Clear Answers
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-slate-200/70 overflow-hidden shadow-xs transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-xs sm:text-sm text-slate-800 hover:text-sky-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ml-4 ${isOpen ? "rotate-180 text-sky-500" : ""}`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-48 border-t border-slate-100" : "max-h-0"
                    }`}
                  >
                    <p className="p-5 text-xs text-slate-600 leading-relaxed bg-slate-50/40">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center bg-sky-50/50 border border-sky-100 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-center gap-2">
            <ShieldAlert className="w-4 h-4 text-sky-600 shrink-0" />
            <p className="text-xs text-slate-600 font-medium">
              Have unique multi-branch retail logistics layout requirements?
              <Link
                href="/contact"
                className="text-sky-600 font-bold ml-1 hover:underline"
              >
                Talk directly with our system designers.
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
