import React from "react";
import "./MoviesList.css";

export default function MoviesList({ movies }) {
  function formatDate(date) {
    return date?.split("-").reverse().slice(2) || "";
  }

  const addDots = (stg, maxLength) =>
    stg.length >= maxLength ? `${stg}...` : stg;
  const splitText = (title, maxLength) => title.slice(0, maxLength);

  return (
    <article className="container-movies">
      {movies.map((movie) => (
        <div className="movie__card" key={movie.id}>
          <div
            className="movie__wrapper"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
            }}
          />
          <div className="movie__infos">
            <div className="movie__details">
              <span className="movie__releaseDate">
                {movie.first_air_date
                  ? formatDate(movie.first_air_date)
                  : formatDate(movie.release_date)}
              </span>
              <span className="movie__voteAverage">{movie.vote_average}</span>
            </div>
            <h3 className="movie__title">
              {movie.original_name
                ? addDots(splitText(movie.original_name, 25), 25)
                : addDots(splitText(movie.title, 25), 25)}
            </h3>
          </div>
        </div>
      ))}
    </article>
  );
}
