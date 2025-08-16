import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          ×
        </button>
        <img
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
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
    </div>,
    document.body
  );
};

export default MovieModal;
