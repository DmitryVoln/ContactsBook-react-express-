import { User } from "../pages/userContacts/user.types";

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