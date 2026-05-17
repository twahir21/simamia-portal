import { PHONE_SUPPORT } from "@/const/links.const";
import { motion } from "framer-motion";
import { ArrowDown, Mail, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

export default function ContactHelp () {
    const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
    return (
      <>
        {/* Contact & Support Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-linear-to-r from-purple-600 to-sky-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 translate-y-1/2"></div>

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Bado unahitaji Msaada?
                </h2>
                <p className="text-purple-100 text-lg mb-8">
                  Timu ipo tayari kukusaidia kwa swali lolote
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
                        Msaada wa Simu:
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
                        Msaada wa barua pepe
                      </div>
                      <span className="font-medium">twahirsudy3@gmail.com</span>
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
                      <div className="text-xs text-purple-200">Live chat</div>
                      <span className="font-medium">
                        24/7 Support Inapatikana
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
                <h3 className="text-xl font-semibold mb-4">
                  Msaada wa Live Chat
                </h3>

                <p className="text-purple-100 mb-6">
                  Ongea na timu yetu ya msaada moja kwa moja. Muda wa kawaida wa
                  kujibiwa: dakika 2
                </p>

                {/* FAQ Preview */}
                <div className="space-y-3 mb-6">
                  <div className="text-sm text-white/80">
                    Maswali yanayoulizwa mara kwa mara:
                  </div>

                  {[
                    "Ninawezaje kubadilisha nenosiri langu?",
                    "Je, ninaweza kupakua taarifa za mauzo yangu?",
                    "Offline mode inafanyaje kazi?",
                  ].map((question, i) => (
                    <div
                      key={i}
                      className="text-sm bg-white/5 rounded-lg p-2 cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      {question}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    window.open(
                      "https://wa.me/255674291587?text=Habari%20Simamia%20App,%20nahitaji%20msaada.",
                      "_blank",
                    )
                  }
                  className="w-full bg-white text-purple-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />

                  <span>Anza Mazungumzo</span>
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* Helpful Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Je kituo cha Msaada kimekusaidia?
            </h3>
            <p className="text-gray-600 mb-4">
              Maoni yako yatatusaidia sisi kukua.
            </p>

            <div className="flex items-center justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsHelpful(true)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  isHelpful === true
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Ndio 👍
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsHelpful(false)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  isHelpful === false
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Hapana 👎
              </motion.button>
            </div>

            {isHelpful !== null && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-gray-500 mt-4"
              >
                Asante kwa maoni yako!
              </motion.p>
            )}
          </div>
        </section>


        {/* Back to Top Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 bg-sky-600 text-white p-3 rounded-full shadow-lg hover:bg-sky-700 transition-colors z-40"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowDown className="w-5 h-5 rotate-180" />
        </motion.button>
      </>
    );
}