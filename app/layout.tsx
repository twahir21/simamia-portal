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
    default: "Simamia App",
    template: "%s | Simamia",
  },
  description:
    "Simamia is a business management app that helps you track sales, expenses, debts, and stock easily. Works offline, fast, and secure—built for small businesses.",

  keywords: [
    "Simamia",
    "business management app",
    "offline POS app",
    "sales tracking app",
    "expenses tracker",
    "debt management app",
    "inventory management Africa",
    "SME tools Tanzania",
    "offline business app",
  ],

  authors: [{ name: "Simamia Team" }],
  creator: "Simamia",
  publisher: "Simamia",

  metadataBase: new URL("https://simamia.co.tz"),

  openGraph: {
    title: "Simamia App — Manage Your Business Smarter",
    description:
      "Track sales, expenses, debts, and stock in one app. Works offline and designed for real businesses in Africa.",
    url: "https://simamia.co.tz",
    siteName: "Simamia",
    images: [
      {
        url: "/og-simamia.png", 
        width: 1200,
        height: 630,
        alt: "Simamia Business Management App",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Simamia App",
    description:
      "Offline-first business management app for tracking sales, expenses, debts, and stock.",
    images: ["/og-simamia.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  category: "business",
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
