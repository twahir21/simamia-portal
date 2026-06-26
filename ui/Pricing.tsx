import React, { useState } from 'react';
import {
    Check,
    Sparkles,
    Zap,
    Crown,
    Shield,
    Clock,
    TrendingUp,
    Calendar,
    ArrowRight,
    Star,
    Gift,
    UserPlus,
    User,
    Info
} from 'lucide-react';
import { motion } from 'framer-motion';

// ==================== TYPESCRIPT TYPES ====================

interface TrialInfo {
    accountCreation: number; // days
    guestMode: number;       // days
}

interface Plan {
    id: string;
    name: string;
    nameEn: string;
    icon: React.ComponentType<{ className?: string }>;
    duration: string;
    durationDays: number;
    originalPrice: number | null;
    price: number;
    perDay: number;
    discount: number;
    savings: string | null;
    color: PlanColor;
    popular: boolean;
}

type PlanColor = 'slate' | 'sky' | 'emerald' | 'violet' | 'amber' | 'rose';

interface ColorClasses {
    bg: string;
    border: string;
    hoverBorder: string;
    icon: string;
    button: string;
    accent: string;
    badgeBg: string;
    badgeText: string;
}

interface TrustBadge {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    iconBg: string;
    iconColor: string;
}

// ==================== CONSTANTS ====================

const TRIAL_INFO: TrialInfo = {
    accountCreation: 14,
    guestMode: 7
};

const SHARED_FEATURES: string[] = [
    'Rekodi mauzo bila kikomo',
    'Fuatilia madeni ya wateja',
    'Ripoti za faida halisi',
    'Inafanya kazi offline',
    'Vikumbusho vya madeni SMS',
    'Usaidizi wa WhatsApp 24/7',
    'Hifadhi otomatiki ya data',
    'Unganisha maduka mengi',
    'Uhamisho wa data bila malipo'
];

const PLANS: Plan[] = [
    {
        id: 'daily',
        name: 'Kila Siku',
        nameEn: 'Daily',
        icon: Zap,
        duration: 'Siku 1',
        durationDays: 1,
        originalPrice: null,
        price: 500,
        perDay: 500,
        discount: 0,
        savings: null,
        color: 'slate',
        popular: false
    },
    {
        id: 'weekly',
        name: 'Kila Wiki',
        nameEn: 'Weekly',
        icon: Clock,
        duration: 'Siku 7',
        durationDays: 7,
        originalPrice: 3500,
        price: 3297,
        perDay: 471,
        discount: 5,
        savings: 'Okoa 5%',
        color: 'sky',
        popular: false
    },
    {
        id: 'monthly',
        name: 'Kila Mwezi',
        nameEn: 'Monthly',
        icon: Star,
        duration: 'Siku 30',
        durationDays: 30,
        originalPrice: 15000,
        price: 13500,
        perDay: 450,
        discount: 10,
        savings: 'Okoa 10%',
        color: 'emerald',
        popular: true
    },
    {
        id: 'quarterly',
        name: 'Miezi Mitatu',
        nameEn: '3 Months',
        icon: TrendingUp,
        duration: 'Siku 90',
        durationDays: 90,
        originalPrice: 45000,
        price: 38000,
        perDay: 422,
        discount: 15,
        savings: 'Okoa 15%',
        color: 'violet',
        popular: false
    },
    {
        id: 'biannual',
        name: 'Miezi Sita',
        nameEn: '6 Months',
        icon: Crown,
        duration: 'Siku 180',
        durationDays: 180,
        originalPrice: 90000,
        price: 72000,
        perDay: 400,
        discount: 20,
        savings: 'Okoa 20%',
        color: 'amber',
        popular: false
    },
    {
        id: 'yearly',
        name: 'Mwaka',
        nameEn: 'Yearly',
        icon: Shield,
        duration: 'Siku 365',
        durationDays: 365,
        originalPrice: 182490,
        price: 136500,
        perDay: 374,
        discount: 25,
        savings: 'Okoa 25%',
        color: 'rose',
        popular: false
    }
];

const TRUST_BADGES: TrustBadge[] = [
    {
        icon: Shield,
        title: 'Malipo Salama',
        description: 'M-Pesa, Tigo Pesa, Airtel Money',
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-600'
    },
    {
        icon: Calendar,
        title: 'Ghairi Wakati Wowote',
        description: 'Hakuna mkataba wa muda mrefu',
        iconBg: 'bg-sky-50',
        iconColor: 'text-sky-600'
    },
    {
        icon: Sparkles,
        title: 'Hakuna Gharama Zilizofichwa',
        description: 'Bei unayoona ndiyo unayolipa',
        iconBg: 'bg-violet-50',
        iconColor: 'text-violet-600'
    }
];

