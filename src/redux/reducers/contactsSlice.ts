import { ContactsState } from "interfaces/contacts";
import { User } from "interfaces/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ContactsState = {
    user: {id: NaN, login: '', name: '', password: '', contacts: []},
    isLoadind: false,
    error: ''
}

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        contactsFetching(state) {
            state.isLoadind = true;
        },
        contactsFetchingSuccess(state, action: PayloadAction<User>) {
            state.user = {...state.user, ...action.payload};
            state.isLoadind = false;
            state.error = ''
         },
         contactsFetchingError(state, action: PayloadAction<string>) {
            state.isLoadind = false;
            state.error = action.payload
         },
         contactsAdding(state) {
            state.isLoadind = true;
        },
        contactsAddingSuccess(state, action: PayloadAction<User>) {
            state.user = {...state.user, ...action.payload};
            state.isLoadind = false;
            state.error = ''
         },
         contactsAddingError(state, action: PayloadAction<string>) {
            state.isLoadind = false;
            state.error = action.payload
         },

    }
})

export default contactsSlice.reducer;