import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
    name: "service",
    initialState:{
        services : [],
        isFetching: false,
        error: false
    },
    reducers:{
        //GET ALL
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

        //DELETE SERVICE
        deleteServiceStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        deleteServiceSuccess:(state, action) => {
            state.isFetching = false
            state.services.splice(
                state.services.findIndex(item => item._id === action.payload), 
                1 
            );
        },
        deleteServiceFailure:(state) => {
            state.isFetching = false
            state.error = true;
        },


         //UPDATE SERVICE
        updateServiceStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        updateServiceSuccess:(state, action) => {
            state.isFetching = false
            state.services[state.services.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.service;
        },
        updateServiceFailure:(state) => {
            state.isFetching = false
            state.error = true;
        },


        //ADD SERVICE
        addServiceStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        addServiceSuccess:(state, action) => {
            state.isFetching = false
            state.services.push(action.payload);
        },
        addServiceFailure:(state) => {
            state.isFetching = false
            state.error = true;
        },
        
        
    },
});

export const { getServiceStart, getServiceSuccess, getServiceFailure,
    deleteServiceStart, deleteServiceSuccess, deleteServiceFailure,
    updateServiceStart, updateServiceSuccess, updateServiceFailure,
    addServiceStart, addServiceSuccess, addServiceFailure } = serviceSlice.actions;

export default serviceSlice.reducer;