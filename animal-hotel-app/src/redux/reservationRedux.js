import { createSlice } from "@reduxjs/toolkit";

const reservationSlice = createSlice({
    name: "user",
    initialState:{
        rooms: [],
        foods: [],
        services: [],
        reservation : null,
        isFetching: false,
        error: false
    },
    reducers:{

        addReservationStart: (state) => {
            state.isFetching = true;
            state.errStatus = false;
        },
        addReservationSuccess: (state, action) => {
            state.isFetching = false;
            state.reservation = action.payload;
            state.errStatus = false;
        },
        addReservationFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            //state.errStatus = action.payload;
        },
    },
});

export const { addReservationStart, addReservationSuccess, addReservationFailure,
               getReservationStart, getReservationSuccess, getReservationFailure } = reservationSlice.actions;
export default reservationSlice.reducer;