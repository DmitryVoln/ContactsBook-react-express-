import classNames from "classnames/bind";
import Input from "components/input/input";
import Button from "components/button/button";

import { IInput } from 'components/input/input.types';

import styles from "./inputs.module.scss";

const cx = classNames.bind(styles);

export interface IInputProp {
  placeholder: string;
  inputvalue: string;
  onChange(value: string): void;
  type: IInput["type"];
  pattern?: string;
  isRequired?: boolean;
}

export interface IInputs {
  inputsProps: IInputProp[];
  inputsClassName: string;
  btnClassName: string;
  btn: boolean;
  isModalOpen: boolean;
  errorMessage: string;
}

const Inputs = ({
  inputsProps,
  inputsClassName,
  btnClassName,
  btn,
  isModalOpen,
  errorMessage
}: IInputs) => {
  return (
    <div className={cx(`inputs-${inputsClassName}`)}>
      {inputsProps.map(({ placeholder, inputvalue, onChange, pattern, type, isRequired }: IInputProp, index) => (
        <Input
          placeholder={placeholder}
          inputValue={inputvalue}
          onChange={onChange}
          isModalOpen={isModalOpen}
          type={type}
          pattern={pattern}
          key={index}
          isRequired={isRequired}
          errorMessage={errorMessage}
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
  required: false,
  errorMessage: ""
};

export default Inputs;
