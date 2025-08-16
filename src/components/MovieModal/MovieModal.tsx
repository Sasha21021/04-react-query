import React from "react";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          ×
        </button>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder.jpg"
          }
          alt={movie.title}
          className={css.poster}
        />
        <h2 className={css.title}>{movie.title}</h2>
        <p className={css.overview}>{movie.overview}</p>
        <p className={css.rating}>Rating: {movie.vote_average}</p>
        <p className={css.year}>
          Release Year: {movie.release_date?.slice(0, 4) || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default MovieModal;
