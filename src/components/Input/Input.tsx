import React, { useState, ChangeEvent } from "react";
import classNames from "classnames/bind";
import styles from "./Input.module.scss";
import { InputComponent } from "interfaces/input";

const cx = classNames.bind(styles);

export const Input = ({ placeholder, inputHandler, inputValue }: InputComponent) => {
  return (
    <input type="text" className={cx("input")} placeholder={placeholder} value={inputValue} onChange={(event: ChangeEvent<HTMLInputElement>) => inputHandler(event.target.value)}/>
  );
};
