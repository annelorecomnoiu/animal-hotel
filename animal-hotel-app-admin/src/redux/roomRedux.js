import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name: "room",
    initialState:{
        rooms : [],
        isFetching: false,
        error: false
    },
    reducers:{
        //GET ALL
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

        //DELETE ROOMS
        deleteRoomStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        deleteRoomSuccess:(state, action) => {
            state.isFetching = false
            state.rooms.splice(
                state.rooms.findIndex(item => item._id === action.payload), 
                1 
            );
        },
        deleteRoomFailure:(state) => {
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


        //ADD ROOM
        addRoomStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        addRoomSuccess:(state, action) => {
            state.isFetching = false
            state.rooms.push(action.payload);
        },
        addRoomFailure:(state) => {
            state.isFetching = false
            state.error = true;
        },  
    },
});

export const { getRoomStart, getRoomSuccess, getRoomFailure,
    deleteRoomStart, deleteRoomSuccess, deleteRoomFailure,
    updateRoomStart, updateRoomSuccess, updateRoomFailure,
    addRoomStart, addRoomSuccess, addRoomFailure } = roomSlice.actions;

export default roomSlice.reducer;