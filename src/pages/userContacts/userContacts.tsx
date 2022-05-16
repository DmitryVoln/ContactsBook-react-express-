import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, FormikFormProps, FormikProps, FormikValues } from "formik";
import * as Yup from "yup";
import { UserContactsComponent } from "../../interfaces/userContactsComponent";
import Input from "../../components/input/input";
import Button from "components/button/button";
import { Contact } from "interfaces/contacts";
import classNames from "classnames/bind";
import styles from "./userContacts.module.scss";
import {
  requestAddContact,
  requestContacts,
} from "redux/reducers/actionCreators";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { authSlice, logout } from "redux/reducers/authSlice";

import { APP_TOKEN } from "constants/authConstants";

const cx = classNames.bind(styles);

export const UserContacts = ({ userId }: UserContactsComponent) => {
  const yupschema = Yup.object().shape({
    firstName: Yup.string()
      .matches(
        /^[a-zA-Zа-яА-Я-\s"]+$/iu,
        'В названии должны быть только буквы, символы: "-" "пробелы"'
      )
      .max(125),
    lastName: Yup.string()
      .matches(
        /^[a-zA-Zа-яА-Я-\s"]+$/iu,
        'В названии должны быть только буквы, символы: "-" "пробелы"'
      )
      .max(125),
    phoneNumber: Yup.number(),
    adress: Yup.string()
      .matches(
        /^[a-zA-Zа-яА-Я0-9-,."\s]+$/iu,
        'В названии должны быть только буквы, цифры, символы: "-" "," "." "пробелы"'
      )
      .max(125),
  });

  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log(userId);
    dispatch(requestContacts(userId));
  }, []);

  const addContact = async (values: FormikValues) => {
    const payload: Contact = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      adress: values.adress,
    };
    const contacts = [...user.contacts, payload];
    await dispatch(requestAddContact({ ...user, contacts }));
    await dispatch(requestContacts(1));
  };

  const handleLogout = (): void => {
    localStorage.removeItem(APP_TOKEN);
    dispatch(logout());
  };

  return (
    <div className={cx("user-container")}>
      <div className={cx("user-name")}>{user.name}</div>
      <div className={cx("header")}>
        <div className={cx("contacts-header")}>Контакты:</div>
        <Link to="/" onClick={handleLogout} className={cx("logout")}>
          logout
        </Link>
      </div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          phoneNumber: "",
          adress: "",
        }}
        validationSchema={yupschema}
        onSubmit={addContact}
      >
        {({ errors, touched, handleSubmit, setFieldValue, values }) => {
          return (
            <div className={cx("inputs-btn")}>
              <Input
                placeholder="Фамилия"
                inputValue={values.firstName}
                onChange={(value) => {
                  setFieldValue("firstName", value);
                }}
              />
              <Input
                placeholder="Имя"
                inputValue={values.lastName}
                onChange={(value) => {
                  setFieldValue("lastName", value);
                }}
              />
              <Input
                placeholder="номер телефона"
                inputValue={values.phoneNumber}
                onChange={(value) => {
                  setFieldValue("phoneNumber", value);
                }}
              />
              <Input
                placeholder="Адрес"
                inputValue={values.adress}
                onChange={(value) => {
                  setFieldValue("adress", value);
                }}
              />
              <Button children={"Сохранить контакт"} onClick={handleSubmit} />
            </div>
          );
        }}
      </Formik>
      <div className={cx("contacts-list")}>
        {user.contacts.map((item: Contact, index) => (
          <div className={cx("list", { back: index % 2 === 0 })} key={index}>
            <div className={cx("list-item")}>{item.firstName}</div>
            <div className={cx("list-item")}>{item.lastName}</div>
            <div className={cx("list-item")}>{item.phoneNumber}</div>
            <div className={cx("list-item")}>{item.adress}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
