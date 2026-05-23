import { en } from "@/app/language/en";
import { useLanguage } from "./language-provider";
import { sw } from "@/app/language/sw";


export const useTranslation = () => {
    const { lang } = useLanguage();

    const t = lang === "en" ? en : sw;

    return t;
};