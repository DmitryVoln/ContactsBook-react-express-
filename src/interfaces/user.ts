import { AuthData } from "./auth";
import { Contact } from "./contacts";

export interface User extends AuthData {
  id: number;
  name: string;
  contacts: Contact[];
}
