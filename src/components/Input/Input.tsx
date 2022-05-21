import React, { ChangeEvent } from "react";
import classNames from "classnames/bind";
import styles from "./input.module.scss";
import { IInput } from "./input.types";

const cx = classNames.bind(styles);

const Input = ({
  placeholder,
  onChange,
  inputValue,
  errorMessage,
  type,
  isModalOpen,
  isRequired,
  ...rest
}: IInput) => {
  return (
    <div className={cx("input-container")}>
      <input
        {...rest}
        type={type}
        className={cx("input")}
        placeholder={placeholder}
        value={isModalOpen ? "" : inputValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onChange(event.target.value);
        }}
        required={isRequired}
      />
      {errorMessage && <div className={cx("error")}>{errorMessage}</div>}
    </div>
  );
};

Input.defaultProps = {
  type: "text",
  label: "",
  errorMessage: "",
  placeholder: "",
  inputValue: "",
  onChange: () => {},
  className: "",
  isModalOpen: false,
  pattern: null,
  isRequired: false,
};

export default Input;
