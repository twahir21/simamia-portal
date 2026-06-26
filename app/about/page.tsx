import AboutPage from "@/ui/pages/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kuhusu Sisi — Mfumo wa Mauzo, Stoki na Hesabu za Duka",

  description:
    "Simamia ni programu ya mauzo ya kila siku na POS ya mkononi inayobadilisha uendeshaji wa biashara. Mfumo huu wa mauzo ya duka unakuwezesha kusimamia stoki ya duka, kujua hesabu ya bidhaa dukani, na hutoa ripoti ya stoki ya biashara ili kusaidia jinsi ya kuzuia wizi wa bidhaa dukani. Kama daftari la stoki kidijitali na daftari la madeni kidijitali, programu hii inarahisisha kurekodi matumizi ya biashara, kuweka kumbukumbu za biashara, na kujua faida na hasara ya biashara yako. Ni app ya kurekodi madeni na app ya hesabu za duka inayofanya kazi kama Point of Sale ya simu. Furahia kurekodi mauzo bila mtandao ukitumia app ya biashara ya offline na mfumo salama wa duka. Huu ni mfumo wa kutoa risiti na app ya mauzo na matumizi unaopatikana kama app ya biashara ya Kiswahili, huku ukiwa na fursa ya kuanza kama app ya biashara ya bure.",

  keywords: [
    // Kundi la 2: POS na Mauzo
    "POS Tanzania",
    "Mfumo wa mauzo ya duka",
    "App ya mauzo na matumizi",
    "Point of Sale ya simu",
    "POS ya mkononi",
    "Programu ya mauzo ya kila siku",
    "Mfumo wa kutoa risiti",
    "POS software katika Kiswahili",

    // Kundi la 3: Stoki na Inventory
    "Kusimamia stoki ya duka",
    "App ya kudhibiti inventory",
    "Kujua hesabu ya bidhaa dukani",
    "Jinsi ya kuzuia wizi wa bidhaa dukani",
    "Ripoti ya stoki ya biashara",
    "Daftari la stoki kidijitali",

    // Kundi la 4: Madeni na Hesabu
    "Daftari la madeni kidijitali",
    "App ya kurekodi madeni",
    "Kujua faida na hasara ya biashara",
    "Kuweka kumbukumbu za biashara",
    "Kurekodi matumizi ya biashara",
    "App ya hesabu za duka",

    // Kundi la 5: Sifa Maalum
    "App ya biashara ya offline",
    "Kurekodi mauzo bila mtandao",
    "App ya biashara ya Kiswahili",
    "Mfumo salama wa duka",
    "App ya biashara ya bure"
  ],

  openGraph: {
    title: "Kuhusu Simamia App — Mapinduzi ya Uendeshaji Biashara Tanzania",
    description:
      "Gundua jinsi Simamia inavyosaidia wafanyabiashara kupitia POS software katika Kiswahili na app ya kudhibiti inventory. Kuanzia kusimamia stoki ya duka hadi daftari la madeni kidijitali na mfumo wa kutoa risiti, tunarahisisha kurekodi mauzo bila mtandao kwenye mfumo salama wa duka wetu.",
  },
  alternates: {
    canonical: "/about",
  }
};

export default function aboutScreen () {
  return <AboutPage />
}