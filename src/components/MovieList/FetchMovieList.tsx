import {Loader} from '../Loader'
import {MovieListView} from './MovieList'
import {useQuery} from '@tanstack/react-query'
import {queryClient} from '../../api/queryClient'
import {MoviePage} from '../../api/Movie'
import React from 'react';
import {useState} from 'react'
import {Pagination} from '../Pagination/Pagination'
import { GenreFilter } from '../Filters/GenreFilter'
import { YearFilter } from '../Filters/YearFilter'
import { RatingFilter } from '../Filters/RatingFilter'
import {MovieList} from '../../api/Movie'


export const FetchMovieListView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [yearFrom, setYearFrom] = useState<number | null>(null);
    const [yearTo, setYearTo] = useState<number | null>(null);
    const [ratingFrom, setRatingFrom] = useState<number | null>(null);
    const [ratingTo, setRatingTo] = useState<number | null>(null);
    

   const {isLoading, error, data, refetch} = useQuery(
    {
    queryFn: () => MoviePage(currentPage, selectedGenre, yearFrom, yearTo, ratingFrom, ratingTo),
    queryKey: [
        'movies',
        currentPage,
        selectedGenre,
        // yearFrom,
        // yearTo,
        ratingFrom,
        ratingTo

    ],
   }, queryClient)


   if (isLoading) {
    return <Loader/>
   }

   if (error) {
    return (
        <div className='error'>
            <span className='error__text'>Произошла ошибка :(</span>
            <button className='error__btn' onClick={() => queryClient.refetchQueries(['movies'])}>Повторить запрос</button>
        </div>
    ) 
   }

   if (data) {
    return (
        <div className='movies'>
            <div className='filters'>
                <GenreFilter selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
                <YearFilter yearFrom={yearFrom} yearTo={yearTo} setYearFrom={setYearFrom} setYearTo={setYearTo} refetch={refetch}/>
                <RatingFilter ratingFrom={ratingFrom} ratingTo={ratingTo} setRatingFrom={setRatingFrom} setRatingTo={setRatingTo}/>
            </div>
            
            <MovieListView movieList={data.docs}/>
            <Pagination totalPage={data.total} currentPage={currentPage} setCurrentPage={setCurrentPage} 
            queryClient={queryClient} selectedGenre={selectedGenre}  yearFrom={yearFrom} yearTo={yearTo}
            ratingFrom={ratingFrom} ratingTo={ratingTo}/>
        </div>
        ) 
   }
   
}