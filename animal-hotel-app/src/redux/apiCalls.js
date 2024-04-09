import { publicRequest, userRequest} from "../requestMethods";
import { 
         loginSuccess, loginFailure, loginStart, 
         logoutSuccess, logoutFailure, logoutStart, 
         registerStart, registerSuccess, registerFailure
        } from "./userRedux";
import {
       createCartStart, createCartSuccess, createCartFailure,
       getCartStart, getCartSuccess, getCartFailure,
       updateCartStart, updateCartSuccess, updateCartFailure, updateCartFromDatabase
} from "./cartRedux";
import{
       addReservationStart, addReservationSuccess, addReservationFailure
} from "./reservationRedux";

import {
  getRoomStart, getRoomSuccess, getRoomFailure, updateRoomStart, updateRoomSuccess, updateRoomFailure
} from "./roomRedux";

import {
  getFoodStart, getFoodSuccess, getFoodFailure
} from "./foodRedux";

import {
  getServiceStart, getServiceSuccess, getServiceFailure
} from "./serviceRedux";

localStorage.getItem('isCartUpdated');

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login", user);
        localStorage.setItem('isCartUpdated', 'false');
        localStorage.setItem('persist:root', res.data);
        dispatch(loginSuccess(res.data));
    }catch(err){
        dispatch(loginFailure());
    }
};

export const register = async (dispatch, user) => {
    dispatch(registerStart());
    try {
      const res = await publicRequest.post("/auth/register", user);
      localStorage.setItem('isCartUpdated', 'false');
      await new Promise((resolve) => {
        localStorage.setItem('persist:root', res.data);
        resolve();
    });
      dispatch(registerSuccess(res.data));
      const Cart = await Cart.create({ user: user._id });
     
    } catch (err) {
      console.log(err)
      dispatch(registerFailure());
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

  export const createCart = async (dispatch, userID) => {
    dispatch(createCartStart());
    try {
      const res = await userRequest.post("/carts", { userID });
      dispatch(createCartSuccess(res.data));
    } catch (err) {
      console.log(err);
      dispatch(createCartFailure());
    }
  };

  export const getCart = (userId) => async (dispatch) => {
    dispatch(getCartStart());
    try {
      let userData = localStorage.getItem('persist:root');
      const res = await userRequest.get(`/carts/find/${userId}`);
      localStorage.setItem('cart', JSON.stringify(res.data));
      let cartData=localStorage.getItem('cart');
      dispatch(getCartSuccess(res.data));
      if (localStorage.getItem('isCartUpdated') === 'false') {
        dispatch(updateCartFromDatabase(cartData));
        localStorage.setItem('isCartUpdated', 'true');
      }
    } catch (err) {
      console.log(err);
      dispatch(getCartFailure());
    }
  };

  export const updateCart = async (dispatch, cartData) => {
    dispatch(updateCartStart());
    try {
      const res = await userRequest.put(`/carts/${cartData._id}`, cartData);
      dispatch(updateCartSuccess(res.data));
    } catch (err) {
      console.log(err);
      dispatch(updateCartFailure());
    }
  };


  export const getRoom = (roomId) => async (dispatch) => {
    dispatch(getRoomStart());
    try{
      const res = await publicRequest.get("/rooms/find/"+roomId);
      dispatch(getRoomSuccess(res.data));
      return res.data;
    } catch (err) {
      console.log(err);
      dispatch(getRoomFailure());
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

  export const getFood = (foodId) => async (dispatch) => {
    dispatch(getFoodStart());
    try{
      const res = await publicRequest.get("/foods/find/"+foodId);
      dispatch(getFoodSuccess(res.data));
      return res.data;
    } catch (err) {
      console.log(err);
      dispatch(getFoodFailure());
    }
  };

  export const getService = (serviceId) => async (dispatch) => {
    dispatch(getServiceStart());
    try{
      const res = await publicRequest.get("/services/find/"+serviceId);
      dispatch(getServiceSuccess(res.data));
      return res.data;
    } catch (err) {
      console.log(err);
      dispatch(getServiceFailure());
    }
  };

 

  export const addReservation = async (dispatch, reservation) => {
    dispatch(addReservationStart());
    try {
      const res = await userRequest.post("/reservations", reservation);
      dispatch(addReservationSuccess(res.data)); 
    } catch (err) {
      console.log(err)
      dispatch(addReservationFailure());
    }
  };