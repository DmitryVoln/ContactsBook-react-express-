import { AppDispatch } from "redux/store";
import { contactsSlice } from "./contactsSlice";
import { authSlice } from "./authSlice";
import { User } from "interfaces/user";
import { AuthData } from "interfaces/auth";

export const requestContacts = (userId: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(contactsSlice.actions.contactsFetching());
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          method: 'GET',
    });
    const responseJSON = await response.json();
    dispatch(contactsSlice.actions.contactsFetchingSuccess(responseJSON))
  } catch (error) {
      if (error instanceof Error) {
        dispatch(contactsSlice.actions.contactsFetchingError(error.message))
        return;
      }
      console.log(error);
  }
};

export const requestAddContact = (payload: User) => async (dispatch: AppDispatch) => {
  try {
    dispatch(contactsSlice.actions.contactsAdding());
    const response = await fetch(`http://localhost:3001/users/${payload.id}`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          method: 'PUT',
          body: JSON.stringify(payload),
    });
    const responseJSON = await response.json();
    dispatch(contactsSlice.actions.contactsAddingSuccess(responseJSON))
  } catch (error) {
      if (error instanceof Error) {
        dispatch(contactsSlice.actions.contactsAddingError(error.message))
        return;
      }
      console.log(error);
  }
};

export const requestCheckAuth = (payload: AuthData) => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.authFetching());
    const response = await fetch(`http://localhost:3001/auth`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          method: 'POST',
          body: JSON.stringify(payload),
    });
    const responseJSON = await response.json();
    dispatch(authSlice.actions.authFetchingSuccess(responseJSON))
  } catch (error) {
      if (error instanceof Error) {
        dispatch(authSlice.actions.authFetchingError(error.message))
        return;
      }
      console.log(error);
  }
};