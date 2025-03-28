import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../config/axiosConfig";

// Action pour récupérer les données météo
export const fetchWeather = createAsyncThunk("weather/fetchWeather", async () => {
  try {
    const response = await axiosConfig.get("/forcast");
    console.log("Réponse API:", response.data);
    
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données météo :", error);
  }
});

const initialState={ forecast: [], status: "idle", error: null };

const WeatherSlice = createSlice({
  name: "weather",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.forecast = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default WeatherSlice.reducer;
