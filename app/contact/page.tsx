"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  CheckCircle2, 
  Send, 
  Building2, 
  Store, 
  Sparkles,
  MapPin
} from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    businessType: "single-duka",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API request processing
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setFormState({ name: "", phone: "", email: "", businessType: "single-duka", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* Structural Backdrop Blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-125 h-125 bg-linear-to-br from-sky-200/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-linear-to-tr from-blue-100/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 relative z-10">
        
        {/* Header Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 border border-sky-200/60 rounded-full text-xs font-bold text-sky-800 tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            Grow With Simamia
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Let’s Build Your Digital Retail Infrastructure
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Have questions about offline syncing, setting up multi-branch operations, or migrating your ledger books safely? Our local team is ready to assist.
          </p>
        </div>

        {/* Master Layout Matrix Split-Panel */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Direct Communication Panels */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <div>
                <h3 className="text-lg font-bold tracking-tight">Direct Support</h3>
                <p className="text-xs text-slate-400 mt-1">Skip the forms entirely if you need instant operational answers.</p>
              </div>

              <div className="space-y-4">
                {/* WhatsApp Route */}
                <a 
                  href="https://wa.me/255XXXXXXXXX" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3.5 bg-slate-800/60 border border-slate-700/50 rounded-xl hover:bg-slate-800 hover:border-emerald-500/30 transition group"
                >
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">WhatsApp Chat</h4>
                    <p className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">+255 (0) XXX XXX XXX</p>
                  </div>
                </a>

                {/* Direct Phone Support */}
                <a 
                  href="tel:+255XXXXXXXXX" 
                  className="flex items-center gap-4 p-3.5 bg-slate-800/60 border border-slate-700/50 rounded-xl hover:bg-slate-800 hover:border-sky-500/30 transition group"
                >
                  <div className="w-10 h-10 bg-sky-500/10 text-sky-400 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Call Operations</h4>
                    <p className="text-sm font-semibold text-white group-hover:text-sky-400 transition-colors">Mon - Sat, 8AM - 6PM</p>
                  </div>
                </a>

                {/* Email Panel */}
                <div className="flex items-center gap-4 p-3.5 bg-slate-800/60 border border-slate-700/50 rounded-xl">
                  <div className="w-10 h-10 bg-purple-500/10 text-purple-400 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Corporate Requests</h4>
                    <p className="text-sm font-semibold text-white">salama@simamia.co.tz</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Headquarters Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-start gap-4">
              <div className="p-2.5 bg-slate-100 rounded-xl text-slate-700 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Headquarters</h4>
                <p className="text-sm font-bold text-slate-800 mt-0.5">Dar es Salaam, Tanzania</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">Providing on-site setup assistance across major retail districts.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form Block */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/40 relative">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      placeholder="e.g., Juma Hamisi" 
                      className="w-full text-xs px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all text-slate-800 placeholder:text-slate-400 font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({...formState, phone: e.target.value})}
                      placeholder="e.g., 0712345678" 
                      className="w-full text-xs px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all text-slate-800 placeholder:text-slate-400 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email Address (Optional)</label>
                  <input 
                    type="email" 
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    placeholder="e.g., juma@yourduka.com" 
                    className="w-full text-xs px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all text-slate-800 placeholder:text-slate-400 font-medium"
                  />
                </div>

                {/* Business Architecture Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Operation Scale</label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <label className={`border rounded-xl p-4 flex items-start gap-3 cursor-pointer select-none transition-all ${
                      formState.businessType === "single-duka" 
                        ? "border-sky-500 bg-sky-50/40 ring-2 ring-sky-500/5" 
                        : "border-slate-200 hover:border-slate-300"
                    }`}>
                      <input 
                        type="radio" 
                        name="businessType" 
                        value="single-duka"
                        checked={formState.businessType === "single-duka"}
                        onChange={() => setFormState({...formState, businessType: "single-duka"})}
                        className="sr-only" 
                      />
                      <Store className={`w-4 h-4 mt-0.5 ${formState.businessType === "single-duka" ? "text-sky-600" : "text-slate-400"}`} />
                      <div>
                        <p className="text-xs font-bold text-slate-800">Single Retail Duka</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Standalone retail store or local marketplace vendor.</p>
                      </div>
                    </label>

                    <label className={`border rounded-xl p-4 flex items-start gap-3 cursor-pointer select-none transition-all ${
                      formState.businessType === "multi-branch" 
                        ? "border-sky-500 bg-sky-50/40 ring-2 ring-sky-500/5" 
                        : "border-slate-200 hover:border-slate-300"
                    }`}>
                      <input 
                        type="radio" 
                        name="businessType" 
                        value="multi-branch"
                        checked={formState.businessType === "multi-branch"}
                        onChange={() => setFormState({...formState, businessType: "multi-branch"})}
                        className="sr-only" 
                      />
                      <Building2 className={`w-4 h-4 mt-0.5 ${formState.businessType === "multi-branch" ? "text-sky-600" : "text-slate-400"}`} />
                      <div>
                        <p className="text-xs font-bold text-slate-800">Multi-Branch Chain</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Wholesale distributors or multi-location inventory chains.</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Tell Us About Your Requirements</label>
                  <textarea 
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    placeholder="Describe your inventory size, required custom tools, or any specific challenges you face..."
                    className="w-full text-xs px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all text-slate-800 placeholder:text-slate-400 font-medium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-sky-500/10 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Submit Consultation Request
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Toast Success Animation Layer */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center text-center p-6"
                  >
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-3 shadow-xs">
                      <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <h3 className="text-base font-black text-slate-900">Request Dispatched Successfully</h3>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 leading-relaxed">
                      Our system design team will reach out to you via call or WhatsApp message within the next 4 working hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}