import { AuthState } from "interfaces/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateUserState } from "./slices.types";

const initialState: CreateUserState = {
  userData: {
    login: "",
    name: "",
    password: "",
  },
  isLoadind: false,
  error: "",
};

export const createUserSlice = createSlice({
  name: "createUser",
  initialState,
  reducers: {
    creatingUserFetching(state) {
      state.isLoadind = true;
    },
    creatingUserFetchingSuccess(state, action: PayloadAction<CreateUserState["userData"]>) {
      state.userData = action.payload;
      state.isLoadind = false;
      state.error = "";
    },
    creatingUserFetchingError(state, action: PayloadAction<string>) {
      state.isLoadind = false;
      state.error = action.payload;
    },
  },
});

export default createUserSlice.reducer;
