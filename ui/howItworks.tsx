import React, { useRef } from "react";
import { motion, useScroll, useSpring, Variants } from "framer-motion";
import {
  CheckCircle2,
  Database,
  Scan,
  Search,
  Award,
  Star,
  ShoppingCart,
  BarChart3,
  Receipt,
} from "lucide-react";

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the section to animate the connection line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Animation variants
const cardVariants = (direction: "left" | "right"): Variants => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -50 : 50,
    y: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 20,
    },
  },
});

const numberVariants: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
};

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-24"
      >
        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          How It <span className="text-sky-600">Works</span>
        </h2>
        <p className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto font-medium">
          Your journey from setup to business insights in a few seamless steps.
        </p>
      </motion.div>

      <div className="relative">
        {/* Animated Connection Line */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 bg-slate-100 -translate-x-1/2 rounded-full overflow-hidden">
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="w-full h-full bg-linear-to-b from-sky-400 via-blue-500 to-emerald-500"
          />
        </div>

        <div className="space-y-16 md:space-y-32">
          {/* Step 1: Onboarding Choice */}
          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-4">
            <motion.div
              variants={cardVariants("left")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex-1 w-full md:text-right order-2 md:order-1"
            >
              <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-100/50 border border-slate-100 inline-block max-w-md w-full text-left md:text-right">
                <span className="text-xs font-bold tracking-wider text-sky-600 uppercase">
                  Step 1: Onboarding
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">
                  Choose Your Entry Path
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Download our free resource guide to master baseline workflows,
                  then dive straight into the engine.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={numberVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="w-14 h-14 bg-sky-600 rounded-full flex items-center justify-center text-white font-extrabold text-xl z-10 shadow-xl shadow-sky-500/30 order-1 md:order-2 shrink-0"
            >
              1
            </motion.div>

            <motion.div
              variants={cardVariants("right")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex-1 w-full order-3"
            >
              <div className="bg-sky-50/70 p-5 rounded-2xl border border-sky-100/80 max-w-md">
                <div className="flex items-center gap-2 text-sky-900 font-semibold text-sm mb-1">
                  <Award className="w-4 h-4 text-sky-600" />
                  <span>Welcome Toolkit</span>
                </div>
                <p className="text-sky-700 text-xs leading-relaxed">
                  Instant blueprint guide loaded automatically inside your new
                  active dashboard workspace.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Step 2: Authentication & Logic Splits */}
          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-4">
            <motion.div
              variants={cardVariants("left")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex-1 w-full order-2 md:order-1"
            >
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 max-w-md ml-auto">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Runtime Access
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-xs">
                    <span className="font-bold text-xs text-sky-600 block">
                      ⚡ SYSTEM REGISTER
                    </span>
                    <span className="text-xs text-slate-600">
                      Full unlock with 14-day premium evaluation trial sandbox.
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-xs">
                    <span className="font-bold text-xs text-slate-500 block">
                      👤 GUEST ACCESS
                    </span>
                    <span className="text-xs text-slate-600">
                      Immediate system entry provisioned with 7-day test
                      sandbox.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={numberVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="w-14 h-14 bg-sky-600 rounded-full flex items-center justify-center text-white font-extrabold text-xl z-10 shadow-xl shadow-sky-500/30 order-1 md:order-2 shrink-0"
            >
              2
            </motion.div>

            <motion.div
              variants={cardVariants("right")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex-1 w-full order-3"
            >
              <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-100/50 border border-slate-100 max-w-md w-full">
                <span className="text-xs font-bold tracking-wider text-sky-600 uppercase">
                  Step 2: Gateways
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-4">
                  Register or Guest Run
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">
                        Secure Register:
                      </strong>{" "}
                      Phone/Email &rarr; OTP Verification &rarr; Active Cloud
                      Instance + <strong>14 Days Free</strong>
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Guest Pass:</strong>{" "}
                      Express activation jumpstart bypass +{" "}
                      <strong>7 Days Free</strong>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Step 3: Product Registration */}
          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-4">
            <motion.div
              variants={cardVariants("left")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex-1 w-full md:text-right order-2 md:order-1"
            >
              <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-100/50 border border-slate-100 inline-block max-w-md w-full text-left md:text-right">
                <span className="text-xs font-bold tracking-wider text-sky-600 uppercase">
                  Step 3: Inventory
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">
                  Map & Register Products
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Build out your digital storefront array. Seed stock
                  quantities, variants, categories, and core pricing matrices
                  safely.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={numberVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="w-14 h-14 bg-sky-600 rounded-full flex items-center justify-center text-white font-extrabold text-xl z-10 shadow-xl shadow-sky-500/30 order-1 md:order-2 shrink-0"
            >
              3
            </motion.div>

            <motion.div
              variants={cardVariants("right")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex-1 w-full order-3"
            >
              <div className="bg-sky-50/70 p-5 rounded-2xl border border-sky-100/80 max-w-md flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl shadow-xs border border-sky-200/40">
                  <Database className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <p className="text-sky-900 font-bold text-sm">
                    Product Database Setup
                  </p>
                  <p className="text-sky-700/90 text-xs mt-1 leading-relaxed">
                    Bulk CSV importing or inline manual wizard updates compile
                    instantly to edge network structures.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Step 4: Transaction & Capture Channels */}
          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-4">
            <motion.div
              variants={cardVariants("left")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex-1 w-full order-2 md:order-1"
            >
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 max-w-md ml-auto">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-3">
                  Processing Engines
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200/60 shadow-xs">
                    <Scan className="w-4 h-4 text-sky-600" />
                    <span>Barcode Scan</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200/60 shadow-xs">
                    <Search className="w-4 h-4 text-sky-600" />
                    <span>Smart Search</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200/60 shadow-xs">
                    <Receipt className="w-4 h-4 text-sky-600" />
                    <span>Service Selling</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200/60 shadow-xs">
                    <Star className="w-4 h-4 text-sky-600" />
                    <span>Quick Favorites</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={numberVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="w-14 h-14 bg-sky-600 rounded-full flex items-center justify-center text-white font-extrabold text-xl z-10 shadow-xl shadow-sky-500/30 order-1 md:order-2 shrink-0"
            >
              4
            </motion.div>

            <motion.div
              variants={cardVariants("right")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex-1 w-full order-3"
            >
              <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-100/50 border border-slate-100 max-w-md w-full">
                <span className="text-xs font-bold tracking-wider text-sky-600 uppercase">
                  Step 4: Live Operations
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">
                  Execute Your First Sale
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Fire up the primary transaction interface terminal. Pick
                  whichever localized routing mechanism perfectly targets your
                  real-time customer layout.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Step 5: Checkout & Cart Customization */}
          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-4">
            <motion.div
              variants={cardVariants("left")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex-1 w-full md:text-right order-2 md:order-1"
            >
              <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-100/50 border border-slate-100 inline-block max-w-md w-full text-left md:text-right">
                <span className="text-xs font-bold tracking-wider text-sky-600 uppercase">
                  Step 5: Checkout
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">
                  Tailor Ledger Closures
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Open the active cart preview module for fine-tuning
                  modifications. Segment, map, and tag your sales ledger type
                  cleanly upon closeout.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={numberVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="w-14 h-14 bg-sky-600 rounded-full flex items-center justify-center text-white font-extrabold text-xl z-10 shadow-xl shadow-sky-500/30 order-1 md:order-2 shrink-0"
            >
              5
            </motion.div>

            <motion.div
              variants={cardVariants("right")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex-1 w-full order-3"
            >
              <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-800 max-w-md text-white">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-widest mb-3">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Cart Customization & Split Ledger</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    "Debt Entry",
                    "Expense Offset",
                    "Cash Receipt",
                    "Digital Transaction",
                  ].map((type) => (
                    <span
                      key={type}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 rounded-lg text-xs font-medium transition"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Step 6: Insights & Analytics */}
          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-4">
            <motion.div
              variants={cardVariants("left")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex-1 w-full order-2 md:order-1"
            >
              <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-100/80 max-w-md ml-auto flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl shadow-xs border border-emerald-200/40">
                  <BarChart3 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-emerald-900 font-bold text-sm">
                    System Ready
                  </p>
                  <p className="text-emerald-700/90 text-xs mt-1 leading-relaxed">
                    Track gross revenue metrics, inventory turns, cash
                    positions, and net margins globally in real time.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={numberVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white font-extrabold text-xl z-10 shadow-xl shadow-emerald-500/30 order-1 md:order-2 shrink-0"
            >
              6
            </motion.div>

            <motion.div
              variants={cardVariants("right")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex-1 w-full order-3"
            >
              <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-100/50 border border-slate-100 max-w-md w-full">
                <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase">
                  Step 6: Optimization
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">
                  Done & Analytics
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Monitor deep continuous performance matrices. Isolate business
                  trends instantly across unified multi-channel intelligence
                  report boards.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
