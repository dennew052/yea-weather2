import { useState, useEffect } from 'react';
import { WeatherApi } from '../api/WeatherApi';
import type { WeatherData, ForecastItem } from '../types/weather';

export function useWeather(initialCity: string) {
    const [city, setCity] = useState(initialCity);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const api = new WeatherApi();

    useEffect(() => {
        loadWeather(city);
    }, []);

    const loadWeather = async (selectedCity: string) => {
        setIsLoading(true);
        setErrorMessage(null);
        try {
            const weatherData = await api.getWeatherByCity(selectedCity);
            setWeather(weatherData);

            const forecastData = await api.getForecast(weatherData.coord.lat, weatherData.coord.lon);
            setForecast(forecastData.list);
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            setErrorMessage('Ошибка загрузки данных');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCitySelect = (city: string) => {
        setCity(city);
        loadWeather(city);
    };

    const handleForecastClick = (data: ForecastItem) => {
        setWeather(prev => {
            if (!prev) return null;
            return {
                ...prev,
                main: {
                    ...prev.main,
                    ...data.main,
                },
                weather: data.weather,
                wind: data.wind,
                clouds: data.clouds,
                visibility: data.visibility,
                dt: data.dt
            };
        });
    };

    return {
        city,
        weather,
        forecast,
        isLoading,
        errorMessage,
        handleCitySelect,
        handleForecastClick
    };
}
