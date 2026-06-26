import { Metadata } from "next";
import DownloadPage from "@/ui/pages/Download";

export const metadata: Metadata = {
  title: "Download Simamia App | POS ya Mkononi",
  description: "Pakua Simamia App kwenye simu yako. Pata Point of Sale ya simu na programu ya mauzo ya kila siku inayofanya kazi bila bando (offline).",
  keywords: [
    "Download Simamia App",
    "App ya biashara Tanzania",
    "Programu ya kusimamia biashara",
    "Point of Sale ya simu",
    "POS ya mkononi",
    "App ya mauzo na matumizi",
    "App ya biashara ya offline",
    "Mfumo wa kusimamia duka",
    "Software ya biashara Tanzania",
    "App bora ya biashara",
    "Programu ya duka la rejareja",
    "Mfumo wa duka la jumla"
  ],
  openGraph: {
    title: "Download Simamia App — Pata POS ya Mkononi Leo",
    description: "Rahisisha mauzo yako. Pakua programu ya kusimamia biashara kwenye simu yako sasa.",
  }
};

export default function DownloadScreen () {
  return <DownloadPage />
}