import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState:{
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
            state.currentUser = action.payload;

        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.currentUser = null;
            state.error = action.payload;
        },

        getUserStart:(state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUserSuccess:(state, action)=>{
            state.isFetching = false;
            state.users= action.payload

        },
        getUserFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },


        deleteUserStart:(state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteUserSuccess:(state, action)=>{
            state.isFetching = false;
            state.users.splice(
                state.users.findIndex( (item) => item._id === action.payload),
                 1
                );
        },
        deleteUserFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
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
    getUserStart, getUserSuccess, getUserFailure,
    deleteUserStart, deleteUserSuccess, deleteUserFailure,
    logoutStart, logoutSuccess, logoutFailure } = userSlice.actions;
export default userSlice.reducer;