import './MovieCard.css'
import {FC} from 'react';
import {Movie} from '../../api/Movie'
import { Link, Route } from 'react-router-dom';
import React from 'react';
import defImg from '../../assets/def.jpg'

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard: FC<MovieCardProps> = ({movie}) => {
    return (
        <Link to={`/movie/${movie.id}`} className='movie-card'>
            {movie.poster && movie.poster.url && (
                <img className='movie-card__poster' srcSet={movie.poster.url} alt="" /> 
            )}
            {!movie.poster && (
                 <img className='movie-card__poster' srcSet={defImg} alt="" /> 
            )}
            <h2 className='movie-card__name'>{movie.name}</h2>
            <p className='movie-card__date'>Год выпуска: {movie.year}</p>
            <p className='movie-card__rating'>Рейтинг imdb: {movie.rating.imdb}</p>
        </Link>
    )
}