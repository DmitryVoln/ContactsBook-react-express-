import React, { FormEvent, useState } from "react";
import classNames from "classnames/bind";
import styles from "./login.module.scss";
import { useAppDispatch } from "../../hooks/redux";
import {
  requestAddUser,
  requestCheckAuth } from "../../redux/reducers/actionCreators"
import Button from "components/button/button";
import Input from "../../components/input/input";
import ModalWindow from "components/modalWindow/modalWindow";
import { BASE_URL } from "redux/constants";
import { User } from "server/server";

const cx = classNames.bind(styles);

const Login = () => {
  const [login, setLogin] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isModalWindow, setModalWindow] = useState<boolean>(false);
  const [errorLogin, setErrorLogin] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");

  const dispatch = useAppDispatch();

  const stateSetter = (): void => {
    setLogin("");
    setName("");
    setPassword("");
    setConfirmPassword("");
    setErrorLogin("");
    setErrorPassword("");
    setModalWindow(false);
  };

  const openWindow = (): void => {
    stateSetter();
    setModalWindow(true);
  };

  const closeModalEscape = (): void => {
    stateSetter();
    setModalWindow(false);
  };

  const addUser = async (): Promise<void> => {
    const requestAboutLogin = await fetch(`${BASE_URL}new/${login}`, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "GET",
    });

    if (requestAboutLogin.status !== 200) {
      const { message } = await requestAboutLogin.json();
      setErrorLogin(message);
      return;
    }
    if (password !== confirmPassword) {
      setErrorPassword("пароли не свопадают");
      setErrorLogin("");
      return;
    }
    stateSetter();
    const payload: User = {
      login: login,
      name: name,
      password: password,
      contacts: [],
    };
    dispatch(requestAddUser(payload));

  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const payload = {
      login,
      password,
    };
    dispatch(requestCheckAuth(payload));
  };

  return (
    <div className={cx("container")}>
      <form onSubmit={handleSubmit}>
        <div className={cx("fields")}>
          <Input
            placeholder="Введите логин "
            inputValue={login}
            onChange={setLogin}
          />
          <Input
            placeholder="Введите пароль"
            type="password"
            inputValue={password}
            onChange={setPassword}
          />
          <Button type="submit" btnClassName={"enter"} children={"Войти"} />
          <Button
            btnClassName={"login"}
            children={"Зарегистрироваться"}
            onClick={openWindow}
          />
        </div>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addUser();
        }}
      >
        {isModalWindow && (
          <ModalWindow
            closeModalEscape={closeModalEscape}
            btnEscapeChild={"отмена"}
            btnSubmitChild={"создать"}
            children={
              <>
                <Input
                placeholder="Введите логин"
                  inputValue={login}
                  onChange={setLogin}
                  errorMessage={errorLogin}
                />
                <Input placeholder="Введите имя" inputValue={name} onChange={setName} />
                <Input placeholder="Введите пароль" inputValue={password} onChange={setPassword} />
                <Input placeholder="Подтвердите пароль"
                  inputValue={confirmPassword}
                  onChange={setConfirmPassword}
                  errorMessage={errorPassword}
                />
              </>
            }
          />
        )}
      </form>
    </div>
  );
};

export default Login;
