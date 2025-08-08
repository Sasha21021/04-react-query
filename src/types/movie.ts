export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number; // ← додай це
  // можливо ще: overview, release_date, genre_ids тощо
};

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
}
