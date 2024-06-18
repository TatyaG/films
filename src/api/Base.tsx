export const apiBaseUrl = 'https://api.kinopoisk.dev/';

const API_KEY = import.meta.env.VITE_API_KEY


export const options = {
    method: 'GET', 
    headers: {
        'accept': 'application/json',
        'X-API-KEY': API_KEY,
    }
    
};