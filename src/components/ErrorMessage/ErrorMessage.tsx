import React from "react";
import css from "./ErrorMessage.module.css";
import { FaTimesCircle } from "react-icons/fa"; // Іконка ❌

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className={css.wrapper}>
      <FaTimesCircle className={css.icon} />
      <span className={css.text}>{message}</span>
    </div>
  );
};

export default ErrorMessage;
