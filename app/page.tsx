export default function HomePage() {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-bold">Welcome to CineMate 🎥</h2>
      <p className="text-slate-300 max-w-2xl">
        CineMate is a simple movie recommendation system. Browse movies, rate
        what you like, and get personalized recommendations based on your taste.
      </p>
      <div className="flex gap-3 mt-4">
        <a
          href="/movies"
          className="px-4 py-2 rounded-md border border-slate-700 hover:bg-slate-800 text-sm"
        >
          Browse Movies
        </a>
        <a
          href="/auth/register"
          className="px-4 py-2 rounded-md bg-slate-100 text-slate-950 text-sm font-semibold hover:bg-slate-200"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