// ==================== HELPER FUNCTIONS ====================

const formatPrice = (price: number): string => {
    return price.toLocaleString('sw-TZ');
};

const getColorClasses = (color: PlanColor): ColorClasses => {
    const colors: Record<PlanColor, ColorClasses> = {
        slate: {
            bg: 'bg-slate-50',
            border: 'border-slate-200',
            hoverBorder: 'hover:border-slate-400',
            icon: 'bg-slate-100 text-slate-700',
            button: 'bg-slate-900 hover:bg-slate-800 text-white',
            accent: 'text-slate-700',
            badgeBg: 'bg-slate-100',
            badgeText: 'text-slate-700'
        },
        sky: {
            bg: 'bg-sky-50/50',
            border: 'border-sky-200',
            hoverBorder: 'hover:border-sky-400',
            icon: 'bg-sky-100 text-sky-700',
            button: 'bg-sky-500 hover:bg-sky-400 text-white',
            accent: 'text-sky-700',
            badgeBg: 'bg-sky-100',
            badgeText: 'text-sky-700'
        },
        emerald: {
            bg: 'bg-emerald-50/50',
            border: 'border-emerald-300',
            hoverBorder: 'hover:border-emerald-500',
            icon: 'bg-emerald-100 text-emerald-700',
            button: 'bg-emerald-500 hover:bg-emerald-400 text-white',
            accent: 'text-emerald-700',
            badgeBg: 'bg-emerald-100',
            badgeText: 'text-emerald-700'
        },
        violet: {
            bg: 'bg-violet-50/50',
            border: 'border-violet-200',
            hoverBorder: 'hover:border-violet-400',
            icon: 'bg-violet-100 text-violet-700',
            button: 'bg-violet-600 hover:bg-violet-500 text-white',
            accent: 'text-violet-700',
            badgeBg: 'bg-violet-100',
            badgeText: 'text-violet-700'
        },
        amber: {
            bg: 'bg-amber-50/50',
            border: 'border-amber-200',
            hoverBorder: 'hover:border-amber-400',
            icon: 'bg-amber-100 text-amber-700',
            button: 'bg-amber-500 hover:bg-amber-400 text-white',
            accent: 'text-amber-700',
            badgeBg: 'bg-amber-100',
            badgeText: 'text-amber-700'
        },
        rose: {
            bg: 'bg-rose-50/50',
            border: 'border-rose-200',
            hoverBorder: 'hover:border-rose-400',
            icon: 'bg-rose-100 text-rose-700',
            button: 'bg-rose-500 hover:bg-rose-400 text-white',
            accent: 'text-rose-700',
            badgeBg: 'bg-rose-100',
            badgeText: 'text-rose-700'
        }
    };
    return colors[color];
};

// ==================== COMPONENTS ====================

