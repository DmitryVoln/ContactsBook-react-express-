import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { UserContactsComponent } from "../../interfaces/userContactsComponent";
import Input from "../../components/input/input";
import Button from "components/button/button";
import ModalWindow from "components/modalWindow/modalWindow";
import InputsFormik from "./inputsFormik/inputsFormik";
import { Contact } from "interfaces/contacts";
import classNames from "classnames/bind";
import styles from "./userContacts.module.scss";
import {
  requestAddContact,
  requestContacts,
} from "redux/reducers/actionCreators";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout } from "redux/reducers/authSlice";

import { APP_TOKEN } from "constants/authConstants";

const cx = classNames.bind(styles);

export const UserContacts = ({ userId }: UserContactsComponent) => {
  const [listContacts, setListContacts] = useState<Contact[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  let checkedContactsIndex: number[] = [];

  // const yupschema = Yup.object().shape({
  //   firstName: Yup.string()
  //     .matches(
  //       /^[a-zA-Zа-яА-Я-\s"]+$/iu,
  //       'В названии должны быть только буквы, символы: "-" "пробелы"'
  //     )
  //     .max(125)
  //     .required("Введите фамилию"),
  //   lastName: Yup.string()
  //     .matches(
  //       /^[a-zA-Zа-яА-Я-\s"]+$/iu,
  //       'В названии должны быть только буквы, символы: "-" "пробелы"'
  //     )
  //     .max(125)
  //     .required("Введите имя"),
  //   phoneNumber: Yup.string()
  //     .matches(
  //       /^\+[0-9]+$/iu,
  //       "введите номер цифрами в верном формате: х-ххх-ххх-хх-хх"
  //     )
  //     .required("Введите номер телефона"),
  //   adress: Yup.string()
  //     .matches(
  //       /^[a-zA-Zа-яА-Я0-9-,."\s]+$/iu,
  //       'В названии должны быть только буквы, цифры, символы: "-" "," "." "пробелы"'
  //     )
  //     .max(125),
  // });

  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(requestContacts(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    setListContacts(user.contacts);
  }, [user]);

  const handleCheck = (event: React.MouseEvent) => {
    checkedContactsIndex.push();
    console.log(event.target);
    console.log(event.currentTarget);
  };

  const addContact = async (values: FormikValues): Promise<void> => {
    const payload: Contact = {
      id: uuidv4(),
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      adress: values.adress,
    };
    const contacts = [...user.contacts, payload];
    await dispatch(requestAddContact({ ...user, contacts }));
    await dispatch(requestContacts(userId));
  };

  const deleteContact = async (payload: Contact, index: number) => {
    const contacts = [...listContacts];
    contacts.splice(index, 1);
    await setListContacts(contacts);
    await dispatch(requestAddContact({ ...user, contacts }));
    await dispatch(requestContacts(userId));
  };

  const updateContact = async (payload: Contact, index: number) => {
    setShowModal(true);

    // await dispatch(requestAddContact({ ...user, contacts }));
    // await dispatch(requestContacts(userId));
  };

  const closeUpdateContacts = () => {
    setShowModal(false);
  };

  const closeWithoutChanges = () => {
    setShowModal(false);
  }

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
      <InputsFormik onSubmit={addContact} />
      <div className={cx("contacts-list")}>
        {listContacts.map((item: Contact, index) => (
          <div className={cx("list", { back: index % 2 === 0 })} key={index}>
            <div className={cx("list-item")}>{item.firstName}</div>
            <div className={cx("list-item")}>{item.lastName}</div>
            <div className={cx("list-item")}>{item.phoneNumber}</div>
            <div className={cx("list-item")}>{item.adress}</div>
            <div className={cx("list-btns")}>
              <Button
                className={cx("delete")}
                onClick={() => deleteContact(item, index)}
              >
                delete
              </Button>
              <Button
                className={cx("update")}
                onClick={() => updateContact(item, index)}
              >
                update
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="">
        {showModal && (
          <ModalWindow closeModalSubmit={closeUpdateContacts} closeModalEscape={closeWithoutChanges} btnEscapeChild={'Отмена'} btnSubmitChild={'Сохранить'}>
             <Input></Input>
            <Input></Input>
            <Input></Input>
            <Input></Input>
          </ModalWindow>
        )}
      </div>
    </div>
  );
};
