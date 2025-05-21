import React, { useState } from 'react';
import { WeatherApi } from '../api/WeatherApi';
import type {City} from '../types/weather';

const api = new WeatherApi();

interface Props {
    onCitySelect: (city: string) => void;
}

export default function Search({ onCitySelect }: Props) {
    const [input, setInput] = useState('');
    const [results, setResults] = useState<City[]>([]);
    const [warning, setWarning] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) {
            setWarning('Введите название города');
            return;
        }
        try {
            const cities = await api.getCityCoordinates(input);
            if (cities.length === 0) {
                setWarning('Город не найден');
            } else {
                setResults(cities);
                setWarning('');
            }
        } catch {
            setWarning('Ошибка при поиске');
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearch} className="search-container__form">
                <div className="search-container__input-wrapper">
                    <input
                        type="text"
                        name="city"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Введите город"
                        className="search-container__input"
                    />
                    {input && (
                        <span
                            className="search-container__clear-btn"
                            onClick={() => setInput('')}
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            focusable="false"
                            aria-hidden="true"
                            style={{
                                pointerEvents: 'none',
                                display: 'inherit',
                                width: '80%',
                                height: '80%',
                                opacity: 0.5
                            }}
                        >
      <path d="m12.71 12 8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z" />
    </svg>
                    </span>
                    )}
                    <p>{warning}</p>
                </div>
                <button type="submit" className="search-container__button">
                    Поиск
                </button>

                <ul
                    className="search-container__weather-list"
                    style={{display: results.length > 0 ? 'block' : 'none'}}
                >
                    {results.map((city) => (
                        <li
                            key={`${city.name}-${city.lat}-${city.lon}`}
                            onClick={() => {
                                onCitySelect(city.name);
                                setResults([]);
                                setInput('');
                            }}
                        >
                            <img
                                src={`https://openweathermap.org/images/flags/${city.country.toLowerCase()}.png`}
                                width="24"
                                height="16"
                                alt={city.country}
                            />
                            {city.name}
                        </li>
                    ))}
                </ul>
            </form>
        </div>
    );
}
