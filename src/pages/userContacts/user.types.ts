import { AuthData } from "../../interfaces/auth";
import { Contact } from "../../interfaces/contacts";

export interface User extends AuthData {
  id: number;
  name: string;
  contacts: Contact[];
}
