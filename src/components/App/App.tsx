import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ReactPaginate from "react-paginate";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import MovieModal from "../MovieModal/MovieModal";
import { Toaster, toast } from "react-hot-toast";
import css from "./App.module.css";
import type { Movie } from "../../types/movie";
import type { MovieResponse } from "../../types/movieResponse";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useQuery<MovieResponse>({
    queryKey: ["movies", searchTerm, page],
    queryFn: () => searchMovies(searchTerm, page),
    enabled: !!searchTerm,
    placeholderData: (previousData) => previousData,
  });

  // ✅ Показати toast лише один раз при порожньому результаті
  useEffect(() => {
    if (isSuccess && data?.results.length === 0) {
      toast.error("No movies found");
    }
  }, [isSuccess, data]);

  return (
    <div>
      {/* 🔔 Toast */}
      <Toaster position="top-right" />

      {/* 🔝 Верхня панель */}
      <div className={css.topBar}>
        <p>Powered by TMDB</p>
        <SearchBar
          action={(formData) => {
            const term = formData.get("query")?.toString().trim();

            if (!term) {
              toast.error("Please enter a search query");
              return;
            }

            setSearchTerm(term);
            setPage(1);
          }}
        />
      </div>

      {/* 🧼 Порожня сторінка перед пошуком */}
      {!searchTerm && (
        <div className={css.blank}>
          <p>Start by searching for a movie.</p>
        </div>
      )}

      {/* ⚠️ Обробка помилок */}
      {isError && <ErrorMessage message="Something went wrong." />}

      {/* ⏳ Завантаження */}
      {isLoading && <Loader />}

      {/* ❌ Немає результатів */}
      {isSuccess && data?.results.length === 0 && (
        <ErrorMessage message="No movies found for your request." />
      )}

      {/* 🔢 Пагінація зверху */}
      {isSuccess && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {/* 🎬 Сітка фільмів */}
      {isSuccess && (
        <MovieGrid
          movies={data.results}
          onSelect={(movie) => setSelectedMovie(movie)}
        />
      )}

      {/* 🪟 Модальне вікно */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default App;
