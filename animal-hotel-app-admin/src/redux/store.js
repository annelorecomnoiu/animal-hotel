import { configureStore, getDefaultMiddleware, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import roomReducer from "./roomRedux";
import foodReducer from "./foodRedux";
import serviceReducer from "./serviceRedux";
import reservationReducer from "./reservationRedux";
import { persistStore, persistReducer, PERSIST, PURGE, REGISTER, PAUSE, REHYDRATE, FLUSH } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({ 
  user:userReducer, 
  room:roomReducer, 
  food:foodReducer,
  service: serviceReducer,
  reservation: reservationReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

