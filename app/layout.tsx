import type { Metadata } from "next";
import { Delius } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import { TopBar } from "@/ui/topBar";
import { Footer } from "@/ui/footer";

// 2. Configure the font
const delius = Delius({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Simamia App — Rahisisha Uendeshaji wa Biashara Yako",
    template: "%s | Simamia",
  },
  description:
    "Simamia ni programu rahisi ya kusimamia biashara. Rekodi mauzo, matumizi, madeni, na stoki (inventory) hata bila mtandao. Salama, haraka, na maalum kwa wafanyabiashara.",

  keywords: [
    "Simamia",
    "Simamia App",
    "programu ya biashara",
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

  alternates: {
    canonical: "https://simamia.co.tz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.6.0/css/all.min.css"
        />
      </head>
      <body
        className={`${delius.className} antialiased`}
      >
        <TopBar />
        {children}
        <Footer />
        <Toaster position="top-right" richColors />      
      </body>
    </html>
  );
}
