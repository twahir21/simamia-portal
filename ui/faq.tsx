export default function FAQ() {
  const faqs = [
    {
      q: "Je, naweza kutumia bila internet?",
      a: "Ndiyo. App inafanya kazi offline kabisa. Data huhifadhiwa kwenye simu yako bila internet",
    },
    {
      q: "Data zangu ziko salama?",
      a: "Ndiyo. Tunatumia encryption na token verification kuhakikisha data zako zinalindwa.",
    },
    {
      q: "Naweza kufuatilia stock kwa urahisi?",
      a: "Ndiyo. Unaona stock yote, bidhaa zinazokaribia kuisha, na zilizokwisha.",
    },
    {
      q: "Inaweza kusaidia biashara ndogo?",
      a: "Ndiyo. Imeundwa mahsusi kwa SMEs—duka, salon, services na biashara za kila siku.",
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

              <p className="mt-3 text-gray-600 text-sm">
                {faq.a}
              </p>
            </details>
          ))}

        </div>

      </div>
    </section>
  );
}