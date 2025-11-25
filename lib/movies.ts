import fs from "fs";
import path from "path";
import { Movie } from "@/types/movie";
import { movieOverviews } from "@/data/overviews";

let cachedMovies: Movie[] | null = null;

function parseMoviesCsv(): Movie[] {
  const filePath = path.join(process.cwd(), "data", "movies.csv");
  const raw = fs.readFileSync(filePath, "utf8");

  const lines = raw.trim().split("\n");
  const [, ...rows] = lines; // skip header

  const movies: Movie[] = rows.map((line) => {
    // movies.csv format: movieId,title,genres
    // title can contain commas, so we:
    // - movieId = before first comma
    // - genres = after last comma
    // - title  = everything in between
    const firstComma = line.indexOf(",");
    const lastComma = line.lastIndexOf(",");

    const movieId = line.slice(0, firstComma);
    const rawTitle = line.slice(firstComma + 1, lastComma);
    const genresStr = line.slice(lastComma + 1);

    const title = rawTitle.replace(/^"|"$/g, ""); // remove quotes if present
    const genres =
      genresStr === "(no genres listed)" ? [] : genresStr.split("|");

    // optionally extract year from title like "Toy Story (1995)"
    let year: number | undefined = undefined;
    const yearMatch = title.match(/\((\d{4})\)$/);
    if (yearMatch) {
      year = Number(yearMatch[1]);
    }

    return {
      id: movieId,
      title,
      genres,
      year,
      overview: movieOverviews[movieId] || "", // fallback blank
    };
  });

  return movies;
}

export function getAllMovies(): Movie[] {
  if (cachedMovies) return cachedMovies;
  cachedMovies = parseMoviesCsv();
  return cachedMovies;
}

export function getMovieById(id: string): Movie | undefined {
  const movies = getAllMovies();
  return movies.find((m) => m.id === id);
}
