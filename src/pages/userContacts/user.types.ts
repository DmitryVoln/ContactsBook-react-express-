import { AuthData } from "redux/reducers/slices.types";

export interface Contact {
  id: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  adress?: string;
}

export interface ContactsState {
  user: User;
  isLoadind: boolean;
  error: string;
}

export interface User extends AuthData {
  id: number;
  name: string;
  contacts: Contact[];
}


