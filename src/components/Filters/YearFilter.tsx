import React from 'react'

export const YearFilter = ({ yearFrom, yearTo, setYearFrom, setYearTo, refetch }:
  { yearFrom: number | null; yearTo: number | null; setYearFrom: (year: number | null) => void; setYearTo: (year: number | null) => void; refetch: () => void }) => {
  return (
    <div className='filters__years'>
      <div>
        <label htmlFor="year-from">Год выпуска (от):</label>
        <input type="number" id="year-from" min="1990" value={yearFrom || ""}
          onChange={(e) => setYearFrom(parseInt(e.target.value) || null)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              refetch();
            }
          }} />
      </div>
      <div>
        <label htmlFor="year-to">Год выпуска (до):</label>
        <input type="number" id="year-to" min="1990" value={yearTo || ""}
          onChange={(e) => setYearTo(parseInt(e.target.value) || null)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              refetch();
            }
          }} />
      </div>

    </div>
  );
};