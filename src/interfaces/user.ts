import { Contact } from "./contacts";

export interface User {
  id?: number;
  login: string;
  name: string;
  password: string;
  contacts: Contact[];
}
