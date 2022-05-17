import React from "react";
import classNames from "classnames/bind";
import styles from "./modalWindow.module.scss";
import Button from "components/button/button";

const cx = classNames.bind(styles);

interface IModalProps {
  children: React.ReactNode;
  closeModalSubmit: () => void;
  closeModalEscape: () => void;
  btnEscapeChild: React.ReactNode;
  btnSubmitChild: React.ReactNode;
}

const ModalWindow = ({
  children,
  closeModalSubmit,
  closeModalEscape,
  btnEscapeChild,
  btnSubmitChild,
}: IModalProps) => {
  return (
    <div className={cx("modal-wrapper")}>
      <div className={cx("modal-window")}>
        <div className={cx("btn-block")}>
          <Button onClick={closeModalEscape}>{btnEscapeChild}</Button>
          <Button onClick={closeModalSubmit}>{btnSubmitChild}</Button>
        </div>
        <div className={cx("modal-children")}>{children}</div>
      </div>
    </div>
  );
};

ModalWindow.defaultProps = {
  sizeModalWindow: "",
  customClass: "",
  closeModalSubmit: () => {},
  closeModalEscape: () => {},
  btnEscapeChild: [],
  btnSubmitChild: [],
  children: [],
};

export default ModalWindow;
