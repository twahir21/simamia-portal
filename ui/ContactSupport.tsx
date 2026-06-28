import React from 'react';
import {
    MapPin,
    Clock,
    Phone,
    Store,
    TrendingUp,
    AlertCircle,
    HelpCircle,
    Settings,
    CreditCard,
    Users,
    ExternalLink,
    ChevronRight,
    LucideProps
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube, FaLinkedin } from 'react-icons/fa6';
import { SiThreads } from 'react-icons/si';
import { motion } from 'framer-motion';

const ContactSupport = () => {

    const whatsappNumber = '255798700900';

    type category = "general" | "technical" | "how-to-use" | "complaints" | "sales" | "profits";

    type Topic = {
        id: category;
        title: string;
        subtitle: string;
        icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        color: string;
        message: string;
    }

    const topics: Topic[] = [
        {
            id: 'general',
            title: 'Maswali ya Jumla',
            subtitle: 'General Inquiries',
            icon: HelpCircle,
            color: 'bg-blue-500',
            message: 'Habari! Nina maswali ya jumla kuhusu Simamia App.'
        },
        {
            id: 'technical',
            title: 'Usaidizi wa Kiufundi',
            subtitle: 'Technical Support',
            icon: Settings,
            color: 'bg-emerald-500',
            message: 'Habari! Nahitaji usaidizi wa kiufundi kuhusu Simamia App.'
        },
        {
            id: 'how-to-use',
            title: 'Jinsi ya Kutumia',
            subtitle: 'How to Use',
            icon: Store,
            color: 'bg-sky-500',
            message: 'Habari! Nataka kujifunza jinsi ya kutumia Simamia App.'
        },
        {
            id: 'complaints',
            title: 'Malalamiko',
            subtitle: 'Complaints',
            icon: AlertCircle,
            color: 'bg-amber-500',
            message: 'Habari! Nina malalamiko kuhusu huduma ya Simamia App.'
        },
        {
            id: 'sales',
            title: 'Mauzo na Madeni',
            subtitle: 'Sales & Debts',
            icon: TrendingUp,
            color: 'bg-purple-500',
            message: 'Habari! Nina maswali kuhusu kufuatilia mauzo na madeni.'
        },
        {
            id: 'profits',
            title: 'Faida na Ripoti',
            subtitle: 'Profits & Reports',
            icon: CreditCard,
            color: 'bg-rose-500',
            message: 'Habari! Nataka kujua zaidi kuhusu ripoti za faida.'
        }
    ];

    const workingHours = [
        { day: 'Jumatano', dayEn: 'Saturday', hours: '8am–6pm', isToday: false },
        { day: 'Jumapili', dayEn: 'Sunday', hours: '8am–8pm', isToday: false },
        { day: 'Jumatatu', dayEn: 'Monday', hours: '7am–8pm', isToday: false },
        { day: 'Jumanne', dayEn: 'Tuesday', hours: '7am–8pm', isToday: false },
        { day: 'Jumatano', dayEn: 'Wednesday', hours: '7am–8pm', isToday: false },
        { day: 'Alhamisi', dayEn: 'Thursday', hours: '7am–8pm', isToday: false },
        { day: 'Ijumaa', dayEn: 'Friday', hours: '7am–8pm', isToday: true }
    ];

    const socialLinks = [
        {
            name: 'Facebook',
            icon: FaFacebook,
            url: 'https://www.facebook.com/simamiaapp',
            color: 'bg-blue-600 hover:bg-blue-700',
        },
        {
            name: 'Instagram',
            icon: FaInstagram,
            url: 'https://instagram.com/simamia_app',
            color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 hover:opacity-90',
        },
        {
            name: 'TikTok',
            icon: FaTiktok,
            url: 'https://www.tiktok.com/@simamia_app',
            color: 'bg-black hover:bg-gray-900',
        },
        {
            name: 'YouTube',
            icon: FaYoutube,
            url: 'https://www.youtube.com/@SimamiaApp',
            color: 'bg-red-600 hover:bg-red-700',
        },
        {
            name: 'Threads',
            icon: SiThreads,
            url: 'https://www.threads.com/@simamia_app',
            color: 'bg-black hover:bg-gray-900',
        },
        {
            name: 'LinkedIn',
            icon: FaLinkedin,
            url: 'https://www.linkedin.com/in/simamia-app-a23b88419',
            color: 'bg-sky-700 hover:bg-sky-800',
        },
        {
            name: 'WhatsApp',
            icon: FaWhatsapp,
            url: `https://wa.me/${whatsappNumber}`,
            color: 'bg-emerald-500 hover:bg-emerald-600',
        },
    ];

    const handleTopicSelect = (topic: Topic) => {
        const encodedMessage = encodeURIComponent(topic.message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    const isWithinWorkingHours = () => {
        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 6 = Saturday
        const hour = now.getHours();
        const minute = now.getMinutes();
        const currentTime = hour + minute / 60;

        const hoursMap: Record<number, { start: number; end: number}> = {
            6: { start: 8, end: 18 }, // Saturday
            0: { start: 8, end: 20 }, // Sunday
            1: { start: 7, end: 20 }, // Monday
            2: { start: 7, end: 20 }, // Tuesday
            3: { start: 7, end: 20 }, // Wednesday
            4: { start: 7, end: 20 }, // Thursday
            5: { start: 7, end: 20 }  // Friday
        };

        const schedule = hoursMap[day];
        return currentTime >= schedule.start && currentTime < schedule.end;
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-sky-50">
            {/* Structural Backdrop Blurs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-0 right-0 w-125 h-125 bg-linear-to-br from-sky-200/20 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-100 h-100 bg-linear-to-tr from-blue-100/20 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 relative z-10">

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Topic Selection */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/40">
                            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <HelpCircle className="w-5 h-5 text-sky-600" />
                                Chagua Mada Unayohitaji
                            </h2>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {topics.map((topic, index) => {
                                    const Icon = topic.icon;
                                    return (
                                        <motion.button
                                            key={topic.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            onClick={() => handleTopicSelect(topic)}
                                            className="group relative p-5 bg-slate-50 hover:bg-white border-2 border-slate-200 hover:border-sky-400 rounded-2xl transition-all duration-300 text-left hover:shadow-lg hover:shadow-sky-500/10 hover:-translate-y-1"
                                        >
                                            <div className={`w-12 h-12 ${topic.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-sky-700 transition-colors">
                                                {topic.title}
                                            </h3>
                                            <p className="text-xs text-slate-500 mb-3">{topic.subtitle}</p>
                                            <div className="flex items-center gap-1 text-xs font-semibold text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span>Tuma ujumbe</span>
                                                <ChevronRight className="w-3 h-3" />
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                                <Phone className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-emerald-900">Au Tupigie Moja kwa Moja</p>
                                    <p className="text-sm font-bold text-emerald-700 mt-0.5">+255 798 700 900</p>
                                    <p className="text-xs text-emerald-600 mt-1">
                                        {isWithinWorkingHours() ? '✓ Tunapatikana sasa' : '○ Nje ya saa za kazi'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Map Section */}
                        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl shadow-slate-200/40">
                            <div className="p-6 border-b border-slate-100">
                                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-rose-500" />
                                    Ramani Yetu
                                </h2>
                                <p className="text-sm text-slate-600 mt-1">47VM+7X6, 27a Kurasini Rd, Dar es Salaam</p>
                            </div>
                            <div className="relative h-80 bg-slate-100 rounded-2xl overflow-hidden shadow-md border border-slate-200">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.4116260840554!2d39.28214317589998!3d-6.849004067000858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4b1b369c0001%3A0x6b1db9f09dfd7003!2s27a%20Kurasini%20Rd%2C%20Dar%20es%20Salaam!5e0!3m2!1ssw!2stz!4v1719385000000!5m2!1ssw!2stz"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0"
                                    title="Simamia App Location"
                                />
                                <div className="absolute bottom-4 left-4 bg-white px-4 py-3 rounded-xl shadow-lg border border-slate-200 z-10">
                                    <p className="text-sm font-bold text-slate-900">Simamia App HQ</p>
                                    <p className="text-xs text-slate-600">27a Kurasini Rd, Dar es Salaam</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Working Hours & Social */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* Working Hours Card */}
                        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-sky-500/20 text-sky-400 rounded-xl flex items-center justify-center">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold">Saa za Kazi</h3>
                                    <p className="text-xs text-slate-400">Working Hours</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {workingHours.map((schedule, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center justify-between p-3 rounded-xl transition-colors ${schedule.isToday ? 'bg-sky-500/20 border border-sky-500/30' : 'bg-slate-800/50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${schedule.isToday ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                                            <div>
                                                <p className={`text-sm font-bold ${schedule.isToday ? 'text-white' : 'text-slate-300'}`}>
                                                    {schedule.day}
                                                </p>
                                                <p className="text-[10px] text-slate-500">{schedule.dayEn}</p>
                                            </div>
                                        </div>
                                        <span className={`text-xs font-bold ${schedule.isToday ? 'text-sky-300' : 'text-slate-400'}`}>
                                            {schedule.hours}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-800">
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                    <span>Tunapatikana karibu saa 70 kwa wiki</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Card */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/40">
                            <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Users className="w-5 h-5 text-sky-600" />
                                Tufuate Mitandaoni
                            </h3>

                            <div className="space-y-3">
                                {socialLinks.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-white border-2 border-slate-200 hover:border-slate-300 rounded-xl transition-all group"
                                        >
                                            <div className={`w-10 h-10 ${social.color} rounded-lg flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-slate-900">{social.name}</p>
                                                <p className="text-xs text-slate-500">Follow us</p>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSupport;