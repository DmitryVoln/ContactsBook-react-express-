import { AppDispatch } from "redux/store";
import { contactsSlice } from "./contactsSlice";
import { Contact } from "interfaces/contacts";

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

export const requestAddContact = (payload: Contact, userId: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(contactsSlice.actions.contactsFetching());
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          method: 'POST',
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

// export const requestAddEditedCity = createAsyncThunk(
//   'locationCity/update',
//   async (payload: ILocationCityData, thunkApi) => {
//     await makeRequest(thunkApi.dispatch, `${BASE_URL}/location/city/${payload.id}?lang=ru`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     });
//   },
// );