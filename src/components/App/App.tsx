import { useState } from "react";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import searchMovies from "../../api/searchMovies";
import { toast } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (newQuery: string) => {
    const trimmedQuery = newQuery.trim();

    if (!trimmedQuery) {
      const message = "Please enter your search query.";
      toast(message);
      setErrorMessage(message);
      setMovies([]);
      return;
    }

    setIsLoading(true);
    setError(false);
    setErrorMessage("");

    try {
      const results = await searchMovies(trimmedQuery);

      if (results.length === 0) {
        const message = "No movies found for your request.";
        toast(message);
        setErrorMessage(message);
      }

      setMovies(results);
    } catch (err) {
      console.error("Search error:", err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage />
      ) : errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : movies.length === 0 ? (
        <p className={styles.noResults}>
          No movies to show yet. Try searching!
        </p>
      ) : (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
