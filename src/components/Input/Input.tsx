import React, { ChangeEvent } from "react";
import classNames from "classnames/bind";
import styles from "./input.module.scss";
import { IInput } from "./input.types";

const cx = classNames.bind(styles);

const Input = ({ placeholder, onChange, inputValue, errorMessage, type, ...rest }: IInput) => {
  console.log(errorMessage);
  return (
    <div className={cx('input-container')}>
      <input
        {...rest}
        type={type}
        className={cx("input")}
        placeholder={placeholder}
        value={inputValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value)
        }
      />
    {errorMessage && <div className={cx('error')}>{errorMessage}</div>}  
    </div>
  );
};

{
  /* <div className={cx('container', containerWidth, boxSizing)}>
{label && <label htmlFor={id}>{label}</label>}
<input id={id} className={cx({ invalid: isInvalid || errorMessage })} type={type} {...rest} />
{errorMessage && <div className={cx('error-container')}>{errorMessage}</div>}
</div> */
}

Input.defaultProps = {
  type: "text",
  label: "",
  errorMessage: "",
  placeholder: "",
  inputValue: "",
  onChange: () => {},
};

export default Input;
