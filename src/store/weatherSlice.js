import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosConfig from '../config/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async () => {
    try {
      const response = await axiosConfig.get('/weather');
      // Sauvegarder les données dans le cache
      await AsyncStorage.setItem(
        'weatherCache',
        JSON.stringify({
          data: response.data,
        }),
      );

      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo :', error);

      //récupérer les données depuis le cache si disponible
      const cachedData = await AsyncStorage.getItem('weatherCache');
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        return parsedData.data;
      }
      throw new Error('Données météo indisponibles et pas de cache valide.');
    }
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {forecast: [], status: 'idle', error: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWeather.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forecast = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
