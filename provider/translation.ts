import { en } from "@/language/en";
import { useLanguage } from "./language-provider";
import { sw } from "@/language/sw";


export const useTranslation = () => {
    const { lang } = useLanguage();

    const t = lang === "en" ? en : sw;

    return t;
};