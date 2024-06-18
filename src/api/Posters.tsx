import {apiBaseUrl, options} from './Base'

export async function getMoviePoster(movieId: number): Promise<string | null> {
    try {
      const response = await fetch(`${apiBaseUrl}v1.4/movie/${movieId}`, {
        ...options,
      });
      const data = await response.json();
      return data.poster; 
    } catch (error) {
      console.error("Ошибка получения постера:", error);
      throw error;
    }
  }

