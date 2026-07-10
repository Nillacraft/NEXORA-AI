export default function Features() {
  const features = [
    {
      title: "AI Chat",
      description: "Tanya apa saja dan dapatkan jawaban dengan cepat.",
    },
    {
      title: "AI Penulis",
      description: "Buat artikel, caption, dan ide konten dalam hitungan detik.",
    },
    {
      title: "AI Ringkasan",
      description: "Ringkas dokumen atau teks panjang menjadi poin penting.",
    },
    {
        title: "AI Translator",
        description: "Terjemahkan teks ke berbagai bahasa dengan cepat",
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold">
          Fitur Unggulan
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}