"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Bookmark,
  Share2,
  Mail,
  X,
  TrendingUp,
  Filter,
  ChevronDown,
  BookOpen,
  Flame,
} from "lucide-react";
import { useState, useMemo } from "react";
import { APK_LINK } from "@/const/links.const";
import PageHero from "@/ui/pageHero";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  imageUrl: string;
  author: string;
  featured?: boolean;
  views?: number;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title:
      "How Offline POS Systems Are Transforming Tanzanian Small Businesses",
    excerpt:
      "Discover why offline-first technology is the game-changer for shops in areas with unreliable internet connectivity.",
    date: "2025-12-15",
    readTime: "5 min read",
    category: "Technology",
    slug: "offline-pos-transforming-tanzanian-business",
    imageUrl: "/blog/offline-pos.jpg",
    author: "John Simamia",
    featured: true,
    views: 2847,
  },
  {
    id: "2",
    title:
      "From Paper Books to Digital: A Step-by-Step Guide for Small Shop Owners",
    excerpt:
      "Learn how to transition your business from manual record-keeping to efficient digital management without stress.",
    date: "2025-12-10",
    readTime: "7 min read",
    category: "Guides",
    slug: "paper-to-digital-guide-shop-owners",
    imageUrl: "/blog/digital-transition.jpg",
    author: "Sarah Mushi",
    views: 1923,
  },
  {
    id: "3",
    title: "5 Common Mistakes Small Business Owners Make When Tracking Sales",
    excerpt:
      "Avoid these pitfalls that cost you money and learn how SIMAMIA APP helps you stay on top of your finances.",
    date: "2025-12-05",
    readTime: "4 min read",
    category: "Tips",
    slug: "common-mistakes-tracking-sales",
    imageUrl: "/blog/sales-mistakes.jpg",
    author: "John Simamia",
    views: 3156,
  },
  {
    id: "4",
    title: "How to Calculate Profit Margins for Your Duka (Simple Formula)",
    excerpt:
      "A beginner-friendly guide to understanding and maximizing your profit margins in Tanzanian shillings.",
    date: "2025-11-28",
    readTime: "6 min read",
    category: "Finance",
    slug: "calculate-profit-margins-duka",
    imageUrl: "/blog/profit-margins.jpg",
    author: "Sarah Mushi",
    featured: true,
    views: 2104,
  },
  {
    id: "5",
    title: "The Future of Mobile POS in Tanzania: Trends to Watch in 2026",
    excerpt:
      "From AI predictions to improved offline capabilities, here's what's coming for mobile business management.",
    date: "2025-11-20",
    readTime: "8 min read",
    category: "Trends",
    slug: "future-mobile-pos-tanzania-2026",
    imageUrl: "/blog/mobile-pos-future.jpg",
    author: "John Simamia",
    views: 1567,
  },
  {
    id: "6",
    title: "Managing Business Debt: Tips for Small Retailers",
    excerpt:
      "Practical strategies to handle debt while keeping your business healthy and growing.",
    date: "2025-11-15",
    readTime: "5 min read",
    category: "Finance",
    slug: "managing-business-debt-tips",
    imageUrl: "/blog/debt-management.jpg",
    author: "Sarah Mushi",
    views: 987,
  },
];

const categories = ["All", "Technology", "Guides", "Tips", "Finance", "Trends"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};


