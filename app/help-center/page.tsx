import HelpCenter from "@/ui/pages/Help";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center | Simamia Business Management App",
  description:
    "Find guides, tutorials, FAQs, and troubleshooting tips for Simamia. Learn how to manage inventory, sales, customers, expenses, and reports more efficiently.",

  keywords: [
    "Simamia help center",
    "Simamia support",
    "inventory management guide",
    "POS tutorials",
    "stock management",
    "sales tracking",
    "business management app",
    "small business software Tanzania",
    "SME management",
  ],

  alternates: {
    canonical: "https://simamia.co.tz/help-center",
  },

  openGraph: {
    title: "Simamia Help Center",
    description:
      "Access tutorials, FAQs, and support resources to get the most out of Simamia.",
    url: "https://simamia.co.tz/help-center",
    siteName: "Simamia",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Simamia Help Center",
    description:
      "Guides, FAQs, and tutorials for managing your business with Simamia.",
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default function HelpCenterPage () {
  return <HelpCenter />
}