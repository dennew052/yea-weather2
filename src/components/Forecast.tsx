import React, { useState } from 'react';
import type {ForecastItem} from '../types/weather';
import { capitalize } from '../helpers';

interface Props {
    forecastList: ForecastItem[];
    onForecastClick: (data: ForecastItem) => void;
}

function groupForecastByDay(list: ForecastItem[]) {
    const days: Record<string, ForecastItem[]> = {};
    list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const label = date.toLocaleDateString('ru-RU', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
        });
        if (!days[label]) days[label] = [];
        days[label].push(item);
    });
    return days;
}

const Forecast: React.FC<Props> = ({ forecastList, onForecastClick }) => {
    const grouped = groupForecastByDay(forecastList);
    const [selectedDay, setSelectedDay] = useState<string>(Object.keys(grouped)[0]);

    return (
        <div className="forecast">
            <div className="forecast__days">
                {Object.keys(grouped).map(day => (
                    <button
                        key={day}
                        className={`forecast__day-btn ${day === selectedDay ? 'active' : ''}`}
                        onClick={() => setSelectedDay(day)}
                    >
                        {day}
                    </button>
                ))}
            </div>
            <ul className="forecast__details">
                {grouped[selectedDay].map(item => {
                    const time = new Date(item.dt * 1000).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    });
                    return (
                        <li
                            key={item.dt}
                            className="forecast__item"
                            onClick={() => {
                                onForecastClick(item);
                            }}
                        >
                            <div><strong>{time}</strong></div>
                            <img
                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                alt="icon"
                            />
                            <div>{item.main.temp.toFixed(1)}°C</div>
                            <div>{capitalize(item.weather[0].description)}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Forecast;
