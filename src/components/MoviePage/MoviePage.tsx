import { FC } from 'react';
import React from 'react';
import './MoviePage.css'
import {Movie} from '../../api/MoviePage'

interface MovieProps {
    movie: Movie;
}



export const MovieCard: FC<MovieProps> = ({movie}) => {    
    return (
        <div className='movie'>
            {movie.poster && movie.poster.url && (
                <img className='movie__poster' srcSet={movie.poster.url} alt="" /> 
            )}

            <div>
                <h2 className='movie__name'>{movie.name}</h2>          
                <p className='movie__descr'>{movie.description}</p>
                <p className='movie__date'><span>Дата выпуска:</span> {movie.year} г.</p> 
                <p className='movie__rating'><span>Рейтинг imdb:</span> {movie.rating.imdb}</p>
                <span>Жанры:</span>
                <ul className='movie__genres'>                 
                    {movie.genres.map((genre) => {
                        return (
                            <li className='movie__genre'>{genre.name}</li>
                        )
                    })}
                </ul>
                
            </div>
            
        </div>
    )
}

