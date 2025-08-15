import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../../services/movieService";
import type { MovieResponse } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ReactPaginate from "react-paginate";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import css from "./App.module.css";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery<MovieResponse>({
    queryKey: ["movies", searchTerm, page],
    queryFn: () => searchMovies(searchTerm, page),
    enabled: !!searchTerm,
    placeholderData: (previousData) => previousData,
  });

  return (
    <div>
      {/* 🔝 Верхня панель */}
      <div className={css.topBar}>
        <p>Powered by TMDB</p>
        <SearchBar
          onSearch={(term) => {
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
      {data?.results.length === 0 && (
        <ErrorMessage message="No movies found for your request." />
      )}

      {/* 🔢 Пагінація зверху */}
      {data && data.total_pages > 1 && (
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
      {data && <MovieGrid movies={data.results} />}
    </div>
  );
};

export default App;
