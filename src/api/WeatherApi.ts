const API_KEY = '0a376f898eaec5225d4188c8460ce497';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export class WeatherApi {
    async getWeatherByCity(city: string) {
        const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`);
        if (!response.ok) throw new Error('Ошибка загрузки погоды');
        return response.json();
    }

    async getForecast(lat: number, lon: number) {
        const response = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`);
        if (!response.ok) throw new Error('Ошибка загрузки прогноза');
        return response.json();
    }

    async getCityCoordinates(city: string) {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`);
        if (!response.ok) throw new Error('Ошибка загрузки координат');
        return response.json();
    }
}