interface PricingCardProps {
    plan: Plan;
    index: number;
    isHovered: boolean;
    onHover: (id: string | null) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, index, isHovered, onHover }) => {
    const Icon = plan.icon;
    const colors = getColorClasses(plan.color);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => onHover(plan.id)}
            onMouseLeave={() => onHover(null)}
            className={`relative bg-white rounded-3xl border-2 ${colors.border} ${colors.hoverBorder} p-6 sm:p-7 transition-all duration-300 flex flex-col ${plan.popular
                    ? 'shadow-2xl shadow-emerald-500/20 scale-100 lg:scale-105 z-10'
                    : 'shadow-lg hover:shadow-xl'
                } ${isHovered ? 'transform -translate-y-2' : ''}`}
        >
            {/* Popular Badge */}
            {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-linear-to-r from-emerald-500 to-emerald-400 text-white text-[10px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg shadow-emerald-500/30 flex items-center gap-1.5 whitespace-nowrap">
                        <Star className="w-3 h-3 fill-current" />
                        Maarufu Zaidi
                    </div>
                </div>
            )}

            {/* Discount Badge */}
            {plan.discount > 0 && (
                <div className="absolute top-4 right-4">
                    <div className={`${colors.badgeBg} ${colors.badgeText} text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg`}>
                        -{plan.discount}%
                    </div>
                </div>
            )}

            {/* Plan Header */}
            <div className="mb-5">
                <div className={`w-12 h-12 ${colors.icon} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{plan.duration} • {plan.nameEn}</p>
            </div>


            {/* Pricing */}
            <div className="mb-5 pb-5 border-b border-slate-300">
                {plan.originalPrice && (
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-slate-400 line-through">
                            Tsh {formatPrice(plan.originalPrice)}
                        </span>
                        {plan.savings && (
                            <span className={`text-[10px] font-bold ${colors.accent} ${colors.badgeBg} px-2 py-0.5 rounded`}>
                                {plan.savings}
                            </span>
                        )}
                    </div>
                )}

                <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">
                        Tsh {formatPrice(plan.price)}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ {plan.duration.toLowerCase()}</span>
                </div>

                <div className="flex items-center gap-1.5 mt-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <span className="text-xs font-bold text-slate-700">
                        Tsh {formatPrice(plan.perDay)}/siku tu
                    </span>
                </div>
            </div>

            {/* Features List - SAME FOR ALL CARDS */}
            <div className="space-y-2.5 mb-6 flex-1">
                {SHARED_FEATURES.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                        <div className={`w-4 h-4 rounded-full ${colors.icon} flex items-center justify-center shrink-0 mt-0.5`}>
                            <Check className="w-2.5 h-2.5" strokeWidth={3} />
                        </div>
                        <span className="text-xs text-slate-700 leading-relaxed">{feature}</span>
                    </div>
                ))}
            </div>

            {/* CTA Button */}
            <a
                href={`https://wa.me/255798700900?text=${encodeURIComponent(`Habari! Nataka kuanza majaribio ya bure ya mpango wa ${plan.name} wa Simamia App.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3.5 ${colors.button} font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg flex items-center justify-center gap-2 group`}
            >
                Anza Majaribio ya Bure
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
        </motion.div>
    );
};

// ==================== MAIN COMPONENT ====================

const PricingSection: React.FC = () => {
    const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-sky-50">
            {/* Structural Backdrop Blurs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-0 right-0 w-125 h-125 bg-linear-to-br from-sky-200/20 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-100 h-100 bg-linear-to-tr from-blue-100/20 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-18 pb-20 relative z-10">

                {/* Trial Explanation Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 bg-linear-to-r from-sky-800 via-sky-600 to-sky-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl shadow-sky-500/20 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                <Gift className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-black">Jaribu Kabla Hujalipa!</h3>
                                <p className="text-sm text-white/90 mt-0.5">
                                    Vipengele vyote vinapatikana katika majaribio ya bure — hakuna kikomo.
                                </p>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <UserPlus className="w-5 h-5" />
                                    <p className="text-xs font-black uppercase tracking-wider">Baada ya Kujisajili</p>
                                </div>
                                <p className="text-3xl font-black">Siku {TRIAL_INFO.accountCreation}</p>
                                <p className="text-xs text-white/80 mt-1">za majaribio kamili ya bure</p>
                            </div>

                            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <User className="w-5 h-5" />
                                    <p className="text-xs font-black uppercase tracking-wider">Hali ya Mgeni</p>
                                </div>
                                <p className="text-3xl font-black">Siku {TRIAL_INFO.guestMode}</p>
                                <p className="text-xs text-white/80 mt-1">za majaribio bila akaunti</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* All Features Same Info Box */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8 bg-sky-50 border border-sky-200 rounded-2xl p-4 flex items-start gap-3"
                >
                    <div className="w-8 h-8 bg-sky-500 text-white rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <Info className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-sky-900">Vipengele Sawa kwa Kila Mpango</p>
                        <p className="text-xs text-sky-700 mt-0.5 leading-relaxed">
                            Chagua mpango wowote na upate ufikiaji kamili wa vipengele vyote vya Simamia App.
                            Tofauti pekee ni muda wa usajili na punguzo la bei.
                        </p>
                    </div>
                </motion.div>

                {/* Pricing Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PLANS.map((plan, index) => (
                        <PricingCard
                            key={plan.id}
                            plan={plan}
                            index={index}
                            isHovered={hoveredPlan === plan.id}
                            onHover={setHoveredPlan}
                        />
                    ))}
                </div>

                {/* Trust & Payment Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 grid sm:grid-cols-3 gap-4"
                >
                    {TRUST_BADGES.map((badge, index) => {
                        const Icon = badge.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-5 border border-slate-200 flex items-center gap-3"
                            >
                                <div className={`w-10 h-10 ${badge.iconBg} ${badge.iconColor} rounded-xl flex items-center justify-center shrink-0`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-900">{badge.title}</p>
                                    <p className="text-[11px] text-slate-500 mt-0.5">{badge.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>

            </div>
        </div>
    );
};

export default PricingSection;