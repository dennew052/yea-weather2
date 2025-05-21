import './app.css';
import Search from './components/Search';
import { useWeather } from './hooks/useWeather';
import WeatherContent from "./components/WeatherContent.tsx";

function App() {
    const {
        weather,
        forecast,
        isLoading,
        errorMessage,
        handleCitySelect,
        handleForecastClick
    } = useWeather('Moscow');

    return (
        <div className="container">
            <Search onCitySelect={handleCitySelect} />
            <WeatherContent
                isLoading={isLoading}
                errorMessage={errorMessage}
                weather={weather}
                forecast={forecast}
                onForecastClick={handleForecastClick}
            />
        </div>
    );
}

export default App;
