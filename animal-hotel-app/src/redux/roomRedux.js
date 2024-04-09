import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name: "room",
    initialState:{
        rooms : [],
        isFetching: false,
        error: false
    },
    reducers:{
        //GET ROOM
        getRoomStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        getRoomSuccess:(state, action) => {
            state.isFetching = false
            state.rooms = action.payload;
        },
        getRoomFailure:(state) => {
            state.isFetching = false
            state.error = true;
        },

        //UPDATE ROOM
        updateRoomStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        updateRoomSuccess:(state, action) => {
            state.isFetching = false
            state.rooms[state.rooms.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.room;
        },
        updateRoomFailure:(state) => {
            state.isFetching = false
            state.error = true;
        },

        
    },
});

export const { getRoomStart, getRoomSuccess, getRoomFailure,
               updateRoomStart, updateRoomSuccess, updateRoomFailure } = roomSlice.actions;

export default roomSlice.reducer;