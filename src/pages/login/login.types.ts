import { AuthData } from "redux/reducers/slices.types";

export interface newUser extends AuthData {
    name: string;
}