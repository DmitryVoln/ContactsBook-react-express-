import { User } from "./user";

export interface Contact {
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