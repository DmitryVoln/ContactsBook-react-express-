import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import classNames from "classnames/bind";
import Input from "components/input/input";
import Button from "components/button/button";

import styles from "./inputsFormik.module.scss";

const cx = classNames.bind(styles);

export interface IInputsFormik {
    onSubmit(vaue: FormikValues): Promise<void>;

}

const yupschema = Yup.object().shape({
  firstName: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я-\s"]+$/iu,
      'В названии должны быть только буквы, символы: "-" "пробелы"'
    )
    .max(125)
    .required("Введите фамилию"),
  lastName: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я-\s"]+$/iu,
      'В названии должны быть только буквы, символы: "-" "пробелы"'
    )
    .max(125)
    .required("Введите имя"),
  phoneNumber: Yup.string()
    .matches(
      /^\+[0-9]+$/iu,
      "введите номер цифрами в верном формате: х-ххх-ххх-хх-хх"
    )
    .required("Введите номер телефона"),
  adress: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я0-9-,."\s]+$/iu,
      'В названии должны быть только буквы, цифры, символы: "-" "," "." "пробелы"'
    )
    .max(125),
});

const InputsFormik = ({onSubmit}: IInputsFormik) => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        phoneNumber: "",
        adress: "",
      }}
      validationSchema={yupschema}
      onSubmit={onSubmit}
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
              errorMessage={
                (touched.firstName && errors.firstName) || undefined
              }
            />
            <Input
              placeholder="Имя"
              inputValue={values.lastName}
              onChange={(value) => {
                setFieldValue("lastName", value);
              }}
              errorMessage={(touched.lastName && errors.lastName) || undefined}
            />
            <Input
              placeholder="номер телефона"
              inputValue={values.phoneNumber}
              onChange={(value) => {
                setFieldValue("phoneNumber", value);
              }}
              errorMessage={
                (touched.phoneNumber && errors.phoneNumber) || undefined
              }
            />
            <Input
              placeholder="Адрес"
              inputValue={values.adress}
              onChange={(value) => {
                setFieldValue("adress", value);
              }}
            />
            <Button
              children={"Сохранить контакт"}
              onClick={handleSubmit}
              className={"btnbig"}
            />
          </div>
        );
      }}
    </Formik>
  );
};

export default InputsFormik;