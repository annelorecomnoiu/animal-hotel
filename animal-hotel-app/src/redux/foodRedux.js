import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
    name: "food",
    initialState:{
        foods : [],
        isFetching: false,
        error: false
    },
    reducers:{
        //GET FOOD
        getFoodStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        getFoodSuccess:(state, action) => {
            state.isFetching = false
            state.foods = action.payload;
        },
        getFoodFailure:(state) => {
            state.isFetching = false
            state.error = true;
        },

        
    },
});

export const { getFoodStart, getFoodSuccess, getFoodFailure } = foodSlice.actions;

export default foodSlice.reducer;