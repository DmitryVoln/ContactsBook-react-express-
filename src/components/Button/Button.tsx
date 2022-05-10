import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { ButtonComponent } from "interfaces/button";

const cx = classNames.bind(styles);

export const Button = ({ name, addContact }: ButtonComponent) => {
  return <button type="submit" className={cx('btn')} onClick={addContact}>{name}</button>;
};
