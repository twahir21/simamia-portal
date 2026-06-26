import { Metadata } from 'next';
import FAQs from '@/ui/pages/Faqs';

export const metadata: Metadata = {
    title: "Maswali Yanayoulizwa Sana & Msaada",
    description: "Jifunze jinsi ya kuzuia wizi wa bidhaa dukani, kurekodi mauzo bila mtandao, na kutumia daftari la madeni kidijitali kupitia Simamia App.",
    keywords: [
        "Jinsi ya kuzuia wizi wa bidhaa dukani",
        "Kurekodi mauzo bila mtandao",
        "Mfumo salama wa duka",
        "App ya biashara ya Kiswahili",
        "POS software katika Kiswahili"
    ],
};

export default function FaqScreen () {
    return <FAQs />
}