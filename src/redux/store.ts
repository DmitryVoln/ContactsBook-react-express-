import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from './reducers/contactsSlice';
import authReduser from './reducers/authSlice';
import createUserReducer from './reducers/createUserSlice';

export const store = configureStore({
  reducer: {
    userReducer: contactsReducer,
    authReducer: authReduser,
    createUserReducer: createUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch