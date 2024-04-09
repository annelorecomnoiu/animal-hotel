import { createSlice } from "@reduxjs/toolkit";

const reservationSlice = createSlice({
    name: "reservation",
    initialState:{
        reservations : [],
        isFetching: false,
        error: false
    },
    reducers:{
        //GET ALL
        getReservationStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        getReservationSuccess:(state, action) => {
            state.isFetching = false
            state.reservations = action.payload;
        },
        getReservationFailure:(state) => {
            state.isFetching = false
            state.error = true;
        },

        //DELETE RESERVATIONS
        deleteReservationStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        deleteReservationSuccess:(state, action) => {
            state.isFetching = false
            state.reservations.splice(
                state.reservations.findIndex(item => item._id === action.payload), 
                1 
            );
        },
        deleteReservationFailure:(state) => {
            state.isFetching = false
            state.error = true;
        },
    },
});

export const { getReservationStart, getReservationSuccess, getReservationFailure,
    deleteReservationStart, deleteReservationSuccess, deleteReservationFailure } = reservationSlice.actions;

export default reservationSlice.reducer;