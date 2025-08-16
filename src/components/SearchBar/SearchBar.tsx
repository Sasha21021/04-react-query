import React from "react";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  action: (formData: FormData) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ action }) => {
  return (
    <form action={action} className={css.form}>
      <input
        type="text"
        name="query"
        placeholder="Search movies..."
        className={css.input}
      />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
