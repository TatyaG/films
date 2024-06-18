import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import {FetchMovieListView} from './components/MovieList/FetchMovieList'
import {FetchMoviePage} from './components/MoviePage/FetchMoviePage'

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <FetchMovieListView />
        ),       
    },
    {
        path: '/movie/:id',
        element: (
            <FetchMoviePage/>
        )
    }
])