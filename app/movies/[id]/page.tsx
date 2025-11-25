import { getMovieById } from "@/lib/movies";

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  const movie = getMovieById(params.id);

  if (!movie) {
    return (
      <section>
        <h2 className="text-2xl font-bold mb-2">Movie not found</h2>
        <p className="text-slate-300 text-sm">
          The movie you are looking for does not exist in the dataset.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">{movie.title}</h2>
        <p className="text-slate-300 text-sm">
          {movie.year ? movie.year : "Unknown year"}
        </p>
        <p className="text-slate-400 text-sm mt-1">
          {movie.genres.length ? movie.genres.join(", ") : "No genres listed"}
        </p>
      </div>

      <div className="border border-dashed border-slate-700 rounded-md p-6 text-slate-400 text-sm space-y-2">
        <p>
          Later we&apos;ll show: similar movies and maybe a description from another source.
        </p>
      </div>
    </section>
  );
}
