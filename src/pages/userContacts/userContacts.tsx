import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "components/button/button";
import ModalWindow from "components/modalWindow/modalWindow";
import Inputs from "./inputs/inputs";
import { IInputProp } from "./inputs/inputs";
import { Contact } from "interfaces/contacts";
import classNames from "classnames/bind";
import styles from "./userContacts.module.scss";
import {
  requestAddContact,
  requestContacts,
} from "redux/reducers/actionCreators";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout } from "redux/reducers/authSlice";
import { filterer } from "utils/filterer";

import { APP_TOKEN, USER_ID } from "constants/authConstants";

const cx = classNames.bind(styles);

export const UserContacts = () => {
  const [listContacts, setListContacts] = useState<Contact[]>([]);
  const [id, setId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [adress, setAdress] = useState<string>("");
  const [searchField, setSearchField] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const stateSetter = (
    payload: Contact | null,
    isShowModalWindow: boolean
  ): void => {
    setId(payload?.id || "");
    setFirstName(payload?.firstName || "");
    setLastName(payload?.lastName || "");
    setPhoneNumber(payload?.phoneNumber || "");
    setAdress(payload?.adress || "");
    setShowModal(isShowModalWindow);
    return;
  };

  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const userId = Number(localStorage.getItem(USER_ID));
    dispatch(requestContacts(userId));
  }, [dispatch]);

  useEffect(() => {
    if (searchField) {
      setListContacts(user.contacts.filter(filterer(searchField)));
    } else {
      setListContacts(user.contacts);
    }
    // eslint-disable-next-line
  }, [user, searchField]);

  useEffect(() => {}, [showModal]);

  const addContact = async (): Promise<void> => {
    const payload: Contact = {
      id: String(Date.now()),
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      adress: adress,
    };
    const contacts = [...user.contacts, payload];
    console.log(contacts)
    stateSetter(null, false);
    await dispatch(requestAddContact({ ...user, contacts }));
    await dispatch(requestContacts(user.id));
  };

  const addChangedContact = async (): Promise<void> => {
    const payload: Contact = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      adress: adress,
    };
    const contacts = [...user.contacts].map((contact) =>
      contact.id === id ? payload : contact
    );
    setShowModal(false);
    stateSetter(null, false);
    await dispatch(requestAddContact({ ...user, contacts }));
    await dispatch(requestContacts(user.id));
  };

  const deleteContact = async (payload: Contact, index: number) => {
    const contacts = [...listContacts];
    contacts.splice(index, 1);
    await setListContacts(contacts);
    await dispatch(requestAddContact({ ...user, contacts }));
    await dispatch(requestContacts(user.id));
  };

  const openModalWindow = async (item: Contact, index: number) => {
    stateSetter(item, true);
  };

  const closeWithoutChanges = () => {
    stateSetter(null, false);
  };

  const handleLogout = (): void => {
    localStorage.removeItem(APP_TOKEN);
    dispatch(logout());
  };

  const inputsProps: IInputProp[] = [
    {
      placeholder: "Имя",
      inputvalue: firstName,
      onChange(value: string): void {
        setFirstName(value);
      },
      type: "text",
    },
    {
      placeholder: "Фамилия",
      inputvalue: lastName,
      onChange(value: string): void {
        setLastName(value);
      },
      type: "text",
    },
    {
      placeholder: "телефон (только цифры)",
      inputvalue: phoneNumber,
      onChange(value: string): void {
        setPhoneNumber(value);
      },
      type: "tel",
      pattern: "[0-9]+$",
    },
    {
      placeholder: "Адрес",
      inputvalue: adress,
      onChange(value: string): void {
        setAdress(value);
      },
      type: "text",
    },
  ];

  return (
    <div className={cx("user-container")}>
      <div className={cx("user-name")}>{user.name}</div>
      <div className={cx("header")}>
        <div className={cx("contacts-header")}>Контакты:</div>
        <input
          type="text"
          className={cx("search")}
          placeholder="поиск"
          value={searchField}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchField(event.target.value);
          }}
        />
        <Link to="/" onClick={handleLogout} className={cx("logout")}>
          logout
        </Link>
      </div>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          addContact();
        }}
      >
        <Inputs
          inputsProps={inputsProps}
          inputsClassName="row"
          btnClassName={"save"}
          btn
          isModalOpen={showModal}
        />
      </form>
      <div className={cx("list")}>
        <div className={cx("list-item")}>Имя</div>
        <div className={cx("list-item")}>Фамилия</div>
        <div className={cx("list-item")}>Телефон</div>
        <div className={cx("list-item")}>Адрес</div>
        <div className={cx("list-btns")}></div>
      </div>
      <div className={cx("contacts-list")}>
        {listContacts.map((item: Contact, index) => (
          <div className={cx("list", { back: index % 2 === 0 })} key={index}>
            <div className={cx("list-item")}>{item.firstName}</div>
            <div className={cx("list-item")}>{item.lastName}</div>
            <div className={cx("list-item")}>{item.phoneNumber}</div>
            <div className={cx("list-item")}>{item.adress}</div>
            <div className={cx("list-btns")}>
              <Button
                btnClassName={cx("delete")}
                onClick={() => deleteContact(item, index)}
              >
                delete
              </Button>
              <Button
                btnClassName={cx("update")}
                onClick={() => openModalWindow(item, index)}
              >
                update
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="">
        {showModal && (
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              addChangedContact();
            }}
          >
            <ModalWindow
              closeModalEscape={closeWithoutChanges}
              btnEscapeChild={"Отмена"}
              btnSubmitChild={"Сохранить"}
            >
              <Inputs inputsProps={inputsProps} inputsClassName="columun" />
            </ModalWindow>
          </form>
        )}
      </div>
    </div>
  );
};
