import React from 'react';
import classNames from 'classnames/bind';
import { IButton } from './button.types';
import styles from './button.module.scss';

const cx = classNames.bind(styles);

function Button({
  onClick,
  children,
  type,
  disabled,
  btnClassName,
  ...rest
}: IButton) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={cx(`${btnClassName}`)}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  disabled: false,
  btnClassName: '',
  onClick: () => {},
  children: []
};

export default Button;
