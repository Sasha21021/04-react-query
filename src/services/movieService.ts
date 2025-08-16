import axios from "axios";
import type { MovieResponse } from "../types/movie";

export const searchMovies = async (
  query: string,
  page: number
): Promise<MovieResponse> => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        query,
        page,
      },
    }
  );
  return response.data;
};
