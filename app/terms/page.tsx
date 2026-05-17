import React from "react";
import Head from "next/head";
import {
  FileText,
  Scale,
  UserCheck,
  AlertTriangle,
  CreditCard,
  Smartphone,
  Ban,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import { PHONE_LINK, PHONE_SUPPORT } from "@/const/links.const";

export default function TermsAndConditions() {
  const lastUpdated = "17 Mei 2026";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-sky-100">
      <Head>
        <title>Vigezo na Masharti | Simamia App</title>

        <meta
          name="description"
          content="Vigezo na Masharti vya matumizi ya Simamia App."
        />
      </Head>

      {/* Hero */}
      <header className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.10),transparent_30%)]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Left */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 mb-4">
                <Scale size={14} />
                Vigezo vya Matumizi
              </div>

              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-950">
                Masharti ya kutumia{" "}
                <span className="text-sky-700">Simamia App</span>
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-600 max-w-xl">
                Tafadhali soma masharti haya kwa makini kabla ya kutumia mfumo
                wetu wa usimamizi wa biashara, mauzo, stock, na oda.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <div className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  Updated: {lastUpdated}
                </div>

                <div className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                  Simamia Legal
                </div>
              </div>
            </div>

            {/* Right Cards */}
            <div className="grid grid-cols-2 gap-3 w-full lg:max-w-sm">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <ShieldCheck size={18} className="text-sky-700 mb-3" />

                <p className="text-xs font-semibold text-slate-900">
                  Data Security
                </p>

                <p className="mt-1 text-xs leading-6 text-slate-500">
                  Linda taarifa zako kwa Export DB na backup mara kwa mara.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <CreditCard size={18} className="text-sky-700 mb-3" />

                <p className="text-xs font-semibold text-slate-900">Payments</p>

                <p className="mt-1 text-xs leading-6 text-slate-500">
                  Vifurushi vinafanya kazi kulingana na muda wa matumizi.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <Ban size={18} className="text-sky-700 mb-3" />

                <p className="text-xs font-semibold text-slate-900">
                  Fair Usage
                </p>

                <p className="mt-1 text-xs leading-6 text-slate-500">
                  Mfumo hautakiwi kutumika kwa spam au shughuli haramu.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <Smartphone size={18} className="text-sky-700 mb-3" />

                <p className="text-xs font-semibold text-slate-900">
                  Guest Mode
                </p>

                <p className="mt-1 text-xs leading-6 text-slate-500">
                  Guest Mode huhifadhi data ndani ya simu yako pekee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Navigation */}
          <aside className="lg:col-span-3">
            <div className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <FileText size={16} className="text-sky-700" />

                <h3 className="text-sm font-bold text-slate-900">
                  Sehemu Muhimu
                </h3>
              </div>

              <nav className="space-y-2">
                {[
                  "Usajili",
                  "Matumizi ya Mfumo",
                  "Malipo",
                  "Ukomo wa Wajibu",
                  "Kusitisha Huduma",
                  "Mawasiliano",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-sky-50 transition-colors"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-[11px] font-bold text-sky-700">
                      {index + 1}
                    </div>

                    <span className="text-sm text-slate-600">{item}</span>
                  </div>
                ))}
              </nav>

              <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 p-4">
                <p className="text-xs leading-6 text-slate-600">
                  Kwa kutumia Simamia App, unakubali kufungwa na masharti haya
                  ya matumizi.
                </p>
              </div>
            </div>
          </aside>

          {/* Main Terms */}
          <div className="lg:col-span-9 space-y-5">
            {/* Card 1 */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
                  <UserCheck size={20} />
                </div>

                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-slate-900">
                    1. Usajili na Akaunti
                  </h2>

                  <p className="text-sm leading-7 text-slate-600">
                    Unaposajili akaunti au kutumia Guest Mode, unakubali kutoa
                    taarifa sahihi kuhusu biashara yako na kulinda akaunti yako.
                  </p>

                  <ul className="list-disc pl-5 space-y-2 text-sm leading-7 text-slate-600">
                    <li>Tumia taarifa halali za biashara.</li>
                    <li>
                      Linda simu na akaunti yako dhidi ya matumizi
                      yasiyoidhinishwa.
                    </li>
                    <li>Guest Mode huhifadhi data kwenye kifaa chako pekee.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Card 2 */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
                  <Smartphone size={20} />
                </div>

                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-slate-900">
                    2. Matumizi ya Mfumo
                  </h2>

                  <p className="text-sm leading-7 text-slate-600">
                    Mfumo unatakiwa kutumika kwa shughuli halali za biashara
                    pekee.
                  </p>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <ul className="space-y-2 text-sm leading-7 text-slate-600">
                      <li>• Hakikisha taarifa za stock na mauzo ni sahihi.</li>
                      <li>• Usitumie WhatsApp/SMS kwa spam au vitisho.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Card 3 */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
                  <CreditCard size={20} />
                </div>

                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-slate-900">
                    3. Malipo na Vifurushi
                  </h2>

                  <p className="text-sm leading-7 text-slate-600">
                    Huduma za premium zinafanya kazi kulingana na vifurushi
                    ulivyonunua.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-xs font-bold text-slate-900">
                        Transaction ID
                      </p>

                      <p className="mt-2 text-xs leading-6 text-slate-500">
                        Hakikisha unaingiza namba sahihi ya muamala.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-xs font-bold text-slate-900">
                        Expire Date
                      </p>

                      <p className="mt-2 text-xs leading-6 text-slate-500">
                        Vipengele vinaweza kuzuiwa muda ukiisha.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-xs font-bold text-slate-900">
                        Refunds
                      </p>

                      <p className="mt-2 text-xs leading-6 text-slate-500">
                        Malipo yaliyofanyika hayarudishwi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Card 4 */}
            <section className="rounded-3xl border border-amber-200 bg-amber-50/50 p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
                  <AlertTriangle size={20} />
                </div>

                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-slate-900">
                    4. Ukomo wa Wajibu
                  </h2>

                  <p className="text-sm leading-7 text-slate-700">
                    Simamia App haitawajibika kwa hasara za biashara, upotevu wa
                    data, au matatizo yanayotokana na kifaa, matumizi mabaya, au
                    kutofanya backup.
                  </p>
                </div>
              </div>
            </section>

            {/* Card 5 */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
                  <Ban size={20} />
                </div>

                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-slate-900">
                    5. Kusitisha Huduma
                  </h2>

                  <p className="text-sm leading-7 text-slate-600">
                    Tunaweza kusitisha akaunti yako bila taarifa ikiwa mfumo
                    utatumika kwa udanganyifu, spam, au shughuli haramu.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="rounded-3xl bg-sky-700 p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-white/10 p-3">
                  <HelpCircle size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-bold">6. Wasiliana Nasi</h2>

                  <p className="mt-2 text-sm leading-7 text-sky-100">
                    Ikiwa una maswali kuhusu masharti haya, wasiliana nasi
                    kupitia simu au sehemu ya msaada ndani ya app.
                  </p>

                  <a
                    href={PHONE_LINK}
                    className="mt-4 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-slate-100 transition-colors"
                  >
                    {PHONE_SUPPORT}
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
