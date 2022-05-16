import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from './reducers/contactsSlice';
import authReduser from './reducers/authSlice';

export const store = configureStore({
  reducer: {
    userReducer: contactsReducer,
    authReducer: authReduser
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch