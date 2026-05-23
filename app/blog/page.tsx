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
  Sparkles,
  BookOpen,
} from "lucide-react";
import { useState, useMemo } from "react";

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

  const featuredPost = useMemo(
    () => blogPosts.find((p) => p.featured) || blogPosts[0],
    [],
  );
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
      {/* Decorative Blur Backdrops */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-150 h-150 bg-linear-to-br from-sky-200/30 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-1/4 left-0 w-100 h-100 bg-linear-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl -translate-x-1/4" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline Column */}
            <div className="space-y-6 lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-sky-50 border border-sky-200/70 rounded-full"
              >
                <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-xs font-semibold text-sky-800 tracking-wide">
                  Fresh insights for Tanzanian retail
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900"
              >
                The{" "}
                <span className="text-sky-600 bg-linear-to-r from-sky-600 to-blue-600 bg-clip-text">
                  SIMAMIA APP
                </span>{" "}
                Knowledge Base
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-600 leading-relaxed max-w-xl"
              >
                Practical execution manuals, local retail growth playbooks, and
                structural financial tips designed to scale your{" "}
                <span className="font-semibold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded-md">
                  duka
                </span>{" "}
                operations safely.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-4 pt-2"
              >
                <div className="flex -space-x-2.5">
                  {["JS", "SM", "AK", "MT"].map((initials, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full bg-linear-to-br from-slate-700 to-slate-900 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow-xs shrink-0"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Read by over{" "}
                  <span className="text-slate-800 font-bold">2,500+</span>{" "}
                  business operators weekly
                </p>
              </motion.div>
            </div>

            {/* Right Side Featured Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 16 }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute -inset-2 bg-linear-to-r from-sky-500 to-blue-500 rounded-3xl blur-xl opacity-10" />
              <div className="relative bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden group">
                <div className="h-48 bg-linear-to-br from-sky-600 via-sky-500 to-slate-800 p-6 flex flex-col justify-between relative">
                  <div className="absolute inset-0 bg-[radial-linear(ellipse_at_top_right,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
                  <span className="self-start px-2.5 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-[10px] font-bold uppercase tracking-wider">
                    Featured Article
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight line-clamp-2 drop-shadow-xs group-hover:text-sky-100 transition-colors">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h3>
                </div>
                <div className="p-6 bg-white">
                  <p className="text-slate-600 text-sm mb-5 leading-relaxed line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 text-xs font-bold">
                        {featuredPost.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-xs font-semibold text-slate-700">
                        {featuredPost.author}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1.5 text-sky-600 hover:text-sky-700 text-xs font-bold uppercase tracking-wider group/link"
                    >
                      Read Now
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  selectedCategory === category
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
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          selectedCategory === category
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

      {/* Global Bottom Funnel CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center border border-slate-800 shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-linear(ellipse_at_top,rgba(14,165,233,0.12),transparent_65%)] pointer-events-none" />
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
              Ready to Transform Your Duka?
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
              Ditch the paper books. Take control of your store revenue metrics
              instantly with SIMAMIA APP — completely offline capable.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/download"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-sky-500/20 uppercase tracking-wider"
              >
                Download Mobile POS
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-slate-700/80 transition uppercase tracking-wider"
              >
                Contact Support Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
