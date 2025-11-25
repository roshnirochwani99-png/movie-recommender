import { getAllMovies } from "@/lib/movies";

type MoviesPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = (resolvedSearchParams.q || "").toLowerCase();

  let movies = getAllMovies();

  if (query) {
    movies = movies.filter((movie) => {
      const inTitle = movie.title.toLowerCase().includes(query);
      const inGenres = movie.genres.join(" ").toLowerCase().includes(query);
      return inTitle || inGenres;
    });
  } else {
    // if no search, just show first 50 to keep page small
    movies = movies.slice(0, 50);
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">All Movies</h2>

      <form className="mb-4 flex gap-2">
        <input
          type="text"
          name="q"
          defaultValue={resolvedSearchParams.q || ""}
          placeholder="Search by title or genre..."
          className="flex-1 px-3 py-2 rounded-md bg-slate-900 border border-slate-700 outline-none text-slate-100 text-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-slate-100 text-slate-950 text-sm font-semibold hover:bg-slate-200 whitespace-nowrap"
        >
          Search
        </button>
      </form>

      <p className="text-slate-300 mb-4 text-xs">
        {query
          ? `Showing ${movies.length} result(s) for "${resolvedSearchParams.q}".`
          : `Showing the first ${movies.length} movies from the MovieLens dataset.`}
      </p>

      {movies.length === 0 ? (
        <div className="border border-dashed border-slate-700 rounded-md p-6 text-slate-400 text-sm">
          No movies found. Try a different search term.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="border border-slate-800 rounded-lg p-4 hover:bg-slate-900 transition text-sm flex flex-col gap-2"
            >
              <div className="font-semibold">{movie.title}</div>
              <div className="text-xs text-slate-400">
                {movie.year ? movie.year : "Unknown year"}
              </div>
              <div className="text-xs text-slate-400">
                {movie.genres.length ? movie.genres.join(", ") : "No genres"}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
