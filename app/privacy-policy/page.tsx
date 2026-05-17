import Head from "next/head";
import {
  Shield,
  Eye,
  Database,
  Smartphone,
  UserCheck,
  FileText,
  HelpCircle,
} from "lucide-react";
import { PHONE_LINK, PHONE_SUPPORT } from "@/const/links.const";

export default function PrivacyPolicy() {
  const lastUpdated = "17 Mei 2026";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-sky-100">
      <Head>
        <title>Sera ya Faragha | Simamia App</title>
        <meta
          name="description"
          content="Sera ya Faragha ya Simamia App - Fahamu jinsi tunavyolinda na kusimamia data za biashara yako."
        />
      </Head>

      {/* Compact Header */}
      <header className="border-b border-sky-100 bg-linear-to-b from-sky-100 via-sky-50 to-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-10 text-center">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-white border border-sky-100 shadow-sm mb-4">
            <Shield size={28} className="text-sky-600" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            Sera ya <span className="text-sky-600">Faragha</span>
          </h1>

          <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-600">
            Simamia App imejitolea kulinda taarifa zako za biashara, mauzo,
            bidhaa, pamoja na taarifa za wateja wako kwa usalama wa hali ya juu.
          </p>

          <div className="mt-4 inline-flex items-center rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-medium text-sky-700 shadow-sm">
            Imeboreshwa Mwisho: {lastUpdated}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-3 sm:px-5 md:px-8 py-6 sm:py-8 md:py-10">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-sky-100 shadow-sm">
            {/* Section 1 */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-sky-700">
                <UserCheck size={18} className="shrink-0" />
                <h2 className="text-lg font-semibold text-slate-900">
                  1. Taarifa Tunazokusanya
                </h2>
              </div>

              <p className="text-sm text-slate-600">
                Ili kukupatia huduma bora kupitia Simamia App, tunakusanya
                taarifa zifuatazo kulingana na matumizi yako:
              </p>

              <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
                <li>
                  <strong>Taarifa za Akaunti:</strong> Barua pepe (email), namba
                  ya simu, na jina la biashara yako wakati wa usajili au
                  uthibitisho wa OTP.
                </li>
                <li>
                  <strong>Guest Mode:</strong> Ukitumia app kama mgeni bila
                  akaunti, taarifa zako huhifadhiwa ndani ya kifaa chako pekee.
                </li>
                <li>
                  <strong>Data za Biashara:</strong> Bidhaa, stock, mauzo,
                  matumizi (expenses), faida, madeni, na oda.
                </li>
                <li>
                  <strong>Taarifa za Wateja:</strong> Namba za simu au taarifa
                  unazoingiza kwa ajili ya oda, WhatsApp, au SMS.
                </li>
              </ul>
            </section>

            <hr className="border-sky-100" />

            {/* Section 2 */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-sky-700">
                <Eye size={18} className="shrink-0" />
                <h2 className="text-lg font-semibold text-slate-900">
                  2. Jinsi Tunavyotumia Taarifa Zako
                </h2>
              </div>

              <p className="text-sm text-slate-600">
                Taarifa zako hutumika kwa madhumuni yafuatayo pekee:
              </p>

              <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
                <li>
                  Kufuatilia mwenendo wa biashara yako kupitia ripoti, historia
                  ya mauzo, na faida.
                </li>
                <li>
                  Kusindika oda, kubadili hali ya malipo, na kurahisisha
                  mawasiliano na wateja.
                </li>
                <li>Kuhakiki malipo ya vifurushi kupitia Transaction ID.</li>
                <li>
                  Kuboresha utendaji wa app na kuhifadhi mipangilio yako ya
                  mwisho.
                </li>
              </ul>
            </section>

            <hr className="border-sky-100" />

            {/* Section 3 */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-sky-700">
                <Database size={18} className="shrink-0" />
                <h2 className="text-lg font-semibold text-slate-900">
                  3. Uhifadhi na Ulinzi wa Data
                </h2>
              </div>

              <p className="text-sm text-slate-600">
                Tunachukua hatua mbalimbali kuhakikisha data zako zinalindwa kwa
                usalama mkubwa.
              </p>

              <div className="rounded-xl border border-sky-100 bg-sky-50/60 p-4 space-y-2 text-sm text-slate-700">
                <p>
                  <strong>Udhibiti wa Data:</strong> Unaweza kufanya Export DB
                  au Import DB kupitia sehemu ya Settings ili kulinda taarifa
                  zako.
                </p>
                <p>
                  <strong>Kufuta Data:</strong> Ukichagua “Futa Data Zote”,
                  taarifa zako zote zitafutwa kabisa na hatua hiyo haiwezi
                  kurejeshwa.
                </p>
              </div>
            </section>

            <hr className="border-sky-100" />

            {/* Section 4 */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-sky-700">
                <Smartphone size={18} className="shrink-0" />
                <h2 className="text-lg font-semibold text-slate-900">
                  4. Ruhusa za Kifaa
                </h2>
              </div>

              <p className="text-sm text-slate-600">
                Simamia App inaweza kuomba ruhusa zifuatazo ili vipengele vya
                mfumo vifanye kazi vizuri:
              </p>

              <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
                <li>
                  <strong>Kamera/Scanner:</strong> Kukagua barcode za bidhaa.
                </li>
                <li>
                  <strong>Storage:</strong> Kupakua PDF, CSV, na kufanya bulk
                  import ya bidhaa.
                </li>
                <li>
                  <strong>Simu & Mawasiliano:</strong> Kupiga simu au kutuma
                  WhatsApp/SMS moja kwa moja kwa wateja.
                </li>
              </ul>
            </section>

            <hr className="border-sky-100" />

            {/* Section 5 */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-sky-700">
                <FileText size={18} className="shrink-0" />
                <h2 className="text-lg font-semibold text-slate-900">
                  5. Mabadiliko ya Sera Hii
                </h2>
              </div>

              <p className="text-sm text-slate-600">
                Tunaweza kuboresha sera hii mara kwa mara ili kuendana na
                mabadiliko ya sheria au maboresho ya vipengele vipya vya Simamia
                App.
              </p>
            </section>

            <hr className="border-sky-100" />

            {/* Section 6 */}
            <section className="rounded-xl border border-sky-100 bg-linear-to-r from-sky-50 to-white p-4 md:p-5 space-y-3">
              <div className="flex items-center gap-2 text-sky-700">
                <HelpCircle size={18} className="shrink-0" />
                <h2 className="text-lg font-semibold text-slate-900">
                  6. Wasiliana Nasi
                </h2>
              </div>

              <p className="text-sm text-slate-600">
                Kama una maswali, maoni, au unahitaji msaada kuhusu sera hii ya
                faragha, unaweza kuwasiliana nasi kupitia:
              </p>

              <div className="space-y-1 text-sm text-slate-700">
                <p>
                  <strong>Simu:</strong>{" "}
                  <a
                    href={PHONE_LINK}
                    className="font-medium text-sky-600 hover:underline"
                  >
                    {PHONE_SUPPORT}
                  </a>
                </p>
                <p>
                  <strong>Msaada:</strong> Angalia video za mwongozo ndani ya
                  app.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
