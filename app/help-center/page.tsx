"use client";
import { motion } from "framer-motion";
import ContactHelp from "@/ui/contact-help";
import { PHONE_SUPPORT, SERVER_LINK } from "@/const/links.const";
import { useTranslation } from "@/provider/translation";
import { Mail, MessageCircle, Phone } from "lucide-react";

const HelpCenter = () => {
  const t = useTranslation();

const categories = [
  {
    title: t.categories.sales.title,
    icon: "fa-barcode",
    desc: t.categories.sales.desc,
    color: "bg-sky-500",
  },
  {
    title: t.categories.stock.title,
    icon: "fa-boxes-stacked",
    desc: t.categories.stock.desc,
    color: "bg-emerald-500",
  },
  {
    title: t.categories.debts.title,
    icon: "fa-hand-holding-dollar",
    desc: t.categories.debts.desc,
    color: "bg-orange-500",
  },
  {
    title: t.categories.reports.title,
    icon: "fa-chart-line",
    desc: t.categories.reports.desc,
    color: "bg-indigo-500",
  },
  {
    title: t.categories.expenses.title,
    icon: "fa-wallet",
    desc: t.categories.expenses.desc,
    color: "bg-red-500",
  },
  {
    title: t.categories.orders.title,
    icon: "fa-truck-fast",
    desc: t.categories.orders.desc,
    color: "bg-purple-500",
  },
];
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 selection:bg-sky-100">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-slate-900 py-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sky-400 font-bold tracking-widest uppercase text-sm"
          >
            {t.helpCenterHero.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-8"
          >
            {t.helpCenterHero.title1} <br />{" "}
            <span className="text-sky-500">{t.helpCenterHero.titleAccent}</span>
          </motion.h1>

          <div className="max-w-2xl mx-auto group">
            <div className="relative flex items-center">
              <i className="fa-solid fa-magnifying-glass absolute left-5 text-slate-400 group-focus-within:text-sky-500 transition-colors"></i>
              <input
                type="text"
                placeholder={t.helpCenterHero.searchPlaceholder}
                className="w-full py-5 pl-14 pr-6 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:bg-white focus:text-slate-900 focus:ring-4 focus:ring-sky-500/30 transition-all outline-none text-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- VIDEO MASTERCLASS --- */}
      <section className="max-w-5xl mx-auto px-6 -mt-16 relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white"
        >
          <div className="aspect-video bg-slate-800 relative group cursor-pointer">
            {/* Replace with your actual Simamia Training Video URL */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WigXcQ?controls=1"
              title={t.masterclass.videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="p-6 flex flex-col md:flex-row justify-between items-center bg-white">
            <div>
              <h3 className="text-xl font-bold">{t.masterclass.title}</h3>
              <p className="text-slate-500">{t.masterclass.description}</p>
            </div>
            <button
              className="mt-4 md:mt-0 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-bold transition-transform active:scale-95"
              onClick={() => {
                const link = document.createElement("a");
                link.href = `${SERVER_LINK}/user-guide.pdf`; // full URL or relative path
                link.download = "user-guide.pdf"; // suggested filename
                link.click();
              }}
            >
              {t.masterclass.buttonText}
            </button>
          </div>
        </motion.div>
      </section>

      {/* --- FEATURE CATEGORIES --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t.sectionOverview.title}</h2>
          <p className="text-slate-500">{t.sectionOverview.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-sky-100 transition-all cursor-pointer group"
            >
              <div
                className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-sky-200 group-hover:scale-110 transition-transform`}
              >
                <i className={`fa-solid ${item.icon} text-xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact & Support Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-linear-to-r from-purple-600 to-sky-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                {t.contactHelp.leftSide.mainTitle}
              </h2>
              <p className="text-purple-100 text-lg mb-8">
                {t.contactHelp.leftSide.subtitle}
              </p>
              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center space-x-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-purple-200">
                      {t.contactHelp.leftSide.phoneLabel}
                    </div>
                    <span className="font-medium">{PHONE_SUPPORT} </span>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center space-x-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-purple-200">
                      {t.contactHelp.leftSide.emailLabel}
                    </div>
                    <span className="font-medium">huduma@simamia.co.tz</span>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center space-x-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-purple-200">
                      {t.contactHelp.leftSide.chatLabel}
                    </div>
                    <span className="font-medium">
                      {t.contactHelp.leftSide.chatStatus}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
              <h3 className="text-xl font-semibold mb-4">
                {t.contactHelp.rightSide.cardTitle}
              </h3>

              <p className="text-purple-100 mb-6">
                {t.contactHelp.rightSide.cardDesc}
              </p>

              {/* FAQ Preview */}
              <div className="space-y-3 mb-6">
                <div className="text-sm text-white/80">
                  {t.contactHelp.rightSide.faqLabel}
                </div>

                {/* 2. Using optional chaining to prevent crashes */}
                {t.contactHelp.rightSide.faqQuestions?.map(
                  (question: string, i: number) => (
                    <div
                      key={i}
                      className="text-sm bg-white/5 rounded-lg p-2 cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      {question}
                    </div>
                  ),
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  window.open(
                    "https://wa.me/255798700900?text=Habari%20Simamia%20App,%20nahitaji%20msaada.",
                    "_blank",
                  )
                }
                className="w-full bg-white text-purple-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t.contactHelp.rightSide.buttonText}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <ContactHelp />
    </div>
  );
};

export default HelpCenter;
