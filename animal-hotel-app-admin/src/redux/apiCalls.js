import { publicRequest, userRequest } from "../requestMethods";

import { addRoomFailure, addRoomStart, addRoomSuccess,
         deleteRoomFailure, deleteRoomStart, deleteRoomSuccess,
         getRoomFailure, getRoomStart, getRoomSuccess,
         updateRoomFailure, updateRoomStart, updateRoomSuccess } from "./roomRedux";

import { addFoodFailure, addFoodStart, addFoodSuccess,
         deleteFoodFailure, deleteFoodStart, deleteFoodSuccess,
         getFoodFailure, getFoodStart, getFoodSuccess,
         updateFoodFailure, updateFoodStart, updateFoodSuccess } from "./foodRedux";

import { addServiceFailure, addServiceStart, addServiceSuccess,
         deleteServiceFailure, deleteServiceStart, deleteServiceSuccess,
         getServiceFailure, getServiceStart, getServiceSuccess,
         updateServiceFailure, updateServiceStart, updateServiceSuccess } from "./serviceRedux";

import { loginSuccess, loginFailure, loginStart,
         getUserStart, getUserSuccess, getUserFailure, 
         deleteUserFailure, deleteUserStart, deleteUserSuccess, 
         logoutFailure, logoutStart, logoutSuccess } from "./userRedux";

import { getReservationStart, getReservationSuccess, getReservationFailure,
         deleteReservationStart, deleteReservationSuccess, deleteReservationFailure } from "./reservationRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    }catch(err){
      if (err.response && err.response.status === 401) {
        throw new Error("Wrong username/password");
      }
        dispatch(loginFailure());
    }
};

export const getRooms = async (dispatch) => {
    dispatch(getRoomStart());
    try{
        const res = await publicRequest.get("/rooms");
        dispatch(getRoomSuccess(res.data));
    }catch(err){
        dispatch(getRoomFailure());
    }
};

export const deleteRoom = async (id, dispatch) => {
    dispatch(deleteRoomStart());
    try{
        const res = await userRequest.delete(`/rooms/${id}`);
        dispatch(deleteRoomSuccess(id));
    }catch(err){
        dispatch(deleteRoomFailure());
    }
};

export const updateRoom = async (id, room, dispatch) => {
    dispatch(updateRoomStart());
    try{
        const res= await userRequest.put(`/rooms/${id}`, room);
        dispatch(updateRoomSuccess({id, room }));
    }catch(err){
        dispatch(updateRoomFailure());
    }
};

export const addRoom = async (room, dispatch) => {
    dispatch(addRoomStart());
    try{
        const res = await userRequest.post(`/rooms`, room);
        dispatch(addRoomSuccess(res.data));
    }catch(err){
        dispatch(addRoomFailure());
    }
};

export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
      const res = await userRequest.delete(`/users/${id}`);
      dispatch(deleteUserSuccess(id));
    } catch (err) {
      dispatch(deleteUserFailure());
    }
  };
  
  export const getUsers = async (dispatch) => {
    dispatch(getUserStart());
    try {
      const res = await userRequest.get("/users");
      dispatch(getUserSuccess(res.data));
    } catch (err) {
      dispatch(getUserFailure());
    }
  };
  
  export const logout = async (dispatch) => {
    dispatch(logoutStart());
    try {
      dispatch(logoutSuccess());
    } catch (err) {
      dispatch(logoutFailure());
    }
  };

  export const getFoods = async (dispatch) => {
    dispatch(getFoodStart());
    try{
        const res = await publicRequest.get("/foods");
        dispatch(getFoodSuccess(res.data));
    }catch(err){
        dispatch(getFoodFailure());
    }
};

export const getReservations = async (dispatch) => {
    dispatch(getReservationStart());
    try{
        const res = await userRequest.get("/reservations");
        dispatch(getReservationSuccess(res.data));
    }catch(err){
        dispatch(getReservationFailure());
    }
};

export const deleteReservation = async (id, dispatch) => {
    dispatch(deleteReservationStart());
    try{
        const res = await userRequest.delete(`/reservations/${id}`);
        dispatch(deleteReservationSuccess(id));
    }catch(err){
        dispatch(deleteReservationFailure());
    }
};

export const deleteFood = async (id, dispatch) => {
    dispatch(deleteFoodStart());
    try{
        const res = await userRequest.delete(`/foods/${id}`);
        dispatch(deleteFoodSuccess(id));
    }catch(err){
        dispatch(deleteFoodFailure());
    }
};

export const updateFood = async (id, food, dispatch) => {
    dispatch(updateFoodStart());
    try{
        const res= await userRequest.put(`/foods/${id}`, food);
        dispatch(updateFoodSuccess({id, food }));
    }catch(err){
        dispatch(updateFoodFailure());
    }
};

export const addFood = async (food, dispatch) => {
    dispatch(addFoodStart());
    try{
        const res = await userRequest.post(`/foods`, food);
        dispatch(addFoodSuccess(res.data));
    }catch(err){
        dispatch(addFoodFailure());
    }
};

export const getServices = async (dispatch) => {
    dispatch(getServiceStart());
    try{
        const res = await publicRequest.get("/services");
        dispatch(getServiceSuccess(res.data));
    }catch(err){
        dispatch(getServiceFailure());
    }
};

export const deleteService = async (id, dispatch) => {
    dispatch(deleteServiceStart());
    try{
        const res = await userRequest.delete(`/services/${id}`);
        dispatch(deleteServiceSuccess(id));
    }catch(err){
        dispatch(deleteServiceFailure());
    }
};

export const updateService = async (id, service, dispatch) => {
    dispatch(updateServiceStart());
    try{
        const res= await userRequest.put(`/services/${id}`, service);
        dispatch(updateServiceSuccess({id, service }));
    }catch(err){
        dispatch(updateServiceFailure());
    }
};

export const addService = async (service, dispatch) => {
    dispatch(addServiceStart());
    try{
        const res = await userRequest.post(`/services`, service);
        dispatch(addServiceSuccess(res.data));
    }catch(err){
        dispatch(addServiceFailure());
    }
};
