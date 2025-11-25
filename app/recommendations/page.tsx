import { getAllMovies } from "@/lib/movies";
import { getSimilarMovies } from "@/lib/recommendations";

type RecommendationsPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function RecommendationsPage({
  searchParams,
}: RecommendationsPageProps) {
  const resolved = await searchParams;
  const query = (resolved.q || "").toLowerCase();

  const allMovies = getAllMovies();

  // 1) Pick base movie
  let baseMovie =
    query.length > 0
      ? allMovies.find((m) => m.title.toLowerCase().includes(query))
      : allMovies[0];

  // 2) Get 5 similar movies
  const recommendations = baseMovie
    ? getSimilarMovies(baseMovie.id, 5)
    : [];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Find Similar Movies</h2>

      {/* Search form */}
      <form className="mb-4 flex gap-2">
        <input
          type="text"
          name="q"
          defaultValue={resolved.q || ""}
          placeholder="Enter a movie name, e.g. Toy Story"
          className="flex-1 px-3 py-2 rounded-md bg-slate-900 border border-slate-700 outline-none text-slate-100 text-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-slate-100 text-slate-950 text-sm font-semibold hover:bg-slate-200 whitespace-nowrap"
        >
          Get similar
        </button>
      </form>

      {/* Info text */}
      {query && !baseMovie && (
        <p className="text-slate-300 text-sm mb-4">
          No movie found matching &quot;{resolved.q}&quot;. Try another title.
        </p>
      )}

      {baseMovie && (
        <p className="text-slate-300 text-sm mb-4">
          Showing movies similar to:{" "}
          <span className="font-semibold">{baseMovie.title}</span>
        </p>
      )}

      {/* Results */}
      {baseMovie && recommendations.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((movie) => (
            <div
              key={movie.id}
              className="border border-slate-800 rounded-lg p-4 hover:bg-slate-900 transition text-sm flex flex-col gap-2"
            >
              <div className="font-semibold">{movie.title}</div>
              <div className="text-xs text-slate-400">
                {movie.year ?? "Unknown year"}
              </div>
              <div className="text-xs text-slate-400">
                {movie.genres.length ? movie.genres.join(", ") : "No genres"}
              </div>
            </div>
          ))}
        </div>
      ) : baseMovie ? (
        <div className="border border-dashed border-slate-700 rounded-md p-6 text-slate-400 text-sm">
          No similar movies found (this is unlikely with MovieLens, but just in
          case).
        </div>
      ) : (
        !query && (
          <div className="border border-dashed border-slate-700 rounded-md p-6 text-slate-400 text-sm">
            Start by typing part of a movie name above, then click &quot;Get
            similar&quot;.
          </div>
        )
      )}
    </section>
  );
}
