import classNames from "classnames/bind";
import Input from "components/input/input";
import Button from "components/button/button";

import { IInput } from "components/input/input.types";

import styles from "./inputs.module.scss";

const cx = classNames.bind(styles);

export interface IInputProp {
  placeholder: string;
  inputvalue: string;
  onChange(value: string): void;
  type: IInput["type"];
  pattern?: string;
}

export interface IInputs {
  inputsProps: IInputProp[];
  inputsClassName: string;
  btnClassName: string;
  btn: boolean;
  isModalOpen: boolean;
}

const Inputs = ({
  inputsProps,
  inputsClassName,
  btnClassName,
  btn,
  isModalOpen,
}: IInputs) => {
  return (
    <div className={cx(`inputs-${inputsClassName}`)}>
      {inputsProps.map(({ placeholder, inputvalue, onChange, pattern, type }: IInputProp) => (
        <Input
          placeholder={placeholder}
          inputValue={inputvalue}
          onChange={onChange}
          isModalOpen={isModalOpen}
          type={type}
          pattern={pattern}
        />
      ))}

      {btn && (
        <Button
          children={"Сохранить контакт"}
          btnClassName={btnClassName}
          type={"submit"}
        />
      )}
    </div>
  );
};

Inputs.defaultProps = {
  btn: false,
  isModalOpen: false,
  btnClassName: "",
};

export default Inputs;
