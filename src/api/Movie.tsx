import {z} from 'zod'
import {apiBaseUrl, options} from './Base'
import {getMoviePoster} from './Posters'



export const MovieSchema = z.object({
    id: z.number(),
    // poster: z.string(),
    name: z.string(),
    year: z.number(),
    rating: z.object({}),
})

export type Movie = z.infer<typeof MovieSchema>

export const MovieList = z.array(MovieSchema);

export type MovieList = z.infer<typeof MovieList>

export const FetchMovieListSchema = z.object({
    docs: MovieList,
    total: z.number(),
})


type FetchMovieListResponse = z.infer<typeof FetchMovieListSchema>

export async function fetchMovies(
    page: number,
    genre: string | null,
    yearFrom: number | null,
    yearTo: number | null,
    ratingFrom: number | null,
    ratingTo: number | null
): Promise<FetchMovieListResponse> {


    let url = `${apiBaseUrl}v1.4/movie?page=${page}&limit=1`

        if (genre) {          
            url += `&genres.name=${genre}`
        }

        if (ratingFrom !== null && ratingTo !== null) {
            url += `&rating.imdb=${ratingFrom}-${ratingTo}`;
          }

        if (yearFrom && yearTo) {
            url += `&year=${yearFrom}-${yearTo}`

        } else if (yearFrom) {
            url += `&year=${yearFrom}`;

          } else if (yearTo) {
            url += `&year=1990-${yearTo}`;
          }



    try {
        
        const response = await fetch(`${url}`, {
            ...options,
        });

        const data = await response.json();


        const MoviesWithPosters = await Promise.all(
            data.docs.map(async (movie) => {
                const poster = await getMoviePoster(movie.id);
                return {
                    ...movie,
                    poster
                }
            })
        );
        return {
            docs: MoviesWithPosters,
            total: data.total,
        };

       
    }
    catch (error) {
        console.error("Ошибка получения фильмов:", error);
        throw error;
    }

}



interface IdleRequestState {
    status: 'idle';
}

interface LoadingRequestState {
    status: 'pending';
}
interface SuccessRequestState {
    status: 'success';
    data: MovieList;
    totalPage: number;
}

interface ErrorRequestState {
    status: 'error';
    error: unknown;
}

type RequestState = 
| IdleRequestState 
| LoadingRequestState
| SuccessRequestState
| ErrorRequestState;



export const MoviePage = (
    page: number,
    genre: string | null,
    yearFrom: number | null,
    yearTo: number | null,
    ratingFrom: number | null,
    ratingTo: number | null
) => {
    const fetchData = async () => {
        const response = await fetchMovies(page, genre, yearFrom, yearTo, ratingFrom, ratingTo);
        return response;
      };

        const data = fetchData();
        return data; 
};
      


