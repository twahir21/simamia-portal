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
  title: "Simamia Portal",
  description: "Management web portal for Simamia App",
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
