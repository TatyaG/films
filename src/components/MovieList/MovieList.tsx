import { MovieCard } from "../MovieCard/MovieCard";
import {MovieList} from '../../api/Movie'
import './MovieList.css'
import { FC } from 'react';
import React from 'react';


export interface MovieListProps {
    movieList: MovieList;
  }



export const MovieListView: FC<MovieListProps> = ({movieList}) => {
    return (
        <div>
            <ul className="movie-list">
            {movieList.map((movie) => {
                return (
                    <li className="movie-item" key={movie.id}>
                        <MovieCard movie={movie}/>
                    </li>
                )               
            })}
            
        </ul>
        </div>
        
    )
}