import React, { useState, ChangeEvent } from "react";
import classNames from "classnames/bind";
import styles from "./input.module.scss";
import { IInput } from "./input.types";

const cx = classNames.bind(styles);

const Input = ({ placeholder, onChange, inputValue, ...rest }: IInput) => {
  return (
    <input
      {...rest}
      type="text"
      className={cx("input")}
      placeholder={placeholder}
      value={inputValue}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        onChange(event.target.value)
      }
    />
  );
};

Input.defaultProps = {
  type: "text",
  label: "",
  errorMessage: "",
  placeholder: "",
  inputValue: "",
  inputHandler: () => {},
};

export default Input;
