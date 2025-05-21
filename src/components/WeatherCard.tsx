import React from 'react';
import type {WeatherData} from '../types/weather';
import {
    MMHG_PER_HPA,
    windDirection,
    formatVisibility,
    formatWeatherDate,
    capitalize
} from '../helpers';

interface Props {
    data: WeatherData;
}

const WeatherCard: React.FC<Props> = ({ data }) => {
    return (
        <section className="weather" style={{ visibility: 'visible' }}>
            <div className="weather__block1">
                <p className="weather__city">{data.name}</p>
                <p className="weather__date">{formatWeatherDate(data.dt)}</p>
                <div className="weather__wrapper-temperature">
                    <img
                        className="weather__icon"
                        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                        alt="icon"
                    />
                    <p className="weather__temperature">{data.main.temp.toFixed(1)}°C</p>
                </div>
                <p className="weather__desc">{capitalize(data.weather[0].description)}</p>
            </div>
            <div className="weather__block2">
                <p className="weather__feels-like">Ощущается как {data.main.feels_like.toFixed(1)}°C</p>
                <p className="weather__clouds">Облачность: {data.clouds.all}%</p>
                <p className="weather__humidity">Влажность: {data.main.humidity}%</p>
                <p className="weather__pressure">
                    Давление: {Math.round(data.main.pressure * MMHG_PER_HPA)} мм. рт. ст.
                </p>
                <p className="weather__wind-speed">
                    Ветер: {data.wind.speed} м/с, {windDirection(data.wind.deg)}
                </p>
                <p className="weather__visibility">Видимость: {formatVisibility(data.visibility)}</p>
                <p className="weather__date-sunrise">
                    Восход: {data.sys?.sunrise ? formatWeatherDate(data.sys.sunrise, 'time') : '—'}
                </p>
                <p className="weather__date-sunset">
                    Закат: {data.sys?.sunset ? formatWeatherDate(data.sys.sunset, 'time') : '—'}
                </p>
            </div>
        </section>
    );
};

export default WeatherCard;
