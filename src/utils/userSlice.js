import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        // Reducers displatch an action, which will alter state
        // Reducers must mutate the state or return new state
        // Initial state is null, when addUser is called, action.payload wil be stored in initialState
        addUser: (state, action) => {
            return action.payload
        },
        // when removeUser is called, then to make state as null, we are returning null
        removeuser: (state, action) => {
            return null
        }
    }
})

export const {addUser, removeuser} = userSlice.actions
export default userSlice.reducer;