import { PHONE_SUPPORT } from "@/const/links.const";
import { useFeedback } from "@/hooks/useFeedback";
import { useTranslation } from "@/provider/translation";
import { motion } from "framer-motion";
import { ArrowDown, Mail, MessageCircle, Phone, Loader2 } from "lucide-react"; // Added Loader2
import { usePathname } from "next/navigation";


export default function ContactHelp() {
  const t = useTranslation();

  // Generates something like: "/help/how-to-pay" or "/services/insurance"
  const pathname = usePathname();
  const itemId = `page_${pathname.replace(/\//g, "_")}`;

  const { isHelpful, hasSubmitted, isLoading, handleFeedbackClick } =
    useFeedback(itemId);

if (hasSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-3 p-4 bg-green-50/80 border border-green-200 rounded-xl shadow-sm"
      >
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.15,
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
          className="flex items-center justify-center w-9 h-9 bg-green-100 rounded-full"
        >
          <svg
            className="w-5 h-5 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        <div className="text-center">
          <p className="text-sm font-semibold text-green-800">
            {t.feedback.thankYou}
          </p>
          <p className="text-xs text-green-600/70 mt-1">
            {t.feedback.subtitle}
          </p>
        </div>
      </motion.div>
    );
  }

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
                    "https://wa.me/255674291587?text=Habari%20Simamia%20App,%20nahitaji%20msaada.",
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

      {/* Helpful Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {t.feedback.title}
          </h3>
          <p className="text-gray-600 mb-4">{t.feedback.subtitle}</p>

          <div className="flex items-center justify-center space-x-4">
            {/* 3. Implemented disabled and isLoading states */}
            <motion.button
              whileHover={!isLoading ? { scale: 1.1 } : {}}
              whileTap={!isLoading ? { scale: 0.9 } : {}}
              disabled={isLoading}
              onClick={() => handleFeedbackClick(true)}
              className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                isHelpful === true
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading && isHelpful === true && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {t.feedback.yesBtn}
            </motion.button>

            <motion.button
              whileHover={!isLoading ? { scale: 1.1 } : {}}
              whileTap={!isLoading ? { scale: 0.9 } : {}}
              disabled={isLoading}
              onClick={() => handleFeedbackClick(false)}
              className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                isHelpful === false
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading && isHelpful === false && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {t.feedback.noBtn}
            </motion.button>
          </div>
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
