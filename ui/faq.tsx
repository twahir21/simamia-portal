import { useTranslation } from "@/provider/translation";

export default function FAQ() {
  const t = useTranslation();

  const faqs = [
    {
      q: t.faqs.offline.q,
      a: t.faqs.offline.a,
    },
    {
      q: t.faqs.safety.q,
      a: t.faqs.safety.a,
    },
    {
      q: t.faqs.stock.q,
      a: t.faqs.stock.a,
    },
    {
      q: t.faqs.sme.q,
      a: t.faqs.sme.a,
    },
  ];

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Maswali Yanayoulizwa Mara kwa Mara
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-white p-5 rounded-xl shadow group"
            >
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                {faq.q}
                <span className="group-open:rotate-180 transition">⌄</span>
              </summary>

              <p className="mt-3 text-gray-600 text-sm">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
