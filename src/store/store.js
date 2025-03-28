import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import { composeWithDevTools } from "redux-devtools-extension";


export const store = configureStore({
    reducer: {
      weather: weatherReducer,
    },
    devTools: process.env.NODE_ENV !== "production" ? composeWithDevTools() : false,
  });
  
  export const selectWeather = (state) => state.weather;
  export const dispatchWeather = store.dispatch;