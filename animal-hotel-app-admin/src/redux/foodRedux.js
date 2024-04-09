import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
    name: "food",
    initialState:{
        foods : [],
        isFetching: false,
        error: false
    },
    reducers:{
        //GET ALL
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

        //DELETE FOODS
        deleteFoodStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        deleteFoodSuccess:(state, action) => {
            state.isFetching = false
            state.foods.splice(
                state.foods.findIndex(item => item._id === action.payload), 
                1 
            );
        },
        deleteFoodFailure:(state) => {
            state.isFetching = false
            state.error = true;
        },


         //UPDATE FOOD
        updateFoodStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        updateFoodSuccess:(state, action) => {
            state.isFetching = false
            state.foods[state.foods.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.food;
        },
        updateFoodFailure:(state) => {
            state.isFetching = false
            state.error = true;
        },


        //ADD FOOD
        addFoodStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        addFoodSuccess:(state, action) => {
            state.isFetching = false
            state.foods.push(action.payload);
        },
        addFoodFailure:(state) => {
            state.isFetching = false
            state.error = true;
        },
        
        
    },
});

export const { getFoodStart, getFoodSuccess, getFoodFailure,
    deleteFoodStart, deleteFoodSuccess, deleteFoodFailure,
    updateFoodStart, updateFoodSuccess, updateFoodFailure,
    addFoodStart, addFoodSuccess, addFoodFailure } = foodSlice.actions;

export default foodSlice.reducer;