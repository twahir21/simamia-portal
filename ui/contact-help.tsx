import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Mail, MessageCircle, Phone, X } from "lucide-react";
import { useState } from "react";

export default function ContactHelp () {
    const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
    const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
    return <>

      {/* Contact & Support Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-linear-to-r from-purple-600 to-sky-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
              <p className="text-purple-100 text-lg mb-8">
                Our support team is ready to assist you with any questions
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
                    <div className="text-xs text-purple-200">Phone support</div>
                    <span className="font-medium">+254 700 000 000</span>
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
                    <div className="text-xs text-purple-200">Email support</div>
                    <span className="font-medium">support@simamia.com</span>
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
                    <span className="font-medium">24/7 Support Available</span>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
              <h3 className="text-xl font-semibold mb-4">Live Chat Support</h3>
              <p className="text-purple-100 mb-6">
                Chat with our support team in real-time. Average response time: 2 minutes
              </p>
              
              {/* FAQ Preview */}
              <div className="space-y-3 mb-6">
                <div className="text-sm text-white/80">Common questions:</div>
                {["How do I reset my password?", "Can I export my sales data?", "How does offline mode work?"].map((question, i) => (
                  <div key={i} className="text-sm bg-white/5 rounded-lg p-2 cursor-pointer hover:bg-white/10 transition-colors">
                    {question}
                  </div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsLiveChatOpen(true)}
                className="w-full bg-white text-purple-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Start Conversation</span>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Helpful Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Was this help center helpful?</h3>
          <p className="text-gray-600 mb-4">Your feedback helps us improve</p>
          
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
              Yes 👍
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
              No 👎
            </motion.button>
          </div>
          
          {isHelpful !== null && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-gray-500 mt-4"
            >
              Thank you for your feedback!
            </motion.p>
          )}
        </div>
      </section>

      {/* Live Chat Modal */}
      <AnimatePresence>
        {isLiveChatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsLiveChatOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Live Chat Support</h3>
                <button
                  onClick={() => setIsLiveChatOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">
                Please describe your issue and our support team will respond shortly.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="How can we help you?"
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-sky-600 text-white py-3 rounded-xl font-semibold hover:bg-sky-700 transition-colors"
                >
                  Start Chat
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsLiveChatOpen(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
              
              <p className="text-xs text-gray-400 text-center mt-4">
                By starting a chat, you agree to our Terms of Service and Privacy Policy
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
}