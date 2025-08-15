import React from "react";
import type { Movie } from "../../types/movie";
import MovieCard from "../MovieModal/MovieCard";
import css from "./MovieGrid.module.css";

const MovieGrid: React.FC<{ movies: Movie[] }> = ({ movies }) => {
  return (
    <div className={css.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
