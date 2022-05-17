import React, { FormEvent, useState } from "react";
import classNames from "classnames/bind";
import styles from "./login.module.scss";
import { useAppDispatch } from "../../hooks/redux";
import { requestCheckAuth } from "redux/reducers/actionCreators";
import Button from "../../components/button/button";
import Input from "../../components/input/input";

const cx = classNames.bind(styles);

const Login = () => {
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");

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
            placeholder="Введите логин на латинице"
            inputValue={login}
            onChange={setLogin}
            pattern="[^А-Яа-яЁё]+"
          />
          <Input
            placeholder="Введите пароль"
            type="password"
            inputValue={password}
            onChange={setPassword}
          />
          <Button type="submit" btnClassName={'login'} children={"LogIn"} />
        </div>
      </form>
    </div>
  );
};

export default Login;
