import React from 'react'

export const GenreFilter = ({selectedGenre, setSelectedGenre}: {selectedGenre: string | null; setSelectedGenre: (genre: string | null) => void;}) => {
    const genres = ["драма", "комедия", "мелодрама", "ужасы", "история", "документальный"]; 
  
    return (
      <div className='filters__genre'>
        <label htmlFor="genre-filter">Жанр:</label>
        <select id="genre-filter" value={selectedGenre || ''} onChange={(e) => setSelectedGenre(e.target.value as string)}>
          <option value=''>Все жанры</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    );
  };