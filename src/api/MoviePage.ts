import {z} from 'zod'

import {apiBaseUrl, options} from './Base'

export const MovieSchema = z.object({
    id: z.number(),
    poster: z.object({}),
    name: z.string(),
    description: z.string(),
    year: z.number(),
    // rating: z.object({}),
    genres: z.array(z.string()),
})


export type Movie = z.infer<typeof MovieSchema>

type FetchMoviePageResponse = z.infer<typeof MovieSchema>


export function fetchMovie(id): Promise<FetchMoviePageResponse> {
    return (
        fetch(`${apiBaseUrl}v1.4/movie/${id}`, options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data
        } )
        .catch(err => {
            console.error(err)
            throw err;
        } )
    ) 
}


interface IdleRequestState {
    status: 'idle';
}

interface LoadingRequestState {
    status: 'pending';
}
interface SuccessRequestState {
    status: 'success';
    data: Movie;
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



// export function useMovie() {
//     const [state, setState] = useState<RequestState>({status: 'idle'});

//     useEffect(() => {
//         if (state.status == 'pending') {
//             fetchMovie()
//             .then((data) => {
//                 setState({status: 'success', data: data})
//             })
//             .catch((error) => {
//                 setState({status: 'error', error})
//             })
//         }
        
//     }, [state]);

//     useEffect(() => {
//         setState({status: 'pending'});

//     }, []);

//     const refetch = () => {
//         setState({status: 'pending'});
//     };

//     return {
//         state,
//         refetch,
//     }

// }