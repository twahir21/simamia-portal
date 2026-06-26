
import PricingPage from "@/ui/pages/Pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bei na Vifurushi | Simamia App",
  description: "Angalia bei nafuu za Simamia App. Chagua kifurushi kinachofaa biashara yako, kuanzia toleo la bure (App ya biashara ya bure) hadi mifumo ya duka la jumla.",
  keywords: [
    "App ya biashara ya bure",
    "Bei ya programu ya duka",
    "SME tools Tanzania",
    "Simamia App bei",
    "software ya biashara Tanzania"
  ],
  openGraph: {
    title: "Bei na Vifurushi vya Simamia App — Chagua Kifurushi Chako",
    description: "Anza kutumia app bora ya biashara Tanzania kwa bei nafuu kabisa au anza na toleo la bure.",
  }
};

export default function PricingScreen () {
  return <PricingPage />
}