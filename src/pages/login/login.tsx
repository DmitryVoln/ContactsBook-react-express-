import React, { useEffect, FormEvent, useState } from "react";
import classNames from "classnames/bind";
import styles from "./login.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { requestCheckAuth } from "redux/reducers/actionCreators";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import e from "express";

interface Login {
  onClick(): void;
}

const cx = classNames.bind(styles);

const Login = () => {
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const { authData } = useAppSelector((state) => state.authReducer);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const payload = {
      login,
      password,
    };
    dispatch(requestCheckAuth(payload));
    // if (authData.userId && authData.token) {
    //   onClick();
    // }
  };

  return (
    <div className={cx("container")}>
      <form onSubmit={handleSubmit}>
        <div className={cx("fields")}>
          <Input
            placeholder="Введите логин"
            inputValue={login}
            onChange={setLogin}
          />
          <Input
            placeholder="Введите пароль"
            type="password"
            inputValue={password}
            onChange={setPassword}
          />
          <Button type="submit" className={cx("btn")} children={"LogIn"} />
        </div>
      </form>
    </div>
  );
};

export default Login;
