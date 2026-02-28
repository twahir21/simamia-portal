"use client";
import { motion } from 'framer-motion';
import ContactHelp from '@/ui/contact-help';

const HelpCenter = () => {
  const categories = [
    { title: "Smart Sales", icon: "fa-barcode", desc: "Scan, search, or tap favorites to sell instantly.", color: "bg-sky-500" },
    { title: "Stock & Inventory", icon: "fa-boxes-stacked", desc: "Keep track of what's in your shop and what's out.", color: "bg-emerald-500" },
    { title: "Debts & Credits", icon: "fa-hand-holding-dollar", desc: "Track customer debts and follow up on payments.", color: "bg-orange-500" },
    { title: "Profit & Loss", icon: "fa-chart-line", desc: "Real-time reports on how your business is growing.", color: "bg-indigo-500" },
    { title: "Expenses", icon: "fa-wallet", desc: "Record rent, transport, and daily operational costs.", color: "bg-red-500" },
    { title: "Orders & Delivery", icon: "fa-truck-fast", desc: "Manage bulk sales and customer deliveries.", color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 selection:bg-sky-100">
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-slate-900 py-20 px-6 overflow-hidden">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sky-400 font-bold tracking-widest uppercase text-sm"
          >
            Simamia Help Center
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-8"
          >
            Master our App under <br/> <span className="text-sky-500">5 minutes</span>
          </motion.h1>

          <div className="max-w-2xl mx-auto group">
            <div className="relative flex items-center">
              <i className="fa-solid fa-magnifying-glass absolute left-5 text-slate-400 group-focus-within:text-sky-500 transition-colors"></i>
              <input 
                type="text" 
                placeholder="Search 'how to scan' or 'check profit'..." 
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
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1" 
              title="Master Simamia in 5 Minutes"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            
          </div>
          <div className="p-6 flex flex-col md:flex-row justify-between items-center bg-white">
            <div>
              <h3 className="text-xl font-bold">New to Simamia?</h3>
              <p className="text-slate-500">This 5-minute crash course covers sales, stock, and reports.</p>
            </div>
            <button className="mt-4 md:mt-0 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-bold transition-transform active:scale-95">
              Download Guide (PDF)
            </button>
          </div>
        </motion.div>
      </section>

      {/* --- FEATURE CATEGORIES --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Explore by Module</h2>
          <p className="text-slate-500">Step-by-step guidance for every button in the app.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-sky-100 transition-all cursor-pointer group"
            >
              <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-sky-200 group-hover:scale-110 transition-transform`}>
                <i className={`fa-solid ${item.icon} text-xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-6">
                {item.desc}
              </p>
              <span className="text-sky-600 font-semibold flex items-center gap-2 group-hover:gap-4 transition-all">
                Learn more <i className="fa-solid fa-arrow-right-long text-sm"></i>
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <ContactHelp />

    </div>
  );
};

export default HelpCenter;