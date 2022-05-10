import React, { useState } from "react";
import classNames from 'classnames/bind';
import styles from './Login.module.scss';

interface Login {
  onClick(): void;
}

export function Login({onClick}: Login) {
  const cx = classNames.bind(styles);
  const [passwordValue, setPassword] = useState('');

  function setValue(event: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }
  return (
    <div className={cx('auth')}>
      <input type="password" value={passwordValue} onChange={setValue}/>
      <button type="button" className={cx('btn')} onClick={onClick}>Login</button>
    </div>
  );
}