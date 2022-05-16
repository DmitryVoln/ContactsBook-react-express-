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
  className,
  ...rest
}: IButton) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={cx('btn', `${className}`)}
      // eslint-disable-next-line react/button-has-type
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
  className: '',
  onClick: () => {},
};

export default Button;
