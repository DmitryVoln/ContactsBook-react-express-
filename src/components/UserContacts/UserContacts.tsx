import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { Formik, FormikFormProps, FormikProps, FormikValues } from "formik";
import * as Yup from "yup";
import { UserContactsComponent } from "../../interfaces/userContactsComponent";
import { Input } from "components/Input/Input";
import { Button } from "components/Button/Button";
import { Contact } from "interfaces/contacts";
import classNames from "classnames/bind";
import styles from "./UserContacts.module.scss";
import { requestContacts } from "redux/reducers/ActionCreators";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

const cx = classNames.bind(styles);

export const UserContacts = ({ handleLogout }: UserContactsComponent) => {
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

  const { user } = useAppSelector( state =>state.userReducer)
  const dispatch = useAppDispatch();
  useEffect( () => {
    dispatch(requestContacts(1));
    console.log(user)
  }, []);

  const addContact = (values: FormikValues) => {
    const payload = { 
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      adress: values.adress
    }
    const userId = user.id
    // await dispatch(requestAddEditedCity(payload, userId));
//   await dispatch(requestLocationCity());

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
                inputHandler={(value) => {
                  setFieldValue("firstName", value);
                }}
              />
              <Input
                placeholder="Имя"
                inputValue={values.lastName}
                inputHandler={(value) => {
                  setFieldValue("lastName", value);
                }}
              />
              <Input
                placeholder="номер телефона"
                inputValue={values.phoneNumber}
                inputHandler={(value) => {
                  setFieldValue("phoneNumber", value);
                }}
              />
              <Input
                placeholder="Адрес"
                inputValue={values.adress}
                inputHandler={(value) => {
                  setFieldValue("adress", value);
                }}
              />
              <Button name={"Сохранить контакт"} addContact={handleSubmit} />
            </div>
          );
        }}
      </Formik>
      <div className={cx("contacts-list")}>
          {user.contacts.map((item: Contact, index) => (
            <div className={cx("list", {back: index % 2 === 0})} key={index}>
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

// className={cx('list__manager__right__sort__btn', {
//   activePageBtn: countItemsOnPage === countItems,
// })}

// const addEditedCity = async () => {
//   if (countryId === currentId && initCity === textCity) {
//     setEditCity(false);
//     return;
//   }
//   setTextCity('');
//   setEditCity(false);
//   if (currentId && currentCityId) {
//     const payload = {
//       id: currentCityId,
//       postIndex: null,
//       countryId: currentId,
//       countryName: countryInModalWindow,
//       cityName: textCity.trim(),
//       visibility: true,
//     };
//     await dispatch(requestAddEditedCity(payload));
//   }

//   await dispatch(requestLocationCity());
// };