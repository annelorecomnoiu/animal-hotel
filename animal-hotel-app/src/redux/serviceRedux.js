import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
    name: "service",
    initialState:{
        services : [],
        isFetching: false,
        error: false
    },
    reducers:{
        //GET SERVICE
        getServiceStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        getServiceSuccess:(state, action) => {
            state.isFetching = false
            state.services = action.payload;
        },
        getServiceFailure:(state) => {
            state.isFetching = false
            state.error = true;
        },

        
    },
});

export const { getServiceStart, getServiceSuccess, getServiceFailure } = serviceSlice.actions;

export default serviceSlice.reducer;