import React from 'react'

export const RatingFilter = ({ ratingFrom, ratingTo, setRatingFrom, setRatingTo }: {
  ratingFrom: number | null;
  ratingTo: number | null;
  setRatingFrom: (rating: number | null) => void;
  setRatingTo: (rating: number | null) => void;
}) => {
  const ratingOptions = [
    { label: "Все", value: null },
    { label: "0-2", value: '0-2' },
    { label: "2-4", value: '2-4' },
    { label: "4-6", value: '4-6' },
    { label: "6-8", value: '6-8' },
    { label: "8-10", value: '8-10' },
  ];

  return (
    <div className='filters__rating'>
      <label htmlFor="rating-filter">Рейтинг:</label>
      <select
        id="rating-filter"
        onChange={(e) => {
          const selectedValue = e.target.value;
          if (selectedValue === null) {
            setRatingFrom(null);
            setRatingTo(null);
          }
          else if (typeof selectedValue === "number") {
            setRatingFrom(selectedValue);
            setRatingTo(null);
          }
          else if (typeof selectedValue === "string") {
            const [ratingFromStr, ratingToStr] = selectedValue.split("-");
            setRatingFrom(parseFloat(ratingFromStr));
            setRatingTo(parseFloat(ratingToStr));
          }
        }}
      >
        {ratingOptions.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};