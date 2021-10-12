import React, { useState, useCallback } from "react";
import "./styles.css";
import Filter from "./components/Filter/Filter";
import MoviesList from "./components/MoviesList/MoviesList";
import api from "./services/api";

export default function App() {
  const [movies, setMovies] = useState([]);
  const apiKey = "14809d4f97b0780835970cce918adc25";

  const handleFilterChange = useCallback(function (newQuery) {
    newQuery = {
      input: newQuery,
      requestBy: "trending",
    };

    if (newQuery.input === "") {
      newQuery = {
        ...newQuery,
        input: null,
        requestBy: "trending",
        timeWindow: "week",
      };
    } else if (newQuery.input !== "") {
      newQuery = { ...newQuery, requestBy: "search", timeWindow: null };
    }

    searchMovie(newQuery);
  }, []);

  async function searchMovie({ requestBy, timeWindow, input }) {
    const tw = timeWindow ? `/${timeWindow}` : "";
    api
      .get(`${requestBy}/movie${tw}?api_key=${apiKey}&query=${input}`)
      .then((response) => {
        setMovies(response.data.results);
      });
  }

  return (
    <div className="App">
      <Filter movies={movies} setFilterStateCallback={handleFilterChange} />
      <main className="container-main">
        <MoviesList movies={movies} />
      </main>
    </div>
  );
}