const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  },
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);


  // Performance Optimization: Prevent calculation lagging on continuous inputs
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);


  const trendingPosts = useMemo(
    () =>
      [...blogPosts]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 3),
    [],
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Technology: "bg-sky-50 text-sky-700 border-sky-200/60",
      Guides: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
      Tips: "bg-amber-50 text-amber-700 border-amber-200/60",
      Finance: "bg-violet-50 text-violet-700 border-violet-200/60",
      Trends: "bg-rose-50 text-rose-700 border-rose-200/60",
    };
    return colors[category] || "bg-slate-50 text-slate-700 border-slate-200";
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-sky-500 selection:text-white">

      {/* Hero Section */}
      <PageHero
        tag="Fresh insights for Tanzanian retail"
        title="Your Knowledge Base"
        description={
          <>
            Practical execution manuals, local retail growth playbooks, and structural financial tips designed to scale your duka operations safely.
          </>
        }
      />




      {/* Sticky Management Controls */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-4 px-4 sm:px-6 lg:px-8 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Input Interface */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles, topics, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all text-sm text-slate-800 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Categories Selector Engine */}
          <div className="hidden md:flex items-center gap-1.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${selectedCategory === category
                  ? "bg-slate-950 text-white border-slate-950 shadow-xs"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Mobile Display Toggles */}
          <div className="md:hidden w-full">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
            >
              <span className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-sky-600" />
                Category: {selectedCategory}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-1.5 pt-2.5">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsFilterOpen(false);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedCategory === category
                          ? "bg-sky-600 text-white"
                          : "bg-slate-100 text-slate-600"
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Grid Content Layout */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Primary Infinite Blog Grid */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {filteredPosts.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 p-8"
                  >
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-5 h-5 text-slate-400" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-1">
                      No execution parameters matched
                    </h3>
                    <p className="text-xs text-slate-500 mb-4 max-w-xs mx-auto">
                      Try re-filtering your categories dashboard queries
                      clear-slate.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("All");
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700 transition"
                    >
                      Clear Active Parameters
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid sm:grid-cols-2 gap-6"
                  >
                    {filteredPosts.map((post) => (
                      <motion.article
                        key={post.id}
                        variants={itemVariants}
                        className="group bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-xs hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          {/* Image Fallback Wrapper Box */}
                          <Link
                            href={`/blog/${post.slug}`}
                            className="relative block h-44 bg-linear-to-br from-slate-100 to-slate-200/60 overflow-hidden border-b border-slate-100"
                          >
                            <div className="absolute inset-0 bg-linear-to-tr from-sky-600/5 via-transparent to-slate-900/5 group-hover:scale-105 transition-transform duration-500" />

                            {/* Graphic Dynamic Icon Presentation instead of easily breaking absolute paths */}
                            <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                              <BookOpen className="w-10 h-10 stroke-[1.2] group-hover:text-sky-200 group-hover:scale-110 transition-all duration-500" />
                            </div>

                            <div className="absolute top-3 left-3">
                              <span
                                className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border ${getCategoryColor(post.category)}`}
                              >
                                {post.category}
                              </span>
                            </div>

                            {post.featured && (
                              <div className="absolute top-3 right-3">
                                <span className="px-2 py-0.5 bg-amber-400 text-amber-950 text-[10px] font-bold rounded-sm flex items-center gap-1 shadow-xs">
                                  HOT
                                </span>
                              </div>
                            )}
                          </Link>

                          {/* Content Segment */}
                          <div className="p-5">
                            <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400 mb-2.5">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(post.date).toLocaleDateString(
                                  "en-TZ",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}
                              </span>
                              <span className="text-slate-300">•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.readTime}
                              </span>
                            </div>

                            <h2 className="text-base font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors line-clamp-2 tracking-tight leading-snug">
                              <Link href={`/blog/${post.slug}`}>
                                {post.title}
                              </Link>
                            </h2>

                            <p className="text-slate-600 text-xs mb-4 line-clamp-2 leading-relaxed">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>

                        {/* Card Anchor Base Footer */}
                        <div className="px-5 pb-5 pt-3 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-white text-[9px] font-bold">
                              {post.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <span className="text-xs font-medium text-slate-600">
                              {post.author}
                            </span>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <button
                              className="p-1.5 text-slate-400 hover:text-sky-600 rounded-md transition"
                              aria-label="Bookmark"
                            >
                              <Bookmark className="w-4 h-4" />
                            </button>
                            <button
                              className="p-1.5 text-slate-400 hover:text-sky-600 rounded-md transition"
                              aria-label="Share"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sticky Configuration Right Widgets Panel */}
            <aside className="space-y-6 lg:sticky lg:top-24">
              {/* Hot Activity Feed Container */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-sky-600" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Trending Metrics
                  </h3>
                </div>
                <div className="space-y-4">
                  {trendingPosts.map((post, index) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="flex gap-3 group items-start"
                    >
                      <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-medium block mt-1">
                          {post.readTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Opt-In Canvas */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden border border-slate-800 shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
                <Mail className="w-8 h-8 text-sky-400 mb-3" />
                <h3 className="font-bold text-base tracking-tight mb-1">
                  Get Weekly Growth Insights
                </h3>
                <p className="text-slate-400 text-xs mb-4 leading-relaxed">
                  Join 2,500+ operators learning ledger metrics strategy
                  straight to target.
                </p>
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input
                    type="email"
                    placeholder="your@email.co.tz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700/60 rounded-xl placeholder:text-slate-500 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs rounded-xl transition"
                  >
                    Subscribe Free
                  </button>
                </form>
                <AnimatePresence>
                  {isSubscribed && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-emerald-400 text-[11px] font-semibold mt-3 text-center"
                    >
                      ✓ Verification code dispatched to inbox.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </aside>
          </div>
        </div>
      </section>


      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full bg-linear-to-br from-sky-700 to-sky-800 py-8 sm:py-10 text-center relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/20 border border-sky-500/30 rounded-full text-xs font-bold text-sky-300 tracking-wide uppercase mb-4">
            <Flame className="w-3.5 h-3.5" />
            Anza Leo Bila Malipo
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Ready to Transform Your Duka?
          </h2>
          <p className="text-sm text-white max-w-xl mx-auto mb-6 leading-relaxed">
            Ditch the paper books. Take control of your store revenue metrics
            instantly with SIMAMIA APP — completely offline capable.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={APK_LINK}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-emerald-500/20"
            >
              Download Mobile POS
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/faqs"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition backdrop-blur-sm"
            >
              Ukurasa wa Maswali
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
