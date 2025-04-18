import { useState, useEffect, useCallback } from "react";

interface CityWidget {
  id: string;
  city: string;
}

// Hook for managing city data
export const useCityManager = () => {
  const [searchCity, setSearchCity] = useState<string>("");
  const [cities, setCities] = useState<CityWidget[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load saved cities from localStorage on mount
  useEffect(() => {
    const savedCities = localStorage.getItem("weatherCities");
    if (savedCities) {
      setCities(JSON.parse(savedCities));
    } else {
      // Default to showing Singapore if no saved cities
      setCities([{ id: "singapore", city: "Singapore" }]);
    }
  }, []);

  // Save cities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("weatherCities", JSON.stringify(cities));
  }, [cities]);

  const addCity = useCallback(() => {
    if (!searchCity.trim()) return;

    const normalizedCity = searchCity.trim().toLowerCase();
    const cityId = normalizedCity.replace(/\s+/g, "-");

    // Check if city already exists
    if (cities.some((city) => city.id === cityId)) {
      setError("This city is already on your dashboard");
      return;
    }

    setCities([...cities, { id: cityId, city: searchCity.trim() }]);
    setSearchCity("");
    setError(null);
  }, [searchCity, cities]);

  const removeCity = useCallback((cityToRemove: string) => {
    setCities(cities => cities.filter((city) => city.city !== cityToRemove));
  }, []);

  return {
    searchCity,
    setSearchCity,
    cities,
    setCities,
    error,
    setError,
    addCity,
    removeCity
  };
};