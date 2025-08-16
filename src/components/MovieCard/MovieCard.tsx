import React from "react";
import type { Movie } from "../../types/movie";
import css from "./MovieCard.module.css";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div className={css.card} onClick={onClick}>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/placeholder.jpg"
        }
        alt={movie.title}
        className={css.image}
      />
      <h3 className={css.title}>{movie.title}</h3>
      <p className={css.rating}>Rating: {movie.vote_average}</p>
    </div>
  );
};

export default MovieCard;
