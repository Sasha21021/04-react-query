import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await axios.get<{ results: Movie[] }>(
      `${BASE_URL}/search/movie`,
      {
        params: { query },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
