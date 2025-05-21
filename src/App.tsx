import { useState, useEffect } from 'react';
import { WeatherApi } from './api/WeatherApi';
import type { WeatherData, ForecastItem } from './types/weather';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import Search from './components/Search';
import './app.css';

const api = new WeatherApi();

function App() {
    const [city, setCity] = useState('Moscow');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    const handleCitySelect = (city: string) => {
        setCity(city);
        loadWeather(city);
    };

    return (
        <div className="container">
            <Search onCitySelect={handleCitySelect} />
            {isLoading ? (
                <p className="loading">Загрузка...</p>
            ) : errorMessage ? (
                <p className="loading">{errorMessage}</p>
            ) : (
                <>
                    {weather && <WeatherCard data={weather} />}
                    {forecast.length > 0 && (
                        <Forecast
                            forecastList={forecast}
                            onForecastClick={handleForecastClick}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default App;
