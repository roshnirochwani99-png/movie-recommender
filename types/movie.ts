export type Movie = {
  id: string;
  title: string;
  genres: string[];
  year?: number;
  overview?: string; // <--- New
};
