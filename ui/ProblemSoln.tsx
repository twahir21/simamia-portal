"use client";

import { motion } from "framer-motion";
import {
  XCircle,
  CheckCircle2,
  BookCopy,
  AlertCircle,
  TrendingDown,
  Database,
  BellRing,
  BarChart3,
  Zap,
  Package,
  Clock3,
  BarChart,
} from "lucide-react";

const ProblemSolution = () => {
  const problems = [
    {
      title: "Daftari na Kumbukumbu Kupotea",
      desc: "Mauzo, madeni na taarifa za biashara kupotea au kuharibika kirahisi",
      icon: <BookCopy className="text-red-500" />,
    },
    {
      title: "Kusahau Madeni ya Wateja",
      desc: "Kushindwa kufuatilia nani anadaiwa, kiasi gani na lini alikopa",
      icon: <AlertCircle className="text-red-500" />,
    },
    {
      title: "Bidhaa Kupungua Bila Hesabu",
      desc: "Stock kuisha au kupotea bila kujua kilichouzwa au kilichobaki",
      icon: <TrendingDown className="text-red-500" />,
    },
    {
      title: "Muda Kupotea Wakati wa Kuuza",
      desc: "Kutafuta bidhaa kwa muda mrefu na kuchelewesha huduma kwa mteja",
      icon: <Clock3 className="text-red-500" />,
    },
    {
      title: "Ripoti za Biashara Kutokueleweka",
      desc: "Kukosa picha halisi ya faida, matumizi na mwenendo wa biashara",
      icon: <BarChart className="text-red-500" />,
    },
  ];

  const solutions = [
    {
      title: "Kumbukumbu Salama Kidijitali",
      desc: "Mauzo, madeni na taarifa zako zote huhifadhiwa kwa usalama ndani ya app",
      icon: <Database className="text-green-500" />,
    },
    {
      title: "Ufuatiliaji Rahisi wa Madeni",
      desc: "Sajili wadaiwa, lipa madeni na angalia muhtasari wa deni muda wowote",
      icon: <BellRing className="text-green-500" />,
    },
    {
      title: "Usimamizi Sahihi wa Stock",
      desc: "Fuatilia bidhaa zinazoingia, zinazouzwa na zilizobaki papo hapo",
      icon: <Package className="text-green-500" />,
    },
    {
      title: "Mauzo ya Haraka na Rahisi",
      desc: "Tumia scan, smart search na quick sale kuuza kwa sekunde chache",
      icon: <Zap className="text-green-500" />,
    },
    {
      title: "Ripoti na Takwimu za Biashara",
      desc: "Pata ripoti za mauzo, matumizi, faida na maendeleo ya biashara yako",
      icon: <BarChart3 className="text-green-500" />,
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Acha Kubahatisha, Anza{" "}
            <span className="text-green-600">Kusimamia</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Biashara nyingi zinashindwa kwa sababu ya kukosa kumbukumbu sahihi.
            Simamia inabadilisha changamoto zako kuwa fursa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* PROBLEM COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-50 rounded-3xl p-8 border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-red-100 p-2 rounded-lg">
                <XCircle className="text-red-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                Changamoto za Zamani
              </h3>
            </div>

            <div className="space-y-6">
              {problems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100"
                >
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ARROW DIVIDER (Desktop Only) */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 mt-40 z-10 bg-green-600 text-white p-3 rounded-full shadow-xl">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          {/* SOLUTION COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-green-50 rounded-3xl p-8 border border-green-100"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle2 className="text-green-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                Suluhisho la Simamia
              </h3>
            </div>

            <div className="space-y-6">
              {solutions.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-green-100"
                >
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
