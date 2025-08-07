import axios from "axios";

export default async function searchMovies(query: string) {
  const url = "https://api.themoviedb.org/3/search/movie";

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    });

    return response.data.results; // масив фільмів
  } catch (error) {
    console.error("❌ TMDB error:", error);
    return [];
  }
}
