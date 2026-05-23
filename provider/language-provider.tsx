"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Lang = "en" | "sw";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lang, setLangState] = useState<Lang>("sw");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;

    if (saved && saved !== "sw") {
      // Wrapping this in a 0ms setTimeout breaks the synchronous execution chain.
      // This tells React: "Finish mounting the layout first, then safely set this state."
      setTimeout(() => {
        setLangState(saved);
      }, 0);
    }
  }, []);

  const setLang = (newLang: Lang) => {
    localStorage.setItem("lang", newLang);
    setLangState(newLang);
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "sw" : "en");
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
};
