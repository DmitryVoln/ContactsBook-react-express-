import { User } from "../../pages/userContacts/user.types";
import { newUser } from "pages/login/login.types";

// export interface AuthData {
//   login: string;
//   password: string;
// }

// export interface AuthState {
//   authData: { userId: number; token: string };
//   isLoadind: boolean;
//   error: string;
// }

export interface AuthData {
  login: string;
  password: string;
}

export interface AuthState {
  authData: { userId: number; token: string };
  isLoadind: boolean;
  error: string;
}

export interface Contact {
  id: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  adress?: string;
}

export interface ContactsState {
  user: newUser;
  isLoadind: boolean;
  error: string;
}

export interface CreateUserState {
  userData: newUser;
  isLoadind: boolean;
  error: string;
}
