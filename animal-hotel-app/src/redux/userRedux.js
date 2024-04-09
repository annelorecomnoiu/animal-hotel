import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        room: null,
        foods: [],
        services: [],
        currentUser : null,
        isFetching: false,
        error: false
    },
    reducers:{
        loginStart:(state) => {
            state.isFetching = true;
        },
        loginSuccess:(state, action)=>{
            state.isFetching = false;
            state.currentUser = action.payload

        },
        loginFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },

        registerStart: (state) => {
            state.isFetching = true;
            state.errStatus = false;
        },
        registerSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.errStatus = false;
        },
    
        registerFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            //state.errStatus = action.payload;
        },

        logoutStart: (state) => {
            state.isFetching = true;
        },
        logoutSuccess: (state) => {
            state.isFetching = false;
            state.currentUser = null;
        },
        logoutFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

    },
});

export const { loginStart, loginSuccess, loginFailure, 
    logoutStart, logoutSuccess, logoutFailure,
    registerStart, registerSuccess, registerFailure } = userSlice.actions;
export default userSlice.reducer;