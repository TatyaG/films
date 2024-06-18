import {Loader} from '../Loader'
import {MovieCard} from './MoviePage'
import {useQuery} from '@tanstack/react-query'
import {queryClient} from '../../api/queryClient'
import {fetchMovie} from '../../api/MoviePage'
import React from 'react';
import {useParams} from 'react-router-dom'

export const FetchMoviePage = () => {
    const {id} = useParams()

   const moviePageQuery = useQuery(
    {
    queryFn: () => fetchMovie(id),
    queryKey: ['movie'],
   }, queryClient)


   switch(moviePageQuery.status) {
    case 'pending':
        return <Loader/>

    case 'success':
        return <MovieCard movie={moviePageQuery.data}/>

    case 'error':
        return (
            <div className='error'>
                <span className='error__text'>Произошла ошибка :(</span>
                <button className='error__btn' onClick={() => moviePageQuery.refetch()}>Повторить запрос</button>
            </div>
        ) 
   }
}