import { Contact } from "interfaces/contacts";

export const filterer = (searchField: string) => ({
    firstName,
    lastName,
    adress,
    phoneNumber,
  }: Contact) => {
    if (firstName) {
      if (firstName.toLowerCase().includes(searchField.toLowerCase()))
        return true;
    }
    if (lastName) {
      if (lastName.toLowerCase().includes(searchField.toLowerCase()))
        return true;
    }
    if (adress) {
      if (adress.toLowerCase().includes(searchField.toLowerCase())) return true;
    }
    if (phoneNumber) {
      if (phoneNumber.includes(searchField)) return true;
    }
    return false;
  };