export interface WeatherData {
    coord: { lat: number; lon: number };
    main: {
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
    };
    weather: { description: string; icon: string }[];
    wind: { speed: number; deg: number };
    clouds: { all: number };
    visibility: number;
    dt: number;
    sys: { sunrise: number; sunset: number };
    name: string;
}

export interface ForecastItem {
    dt: number;
    main: { temp: number };
    weather: { description: string; icon: string }[];
    wind: { speed: number; deg: number };
    clouds: { all: number };
    visibility: number;
}

export interface City {
    name: string;
    country: string;
    lat: number;
    lon: number;
}
