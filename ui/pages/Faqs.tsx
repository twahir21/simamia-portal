"use client";

import { useState, useMemo } from 'react';
import {
    Search,
    HelpCircle,
    MessageCircle,
    Sparkles,
    Shield,
    CreditCard,
    Cpu,
    Zap,
    Smartphone,
    FileText,
    Languages,
    Store,
    Plus,
    Minus,
    Lock,
    UserCheck,
    Percent
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '@/ui/pageHero';

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 'all', label: 'Zote', labelEn: 'All', icon: Sparkles },
        { id: 'general', label: 'Za Jumla', labelEn: 'General', icon: HelpCircle },
        { id: 'pricing', label: 'Bei', labelEn: 'Pricing', icon: CreditCard },
        { id: 'technical', label: 'Teknolojia', labelEn: 'Technical', icon: Cpu },
        { id: 'features', label: 'Huduma', labelEn: 'Features', icon: Zap }
    ];

    const faqs = useMemo(() => [
        {
            category: 'general',
            question: 'Simamia App ni nini na inafanya nini?',
            questionEn: 'What is Simamia App and what does it do?',
            answer: 'Simamia App ni mfumo wa kisasa wa kusimamia biashara yako moja kwa moja kutoka kwenye simu yako. Inakusaidia kurekodi mauzo, kufuatilia madeni ya wateja, kuangalia faida halisi, na kupata ripoti za kina — yote bila kutumia daftari wala kufanya mahesabu mikono. Imebuniwa mahsusi kwa wafanyabiashara wa Tanzania.',
            icon: Store
        },
        {
            category: 'pricing',
            question: 'Je, kuna gharama zozote kuanza kutumia Simamia?',
            questionEn: 'Are there any costs to start using Simamia?',
            answer: 'Hapana! Unaweza kuanza kutumia Simamia bure kabisa. Ukifungua app kama mgeni (Guest Mode), utapata siku 7 za majaribio bure. Ukifanya usajili wa akaunti yako rasmi, utapewa siku 14 nzima za majaribio bure bila malipo yoyote ili uone jinsi mfumo unavyofanya kazi.',
            icon: Sparkles
        },
        {
            category: 'pricing',
            question: 'Kuna vifurushi gani vya malipo na bei zake zikoje?',
            questionEn: 'What are the pricing plans and their costs?',
            answer: 'Tuna vifurushi rahisi vyenye mabadiliko kulingana na mahitaji yako: Kila Siku (Tsh 500), Kila Wiki (Tsh 3,297 - Okoa 5%), Kila Mwezi (Tsh 13,500 - Okoa 10%), Miezi Mitatu (Tsh 38,000 - Okoa 15%), Miezi Sita (Tsh 72,000 - Okoa 20%), na Kifurushi cha Mwaka (Tsh 136,500 - Okoa 25%). Kadri unavyochagua muda mrefu, ndivyo unavyookoa zaidi!',
            icon: CreditCard
        },
        {
            category: 'pricing',
            question: 'Je, naweza kutumia app bila kusajili akaunti?',
            questionEn: 'Can I use the app without registering an account?',
            answer: 'Ndiyo, unaweza kujaribu app kama mgeni (Guest Mode) na utapata siku 7 za kutumia mfumo bure. Hata hivyo, tunashauri kusajili akaunti ili upate siku 14 za majaribio bure na kulinda data zako zisipotee pale unapobadilisha au kupoteza simu yako.',
            icon: UserCheck
        },
        {
            category: 'pricing',
            question: 'Inakuwaje pale muda wa majaribio ya bure (Free Trial) ukiisha?',
            questionEn: 'What happens when my free trial expires?',
            answer: 'Muda wako wa majaribio ukiisha, utahitajika kuchagua kifurushi kimojawapo kati ya vilivyopo (kuanzia Tsh 500 kwa siku) ili kuendelea kufurahia huduma zetu. Data zako zote zitabaki salama na utaendelea pale ulipoishia mara baada ya kulipia.',
            icon: Lock
        },
        {
            category: 'pricing',
            question: 'Je, kuna ofa yoyote nikilipia miezi kadhaa mbele?',
            questionEn: 'Is there any discount if I pay for multiple months upfront?',
            answer: 'Ndiyo, tuna punguzo kubwa sana! Kifurushi cha mwezi kina punguzo la 10%, miezi 3 (15%), miezi 6 (20%), na ukilipia kifurushi cha mwaka mzima unaokoa hadi 25% ya gharama halisi. Kifurushi chetu kinachopendwa zaidi ni cha Kila Mwezi cha Tsh 13,500 pekee.',
            icon: Percent
        },
        {
            category: 'general',
            question: 'Je, Simamia App ni bure kutumia?',
            questionEn: 'Is Simamia App free to use?',
            answer: 'Ndiyo, Simamia App inatoa toleo la bure lenye vipengele muhimu vya kuanza biashara yako. Pia tunatoa mipango ya malipo ya bei nafuu kwa biashara zinazohitaji vipengele vya ziada kama vile maduka mengi, ripoti za kina, na usaidizi wa kipaumbele. Angalia ukurasa wa bei kwa maelezo zaidi.',
            icon: CreditCard
        },
        {
            category: 'technical',
            question: 'Je, Simamia inafanya kazi bila mtandao (offline)?',
            questionEn: 'Does Simamia work offline without internet?',
            answer: 'Ndiyo! Hii ndiyo nguvu kuu ya Simamia. Unaweza kurekodi mauzo, kuongeza bidhaa, na kufuatilia madeni hata hakuna mtandao. Data yako itahifadhiwa kwenye simu yako na kulinganishwa (sync) kiotomatiki mara tu utakaporudi kwenye mtandao. Hivyo biashara yako haisimami kamwe.',
            icon: Cpu
        },
        {
            category: 'technical',
            question: 'Je, data na taarifa za biashara yangu ziko salama?',
            questionEn: 'Is my business data secure?',
            answer: 'Kabisa. Tunatumia teknolojia ya hali ya juu ya usimbaji fiche (encryption) kulinda taarifa zako. Data yako inahifadhiwa kwenye seva salama zilizoidhinishwa, na hatushiriki taarifa zako na mtu yeyote mwingine. Pia unaweza kuweka PIN au nenosiri la kipekee kwenye akaunti yako kwa usalama wa ziada.',
            icon: Shield
        },
        {
            category: 'general',
            question: 'Ninawezaje kupakua na kuanza kutumia Simamia?',
            questionEn: 'How do I download and start using Simamia?',
            answer: 'Ni rahisi sana! Pakua Simamia App kutoka Google Play Store (kwa simu za Android) au App Store (kwa iPhone). Fungua app, jaza taarifa zako za msingi, na uanze kurekodi mauzo yako ya kwanba ndani ya dakika chache. Hakuna mchakato mgumu wa usajili.',
            icon: Smartphone
        },
        {
            category: 'features',
            question: 'Je, naweza kutumia Simamia kwa maduka zaidi ya moja?',
            questionEn: 'Can I use Simamia for multiple shops or branches?',
            answer: 'Ndiyo, Simamia inasaidia biashara zenye matawi mengi. Unaweza kusimamia maduka yako yote kutoka akaunti moja, kuona mauzo ya kila tawi, na kupata ripoti za pamoja. Hii inafaa sana kwa wafanyabiashara wa jumla na rejareja wenye maeneo tofauti.',
            icon: Store
        },
        {
            category: 'features',
            question: 'Je, Simamia inasaidia lugha gani?',
            questionEn: 'What languages does Simamia support?',
            answer: 'Simamia imeundwa kwa kuzingatia wafanyabiashara wa Tanzania, hivyo inasaidia Kiswahili na Kiingereza kikamilifu. Unaweza kubadilisha lugha yoyote wakati wowote kutoka kwenye mipangilio ya app. Menyu, ripoti, na maelezo yote yanapatikana kwa lugha unayoipendelea.',
            icon: Languages
        },
        {
            category: 'features',
            question: 'Ninawezaje kuhamia kutoka kwenye daftari la kawaida?',
            questionEn: 'How do I migrate from my paper ledger book?',
            answer: 'Tuna mchakato rahisi wa uhamisho. Unaweza kuingiza wateja wako, bidhaa, na hata madeni ya zamani moja kwa moja kwenye Simamia. Timu yetu ya usaidizi inaweza kukusaidia hatua kwa hatua kupitia WhatsApp au simu bila malipo yoyote ya ziada.',
            icon: FileText
        },
        {
            category: 'features',
            question: 'Je, naweza kufuatilia madeni ya wateja kwa urahisi?',
            questionEn: 'Can I easily track customer debts?',
            answer: 'Ndiyo, hii ni moja ya vipengele muhimu zaidi vya Simamia. Unaweza kurekodi deni la kila mteja, kuongeza malipo yanayofanyika, kupata vikumbusho kiotomatiki, na hata kutuma SMS za ukumbusho wa madeni moja kwa moja kwa wateja wako. Kamwe hautapoteza pesa yako tena.',
            icon: CreditCard
        },
        {
            category: 'technical',
            question: 'Simamia inafanya kazi kwenye simu za aina gani?',
            questionEn: 'Which phones does Simamia work on?',
            answer: 'Simamia inafanya kazi vizuri kwenye simu nyingi za kisasa. Kwa Android, tunahitaji toleo la Android 6.0 (Marshmallow) na kuendelea. Kwa iPhone, tunahitaji iOS 12 na kuendelea. App yetu imeboreshwa kufanya kazi vizuri hata kwenye simu zenye kumbukumbu ndogo.',
            icon: Smartphone
        },
        {
            category: 'features',
            question: 'Je, naweza kupata ripoti za mauzo na faida?',
            questionEn: 'Can I get sales and profit reports?',
            answer: 'Bila shaka! Simamia inakupa ripoti za kina za kila siku, wiki, na mwezi. Unaweza kuona bidhaa zinazouza zaidi, faida halisi, wateja wanaonunua sana, na mengi zaidi. Ripoti hizi zinakusaidia kufanya maamuzi bora ya biashara yako na kukuza mapato yako.',
            icon: FileText
        },
        {
            category: 'general',
            question: 'Je, msaada wa wateja unapatikana vipi?',
            questionEn: 'How can I get customer support?',
            answer: 'Timu yetu ya usaidizi iko tayari kukusaidia! Unaweza kutupigia simu, kututumia ujumbe wa WhatsApp, au kutembelea ofisi yetu Dar es Salaam. Pia tunajibu maswali kupitia mitandao yetu ya kijamii kama Facebook, Instagram, na X (Twitter). Saa zetu za kazi zimeandikwa kwenye ukurasa wa Wasiliana Nasi.',
            icon: MessageCircle
        }
    ], []);


    const filteredFaqs = useMemo(() => {
        let results = faqs;

        if (activeCategory !== 'all') {
            results = results.filter(faq => faq.category === activeCategory);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            results = results.filter(faq =>
                faq.question.toLowerCase().includes(query) ||
                faq.questionEn.toLowerCase().includes(query) ||
                faq.answer.toLowerCase().includes(query)
            );
        }

        return results;
    }, [activeCategory, searchQuery, faqs]);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-sky-50">

            {/* Hero Section */}
            <PageHero
                tag="Maswali Yanayoulizwa Sana"
                title="Majibu ya Maswali Yako"
                description={
                    <>
                        Pata majibu ya maswali yanayoulizwa mara kwa mara kuhusu Simamia App.
                        Hujaona jibu lako? Wasiliana nasi moja kwa moja.
                    </>
                }
            />
            {/* Structural Backdrop Blurs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-0 right-0 w-125 h-125 bg-linear-to-br from-sky-200/20 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-100 h-100 bg-linear-to-tr from-blue-100/20 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 relative z-10">

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Tafuta swali... (Search for a question...)"
                            className="w-full pl-14 pr-5 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all text-sm text-slate-800 placeholder:text-slate-400 font-medium shadow-sm"
                        />
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${isActive
                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900'
                                    }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {cat.label}
                                <span className={`text-[10px] ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>
                                    {cat.labelEn}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-3">
                    {filteredFaqs.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
                            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <p className="text-sm font-bold text-slate-700">Hakuna matokeo yaliyopatikana</p>
                            <p className="text-xs text-slate-500 mt-1">No results found. Try a different search.</p>
                        </div>
                    ) : (
                        filteredFaqs.map((faq, index) => {
                            const Icon = faq.icon;
                            const isOpen = openIndex === index;

                            return (
                                <motion.div
                                    key={`${activeCategory}-${index}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`bg-white rounded-2xl border-2 transition-all overflow-hidden ${isOpen
                                        ? 'border-sky-500 shadow-lg shadow-sky-500/10'
                                        : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full p-5 sm:p-6 flex items-start gap-4 text-left group"
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isOpen
                                            ? 'bg-sky-500 text-white'
                                            : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                                            }`}>
                                            <Icon className="w-5 h-5" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className={`text-sm sm:text-base font-bold transition-colors ${isOpen ? 'text-sky-700' : 'text-slate-900'
                                                }`}>
                                                {faq.question}
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-0.5">{faq.questionEn}</p>
                                        </div>

                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${isOpen
                                            ? 'bg-sky-500 text-white rotate-0'
                                            : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                        </div>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-5 sm:px-6 pb-6 pt-0">
                                                    <div className="pl-14 border-t border-slate-100 pt-4">
                                                        <p className="text-sm text-slate-700 leading-relaxed">
                                                            {faq.answer}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })
                    )}
                </div>



            </div>
        </div>
    );
};

export default FAQs;