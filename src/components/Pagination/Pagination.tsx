import React from 'react';
import {Loader} from '../Loader'
import './Pagination.css'
import {queryClient} from '../../api/queryClient'

export const Pagination = ({totalPage, currentPage, setCurrentPage, queryClient, selectedGenre, yearFrom, yearTo, ratingFrom, ratingTo}: {
  totalPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  queryClient: queryClient,
  selectedGenre: string | null;
  ratingFilter: number | null;
  yearFrom: number | null;
  yearTo: number | null;
  ratingFrom: number | null;
  ratingTo: number | null
}) => {
    const handleNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
            queryClient.refetchQueries([
              'movies',
              currentPage + 1,
              selectedGenre,
              yearFrom,
              yearTo,
              ratingFrom,
              ratingTo
            ]);
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            queryClient.refetchQueries([
              'movies',
              currentPage - 1,
              selectedGenre,
              yearFrom,
              yearTo,
              ratingFrom,
              ratingTo
            ]);
        }
    }

    const handleClick = (page) => {
        setCurrentPage(page);
        queryClient.refetchQueries([
          'movies',
          page,
          selectedGenre,
          yearFrom,
          yearTo,
          ratingFrom,
          ratingTo
        ]);
    }



        const maxVisiblePages = 10;
        let pageNumbers = [];
        if (totalPage && totalPage !== Infinity) {
          pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);

          // Ограничиваем количество отображаемых страниц
        if (pageNumbers.length > maxVisiblePages) {
            pageNumbers = pageNumbers.slice(0, maxVisiblePages);
        }
  
        // Добавляем "…" для пропущенных страниц
        if (currentPage > maxVisiblePages + 1) {
            pageNumbers.unshift('…');
        }
        if (currentPage < totalPage - maxVisiblePages) {
            pageNumbers.push('…');
        }
        } else {
          return <Loader />; 
        }
        
 
       
        // Отображаем пагинацию
        return (
          <div className="pagination">
            <ul className='pagination__list'>
              <li className={`pagination__item ${currentPage === 1 ? "disabled" : ""}`}>
                <button onClick={handlePrevPage} className="pagination__link" disabled={currentPage === 1}>
                  Назад
                </button>
              </li>
              {pageNumbers.map((number) => (
          <li key={number} className={`pagination__item ${currentPage === number ? "active" : ""}`}>
            {typeof number === 'number' ? (
              <button onClick={() => handleClick(number)} className="pagination__link">
                {number}
              </button>
            ) : (
              <span className="pagination__link">{number}</span>
            )}
          </li>
        ))}
              <li className={`pagination__item ${currentPage === totalPage ? "disabled" : ""}`}>
                <button onClick={handleNextPage} className="pagination__link" disabled={currentPage === totalPage}>
                  Далее
                </button>
              </li>
            </ul>
          </div>
        );

}