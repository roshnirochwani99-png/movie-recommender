// lib/recommendations.ts

import { getAllMovies } from "./movies";
import { Movie } from "@/types/movie";
import { tfidfSimilarity } from "./tfidf";

/**
 * Simple word-overlap similarity for genres
 * (treats genres as a bag of words)
 */
function genreSimilarity(a: string, b: string): number {
  const wordsA = new Set(a.toLowerCase().split(" ").filter(Boolean));
  const wordsB = new Set(b.toLowerCase().split(" ").filter(Boolean));

  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  const common = [...wordsA].filter((w) => wordsB.has(w));
  return common.length / Math.sqrt(wordsA.size * wordsB.size);
}

/**
 * Combine genre similarity + overview TF-IDF similarity
 * You can tweak the weights to see what feels best
 */
function fullSimilarity(a: Movie, b: Movie): number {
  const genreVectorA = a.genres.join(" ");
  const genreVectorB = b.genres.join(" ");

  const genreScore = genreSimilarity(genreVectorA, genreVectorB);
  const overviewScore = tfidfSimilarity(a.overview || "", b.overview || "");

  // Weighted combination: 40% genres, 60% overview text
  return genreScore * 0.4 + overviewScore * 0.6;
}

/**
 * Get movies similar to a given movieId, sorted by similarity score
 */
export function getSimilarMovies(movieId: string, limit = 10): Movie[] {
  const movies = getAllMovies();
  const baseMovie = movies.find((m) => m.id === movieId);

  if (!baseMovie) return [];

  const scored = movies
    .filter((m) => m.id !== movieId)
    .map((m) => ({
      movie: m,
      score: fullSimilarity(baseMovie, m),
    }))
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((item) => item.movie);
}
