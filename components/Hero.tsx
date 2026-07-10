export default function Hero() {
  return (
    <section className="bg-slate-900 text-white py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h1 className="text-5xl font-bold">
          Bangun Masa Depan dengan AI
        </h1>

        <p className="mt-6 text-lg text-slate-300">
          Semua kebutuhan AI dalam satu platform modern untuk membantu pekerjaan Anda.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="rounded-lg bg-blue-600 px-6 py-3 hover:bg-blue-700">
            Mulai Gratis
          </button>

          <button className="rounded-lg border border-slate-500 px-6 py-3 hover:bg-slate-800">
            Pelajari
          </button>
        </div>
      </div>
    </section>
  );
}