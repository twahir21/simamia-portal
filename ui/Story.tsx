import Image from "next/image";
import { motion } from "framer-motion";

export default function HadithiYetu() {
    return (
        <section className="bg-linear-to-b from-slate-50 to-slate-100 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-6xl mx-auto">

                {/* Container ya Grid: Kwenye simu ni column 1, kwenye desktop (md) inakuwa columns 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* UPANDE WA KUSHOTO: Maandishi (Text Content) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col justify-center space-y-5"
                    >
                        <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                            Simamia App ilizaliwa baada ya kuona changamoto halisi wanazokutana nazo wafanyabiashara wadogo na wa kati katika kusimamia mauzo, hesabu za bidhaa, na mtiririko wa pesa kila siku. Tulitaka kuondoa madaftari na mifumo migumu ya kizamani.
                        </p>

                        {/* Aya Mpya Kuhusu Mwanzilishi */}
                        <p className="text-slate-600 text-base md:text-lg leading-relaxed border border-l-4 border-sky-500 px-4 bg-sky-50/50 py-2 rounded-r-xl">
                            Muanzilishi wetu, ambaye ni Mtengenezaji wa Mifumo (Programmer), aliingia mtaani na kufanya biashara mwenyewe kwa zaidi ya miezi saba. Kupitia uzoefu huo wa ndani, alizikabili changamoto halisi za kila siku, kuanzia upotevu wa bidhaa hadi hesabu zisizoeleweka. Uzoefu huo ndio uliomwezesha kutengeneza mfumo halisi na madhubuti unaojibu shida halisi za mfanyabiashara, na si nadharia tu.
                        </p>

                        <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                            Leo, Simamia App imekuwa zaidi ya mfumo wa usimamizi; ni mshirika wa ukuaji kwa mamia ya biashara. Tunaendelea kubuni mbinu mpya za kiteknolojia ili kurahisisha uendeshaji wa biashara kote nchini, kumpa mmiliki udhibiti kamili, na kukuza uchumi wa kidijitali.
                        </p>
                    </motion.div>

                    {/* UPANDE WA KULIA: Picha (Image Container) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        className="relative w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-200"
                    >
                        {/* 
                            Next.js Image component inayotumia /about.png
                            Tunatumia 'fill' prop kwa sababu parent container ina defined height.
                            'sizes' inasaidia browser kupakia image size sahihi kulingana na screen width.
                        */}
                        <Image
                            src="/about.png"
                            alt="Mjasiriamali akitumia Simamia App"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-center transform hover:scale-105 transition-transform duration-500"
                            priority={false}
                        />

                        {/* linear Overlay madhubuti ili kuendana na rangi za Sky/Slate */}
                        <div className="absolute inset-0 bg-linear-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />
                    </motion.div>

                </div>

            </div>
        </section>
    );
}