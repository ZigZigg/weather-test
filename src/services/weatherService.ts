import axios from "axios";
import { WeatherData, ForecastData } from "../types/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const weatherService = {
  // Get current weather data by city name
  getCurrentWeather: async (city: string, units: string = "metric"): Promise<WeatherData> => {

    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: 'cf9608a225abf1a6a0a9c01e8310ce8c',
          units: units,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching current weather:", error);
      throw error;
    }
  },

  // Get forecast data by city name
  getForecast: async (city: string, units: string = "metric", count: number = 40): Promise<ForecastData> => {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: units,
          cnt: count, // Number of timestamps (max 40, equals to 5 days)
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching forecast:", error);
      throw error;
    }
  },
  
  // Get weather by coordinates
  getWeatherByCoords: async (lat: number, lon: number, units: string = "metric"): Promise<WeatherData> => {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: units,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching weather by coordinates:", error);
      throw error;
    }
  },
  
  // Get forecast by coordinates
  getForecastByCoords: async (lat: number, lon: number, units: string = "metric", count: number = 40): Promise<ForecastData> => {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: units,
          cnt: count,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching forecast by coordinates:", error);
      throw error;
    }
  },
}; 