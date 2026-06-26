import type { Metadata } from "next";
import { Sniglet } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { TopBar } from "@/ui/topBar";
import { Footer } from "@/ui/footer";
import { faqSchema } from "@/const/faq.const";
import { LanguageProvider } from "@/provider/language-provider";
import Script from "next/script";
import CustomPageTracker from "@/logs/page-analytics";
import WhatsAppButton from "@/ui/whatsapp";

// 2. Configure the font
const sniglet = Sniglet({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Simamia App — Rahisisha Uendeshaji wa Biashara Yako",
    template: "%s | App Bora ya Biashara na POS Tanzania",
  },
  description: "Simamia App ni programu ya kusimamia biashara na mfumo wa mauzo ya duka unaokusaidia kusimamia stoki ya duka, kurekodi matumizi, na kufuatilia daftari la madeni kidijitali kwa urahisi. Chukua udhibiti wa biashara yako leo: kurekodi mauzo bila mtandao (offline) na kujua faida na hasara ya biashara yako moja kwa moja kutoka kwenye simu au POS ya mkononi, bila daftari wala mahesabu magumu. Simamia App — Biashara yako, teknolojia yetu.",

  keywords: [
    "Simamia",
    "Simamia App",
    "programu ya biashara",
    "App ya biashara",
    "Business management app",
    "kurekodi mauzo offline",
    "App ya mauzo na matumizi",
    "daftari la madeni kidijitali",
    "kusimamia stoki",
    "simamia duka",
    "POS ya simu Tanzania",
    "kuhifadhi kumbukumbu za biashara",
    "kujua faida na hasara",
    "SME tools Tanzania",
  ],

  authors: [{ name: "Simamia Team" }],
  creator: "Simamia",
  publisher: "Simamia",

  metadataBase: new URL("https://simamia.co.tz"),

  openGraph: {
    title: "Simamia App — Simamia Mauzo, Stoki na Madeni kwa Urahisi",
    description:
      "Programu ya kijanja ya kusimamia duka au biashara yako. Inafanya kazi bila bando (offline). Anza kufuatilia faida yako leo!",
    url: "https://simamia.co.tz",
    siteName: "Simamia",
    images: [
      {
        url: "/og-simamia.webp",
        width: 1200,
        height: 630,
        alt: "Simamia — App ya Kusimamia Biashara, Mauzo na Stoki",
      },
    ],
    locale: "sw_TZ", // Updated to represent Tanzanian Swahili locale
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Simamia App — App ya Kurekodi Mauzo na Stoki",
    description:
      "Rahisisha hesabu za duka lako. Rekodi mauzo, dhibiti madeni, na angalia stoki hata ukiwa offline.",
    images: ["/og-simamia.webp"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },

  category: "business",

  other: {
    "geo.region": "TZ",
    "geo.placename": "Tanzania",
  },

  alternates: {
    canonical: "https://simamia.co.tz",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sw">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.6.0/css/all.min.css"
        />

        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FYVBE3SFG9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date());

              gtag('config', 'G-FYVBE3SFG9');
          `}
        </Script>

        {/* SEO JSON-LD SCRIPT */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://simamia.co.tz/#application",
                  name: "Simamia App",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Windows, macOS, Linux, Android, iOS",
                  description:
                    "Programu nyepesi ya Kiswahili ya kusimamia biashara, mauzo, stoki na madeni bila bando (offline) kwa wafanyabiashara wa Tanzania.",
                  url: "https://simamia.co.tz",
                  image: "https://simamia.co.tz/og-simamia.webp",
                  featureList:
                    "Offline mode, Mauzo na Matumizi, Udhibiti wa Stoki, Usimamizi wa Madeni, Ripoti za Faida",
                  publisher: {
                    "@type": "Organization",
                    "@id": "https://simamia.co.tz/#organization",
                    name: "Simamia App",
                    url: "https://simamia.co.tz",
                    logo: "https://simamia.co.tz/og-simamia.webp",
                    telephone: "+255798700900",
                    address: {
                      "@type": "PostalAddress",
                      "streetAddress": "27a Kurasini Rd", // <<-- WEKA MTAA/ENEO ULILOJAZA KWENYE GOOGLE BUSINESS PROFILE
                      "addressLocality": "Dar es Salaam",
                      "addressRegion": "Dar es Salaam",
                      "addressCountry": "TZ"
                    }
                  },
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "TZS",
                  },
                  areaServed: {
                    "@type": "Country",
                    name: "Tanzania",
                  },
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://simamia.co.tz/#faq",
                  mainEntity: faqSchema.mainEntity, // Hapa inavuta yale maswali yetu mapya moja kwa moja
                },
              ],
            }),
          }}
        />
      </head>

      <LanguageProvider>
        <body className={`${sniglet.className} antialiased`}>
          <TopBar />
          {children}
          <Footer />
          <Toaster position="top-right" richColors />
          {/* Render the tracking component globally */}
          <CustomPageTracker />

          <WhatsAppButton />

        </body>
      </LanguageProvider>
    </html>
  );
}
