export const MMHG_PER_HPA = 0.75006;

export function windDirection(deg: number): string {
    const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
    return directions[Math.round(deg / 45) % 8];
}

export function formatVisibility(visibility: number): string {
    return visibility >= 1000
        ? `${(visibility / 1000).toFixed(1)} км`
        : `${visibility} м`;
}

export function formatWeatherDate(dt: number, mode: 'time' | 'full' = 'full'): string {
    const localTime = new Date(dt * 1000);
    const options: Intl.DateTimeFormatOptions = mode === 'time'
        ? { hour: '2-digit', minute: '2-digit', hour12: false }
        : { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', hour12: false };
    return localTime.toLocaleString('ru-RU', options);
}

export function capitalize(str: string): string {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}
