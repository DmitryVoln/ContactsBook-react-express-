import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from './reducers/contactsSlice'

export const store = configureStore({
  reducer: {
    userReducer: contactsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch