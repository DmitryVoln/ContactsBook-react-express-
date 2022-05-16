import { AuthData, AuthState } from "interfaces/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  authData: {
    userId: NaN,
    token: "",
  },
  isLoadind: false,
  error: "",
};

export const authSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    authFetching(state) {
      state.isLoadind = true;
    },
    authFetchingSuccess(state, action: PayloadAction<AuthState["authData"]>) {
      state.authData = action.payload;
      state.isLoadind = false;
      state.error = "";
    },
    authFetchingError(state, action: PayloadAction<string>) {
      state.isLoadind = false;
      state.error = action.payload;
    },
    logout() {
      return initialState;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
