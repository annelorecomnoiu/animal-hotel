import { createSlice } from "@reduxjs/toolkit";
import { getRoom, getFood, getService, updateRoom } from "./apiCalls";
const moment = require('moment');
let cartData = JSON.parse(localStorage.getItem('cart'));

export const addDatesToRoom = (cartData) => async (dispatch) => {
  cartData = localStorage.getItem('cart');
  if (JSON.parse(cartData).rooms && JSON.parse(cartData).rooms.length>0) {
    const res = await dispatch(getRoom(JSON.parse(cartData).rooms[0]._id));

    const storedStartDate = localStorage.getItem('startDate');
    const storedEndDate = localStorage.getItem('endDate');

    const formattedStartDate = new Date(storedStartDate).toISOString();
    const formattedEndDate = new Date(storedEndDate).toISOString();

    res.availability.push([formattedStartDate, formattedEndDate]);
    const newRoom = res;
    updateRoom(newRoom._id, newRoom, dispatch);
  }
};

export const updateCartFromDatabase = (cartData) => async (dispatch) => {
    cartData = localStorage.getItem('cart');
    console.log(cartData);
    console.log("AM INTRAT IN UPDATE ");
    if (cartData) {
      //DATES
      const startDate = JSON.parse(cartData).startDate;
      const endDate = JSON.parse(cartData).endDate;
      const nrOfDays = JSON.parse(cartData).nrOfDays;
      let nrOfPets = 1;
      if(JSON.parse(cartData).rooms && JSON.parse(cartData).rooms.length>0)
      {
        nrOfPets = JSON.parse(cartData).rooms[0].nrOfPets;
      }
      if( startDate && endDate && nrOfDays){
        dispatch(addDatesFromDB({ startDate, endDate, nrOfDays, nrOfPets }));
      }
      console.log("DATES ");

      //ROOMS
      const roomsData = JSON.parse(cartData).rooms;
      if (roomsData[0]) {
        const res = await dispatch(getRoom(roomsData[0]._id));
        dispatch(addRoomFromDB([res]));
      }
      console.log("ROOMS ");

      //FOODS
      const foodsData = JSON.parse(cartData).foods;
      foodsData.forEach(async (food) => {
        if (food) {
          const res = await dispatch(getFood(food._id));
          dispatch(addFoodFromDB([res]));
        }
      });
      console.log("FOODS");

      //SERVICES
      const servicesData = JSON.parse(cartData).services;
      servicesData.forEach(async (service) => {
        if (service) {
          const res = await dispatch(getService(service._id));
          dispatch(addServiceFromDB({res: [res], nrOfServices: service.nrOfServices}));
        }
      });
      console.log("SERVICES ");

    }
  };

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        userId: null,
        rooms: [],
        foods: [],
        services: [],
        quantity: 0,
        total: 0,
        startDate: moment().format("MM/DD/YYYY"),
        endDate: moment().format("MM/DD/YYYY"),
        nrOfDays: 0,
        nrOfPets: 1,
    },
    reducers:{

        //GET CART
        getCartStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        getCartSuccess:(state, action) => {
            state.isFetching = false
            state.cart = action.payload;
            state.error = false;
        },
        getCartFailure:(state) => {
            state.isFetching = false
            state.error = true;
        },

        // CREATE CART
        createCartStart: (state) => {
            state.isFetching = true;
            state.errStatus = false;
        },
        createCartSuccess: (state, action) => {
          state.isFetching = false;
          state.currentCart = action.payload;
          state.errStatus = false;
          state.userId = action.payload._id;
          state.rooms = [];
          state.foods = [];
          state.services = [];
          state.total = 0;
          state.quantity = 0;
          state.startDate = moment().format("MM/DD/YYYY");
          state.endDate = moment().format("MM/DD/YYYY");
          state.nrOfDays = 0;
      },
        createCartFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //UPDATE CART
        updateCartStart: (state) => {
            return {
              ...state,
              isFetching: true,
              error: false,
            };
          },
          updateCartSuccess: (state, action) => {
            return {
              ...state,
              isFetching: false,
              cartData : action.payload,
              error: false,
            };
          },
          updateCartFailure: (state) => {
            return {
              ...state,
              isFetching: false,
              error: true,
            };
          },
        
        setCartEmpty: (state) => {
            state.rooms = [];
            state.foods = [];
            state.services = [];
            state.quantity = 0;
            state.total = 0;
            state.startDate = moment().format("MM/DD/YYYY");
            state.endDate = moment().format("MM/DD/YYYY");
            state.nrOfDays = 1;
            state.nrOfPets = 1;

            const updateCartData = async () => {
              const parsedCartData = JSON.parse(localStorage.getItem('cart'));
              if(parsedCartData){
                parsedCartData.rooms = state.rooms;
                parsedCartData.foods = state.foods;
                parsedCartData.services = state.services;
                parsedCartData.total = state.total;
                parsedCartData.startDate = state.startDate;
                parsedCartData.endDate = state.endDate;
                parsedCartData.nrOfDays = state.nrOfDays;
                parsedCartData.nrOfPets = state.nrOfPets;
              localStorage.setItem('cart', JSON.stringify(parsedCartData));
              } 
            };
            updateCartData();
            let cart = localStorage.getItem('cart');
        },

        addDatesFromDB: (state, action) =>{
          state.quantity = 0;
          state.total = 0;
          const { startDate, endDate, nrOfDays, nrOfPets } = action.payload;
          state.startDate = startDate;
          state.endDate = endDate;
          state.nrOfDays = nrOfDays;
          state.nrOfPets = nrOfPets;
      },

        addRoomFromDB: (state, action) =>{
            const price = action.payload[0].price;
            state.rooms = [];
            state.rooms.push(action.payload[0]);
            state.total += price * state.nrOfDays;
            state.quantity +=1;      
        },

        addFoodFromDB: (state, action) =>{
            const price = action.payload[0].price;
            if(typeof state.foods === 'undefined' || state.foods.length === 0){
              state.foods = [];
            }
            state.foods.push(action.payload[0]);
            state.total += price * state.nrOfDays * state.nrOfPets;
            state.quantity +=1;   
        },

        addServiceFromDB: (state, action) =>{
          const { res, nrOfServices } = action.payload;
          res[0].nrOfServices = nrOfServices;
            const price = res[0]?.price * nrOfServices * state.nrOfPets;
            if(typeof state.services === 'undefined' || state.services.length === 0){
              state.services = [];
            }
            state.services.push(res[0]);
            state.total += price;
            state.quantity +=1;            
        },

        addRoom: (state, action) => {
          const storedStartDate = localStorage.getItem('startDate');
          const storedEndDate = localStorage.getItem('endDate');

          const formattedStart = moment(storedStartDate).format("DD/MM/YYYY");
          const formattedEnd = moment(storedEndDate).format("DD/MM/YYYY");

          const startDate = moment(storedStartDate).toDate();
          const endDate = moment(storedEndDate).toDate();

          const timeDiff = endDate.getTime() - startDate.getTime();
          const numberOfDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;

          state.startDate = formattedStart;
          state.endDate = formattedEnd;


          if(typeof state.rooms === 'undefined' || state.rooms.length === 0){
            state.rooms = [];
            state.rooms.push(action.payload);
            state.quantity += 1;
          } else {
            state.total -= state.rooms[0].price * state.nrOfDays;
            state.rooms[0] = action.payload; 
          }
          state.nrOfDays = numberOfDays; 
          const categories = action.payload.categories;
          const number = categories.find((element) => /^\d+$/.test(element));
          if(categories.length === 3){
            state.nrOfPets = number ? parseInt(number)/2 : 1;
          } else {
            state.nrOfPets = number ? parseInt(number) : 1;
          }
          state.total += action.payload.price * state.nrOfDays;
          
            const updateCartData = async () => {
              let parsedCartData = JSON.parse(localStorage.getItem('cart'));
              // while(!parsedCartData){
              //   await new Promise((resolve) => setTimeout(resolve, 1000));
              //   parsedCartData = JSON.parse(localStorage.getItem('cart'));
              // }
              if (!parsedCartData?.rooms) {
                parsedCartData.rooms = [action.payload];
              } else {
                parsedCartData.rooms[0] = action.payload;
              }
              parsedCartData.rooms[0].nrOfPets = state.nrOfPets;
              parsedCartData.rooms[0].categories = action.payload.categories;
              if(parsedCartData.foods.length > 0){
                parsedCartData.foods.forEach(food => {
                  if(!food.categories.some(category => parsedCartData.rooms[0].categories.includes(category))){
                      food.categoryMatch = false;
                  } else {
                    food.categoryMatch = true;
                  }
                });
              }
              if(parsedCartData.services.length > 0){
                parsedCartData.services.forEach(service => {
                  if(!service.categories.some(category => parsedCartData.rooms[0].categories.includes(category))){
                    service.categoryMatch = false;
                  } else {
                    service.categoryMatch = true;
                  }
                });
              }
              parsedCartData.total = state.total;
              parsedCartData.startDate = state.startDate;
              parsedCartData.endDate = state.endDate;
              parsedCartData.nrOfDays = state.nrOfDays;
              localStorage.setItem('cart', JSON.stringify(parsedCartData));
            };
            updateCartData();
          },

        addFood: async (state, action) => {
            state.quantity += 1;
            if(typeof state.foods === 'undefined' || state.foods.length === 0){
                state.foods = [];
            }
            state.foods.push(action.payload);
            state.total += action.payload.price * state.nrOfDays * state.nrOfPets;
            const updateCartData = async () => {
              const parsedCartData = JSON.parse(localStorage.getItem('cart'));
              parsedCartData.foods.push(action.payload);
              const length = parsedCartData.foods.length;
              parsedCartData.foods[length-1].categories = action.payload.categories;
              parsedCartData.foods[length-1].categoryMatch = true;
              if(parsedCartData.rooms.length > 0 ){
                if(!parsedCartData.foods[length - 1].categories.some(category => parsedCartData.rooms[0].categories.includes(category))){
                  parsedCartData.foods[length-1].categoryMatch = false;
                }
              }
              parsedCartData.total = state.total;
              localStorage.setItem('cart', JSON.stringify(parsedCartData));
            };
            await updateCartData();
          },

          addService: (state, action) => {
            state.quantity += 1;
            if(typeof state.services === 'undefined' || state.services.length === 0){
              state.services = [];
            }
            state.services.push(action.payload);
            state.total += action.payload.price * action.payload.nrOfServices * state.nrOfPets ;
            const nrOfServices = action.payload.nrOfServices;
          
            const updateCartData = async () => {
              const parsedCartData = JSON.parse(localStorage.getItem('cart'));
              parsedCartData.services.push({ nrOfServices, _id: action.payload._id });
              const length = parsedCartData.services.length;
              parsedCartData.services[length-1].categories = action.payload.categories;
              parsedCartData.services[length-1].categoryMatch = true;
              if(parsedCartData.rooms.length > 0 ){
                if(!parsedCartData.services[length - 1].categories.some(category => parsedCartData.rooms[0].categories.includes(category))){
                  parsedCartData.services[length-1].categoryMatch = false;
                }
              }
              parsedCartData.total = state.total;
              localStorage.setItem('cart', JSON.stringify(parsedCartData));
            };
            updateCartData();
          },

        deleteRoom: async (state, action) => {
            state.rooms = [];
            state.total -= action.payload.price;
            state.quantity -= 1;
            state.nrOfPets = 1;
            if(state.total < 0 && state.quantity < 0){
                state.total = 0;
                state.quantity = 0;
            }
            cartData = JSON.parse(localStorage.getItem('cart'));
            if (cartData && cartData.rooms && cartData.rooms.length > 0) {
                cartData.rooms.shift();
                cartData.total = state.total;
                localStorage.setItem('cart', JSON.stringify(cartData));
                await new Promise((resolve) => setTimeout(resolve, 1500));
                cartData = JSON.parse(localStorage.getItem('cart')); 
            } 
        },

        deleteFood: async (state, action) => {
          const foodId = action.payload._id;
          const foodIndex = state.foods.findIndex((food) => food._id === foodId);
          if (foodIndex !== -1) {
              const deletedFood = state.foods[foodIndex];
              state.total -= deletedFood.price*state.nrOfDays*state.nrOfPets;
              state.quantity -= 1;
              if(state.total < 0 && state.quantity < 0){
                  state.total = 0;
                  state.quantity = 0;
              }
              state.foods.splice(foodIndex, 1);
              cartData = JSON.parse(localStorage.getItem('cart'));
              while (cartData === null) {
                  await new Promise((resolve) => setTimeout(resolve, 100));
                  cartData = JSON.parse(localStorage.getItem('cart'));
                }
              if (cartData && cartData.foods && cartData.foods.length > 0) {
                  const foodIndexInCart = cartData.foods.findIndex((food) => 
                    food._id === foodId);
                  if (foodIndexInCart !== -1) {
                    cartData.foods.splice(foodIndexInCart, 1);
                    cartData.total = state.total;
                    localStorage.setItem('cart', JSON.stringify(cartData));
                  }
                }
          }
        },

        deleteService: async (state, action) => {
            const serviceId = action.payload._id;
            const serviceIndex = state.services.findIndex((service) => service._id === serviceId);
            if (serviceIndex !== -1) {
                const deletedService = state.services[serviceIndex];
                state.total -= deletedService.price * deletedService.nrOfServices * deletedService.nrOfPets;
                state.quantity -= 1;
                if(state.total < 0 && state.quantity < 0){
                    state.total = 0;
                    state.quantity = 0;
                }
                state.services.splice(serviceIndex, 1);
                cartData = JSON.parse(localStorage.getItem('cart'));
                while (cartData === null) {
                    await new Promise((resolve) => setTimeout(resolve, 100));
                    cartData = JSON.parse(localStorage.getItem('cart'));
                  }
                if (cartData && cartData.services && cartData.services.length > 0) {
                    const serviceIndexInCart = cartData.services.findIndex((service) => 
                        service._id === serviceId);
                    if (serviceIndexInCart !== -1) {
                      cartData.services.splice(serviceIndexInCart, 1);
                      cartData.total = state.total;
                      localStorage.setItem('cart', JSON.stringify(cartData));
                      await new Promise((resolve) => setTimeout(resolve, 1500));
                      cartData = JSON.parse(localStorage.getItem('cart')); 
                    }
                  }
            }   
        },

        updateService: async (state, action) => {
          const serviceId = action.payload.service._id;
          const type = action.payload.type;
          let cartData = JSON.parse(localStorage.getItem('cart'));
        
          if (cartData && cartData.services && cartData.services.length > 0) {
            const serviceIndex = cartData.services.findIndex((service) => service._id === serviceId);
            
            if (serviceIndex !== -1) {
              let updatedServices = [...cartData.services];
              let service = updatedServices[serviceIndex];
              
              let nrOfServices = service.nrOfServices;
              if (type === "inc") {
                nrOfServices += 1;
              } else if (type === "dec" && nrOfServices > 1) {
                nrOfServices -= 1;
              }
              
              service = { ...service, nrOfServices };
              updatedServices[serviceIndex] = service;
              
              cartData = { ...cartData, services: updatedServices };
              localStorage.setItem("cart", JSON.stringify(cartData));
            }
          }
        },
    },
});

export const { addRoom, addFood, addService,
               deleteRoom, deleteFood, deleteService,
               updateService, loadCart, createNewCart,
               createCartStart, createCartSuccess, createCartFailure,
               getCartStart, getCartSuccess, getCartFailure,
               updateCartStart, updateCartSuccess, updateCartFailure,
               setCartEmpty, addRoomFromDB, addFoodFromDB, addServiceFromDB,
               addDatesFromDB
            } = cartSlice.actions;
export default cartSlice.reducer;