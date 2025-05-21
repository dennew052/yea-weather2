import WeatherCard from './WeatherCard';
import Forecast from './Forecast';
import type { WeatherData, ForecastItem } from '../types/weather';

type Props = {
    isLoading: boolean;
    errorMessage: string | null;
    weather: WeatherData | null;
    forecast: ForecastItem[];
    onForecastClick: (data: ForecastItem) => void;
};

const WeatherContent = ({ isLoading, errorMessage, weather, forecast, onForecastClick }: Props) => {
    if (isLoading) return <p className="loading">Загрузка...</p>;
    if (errorMessage) return <p className="loading">{errorMessage}</p>;

    return (
        <>
            {weather && <WeatherCard data={weather} />}
            {forecast.length > 0 && (
                <Forecast forecastList={forecast} onForecastClick={onForecastClick} />
            )}
        </>
    );
};

export default WeatherContent;
