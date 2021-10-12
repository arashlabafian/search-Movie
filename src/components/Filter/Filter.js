import React, { useState, useEffect } from "react";
import History from "../History/History";
import useDebounce from "../../hooks/useDebounce";
import { v4 as uuidv4 } from "uuid";
import "./filter.css";

export default function Filter(props) {
  const { setFilterStateCallback, movies } = props;
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedSearchTerm = useDebounce(query, 500);

  const deleteHistory = (id) => {
    setHistory((prevVal) => {
      const newVal = prevVal.filter((item) => item.id !== id);
      return newVal;
    });
    if (!id) {
      setHistory([]);
    }
  };

  useEffect(() => {
    console.log(debouncedSearchTerm);
    if (debouncedSearchTerm) {
      setFilterStateCallback(debouncedSearchTerm);
      setHistory((prevVal) => [
        ...prevVal,
        { id: uuidv4(), value: debouncedSearchTerm, date: new Date() },
      ]);
    } else {
      setFilterStateCallback("");
    }
  }, [debouncedSearchTerm, setFilterStateCallback]);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, false);
    return () => {
      document.removeEventListener("click", handleOutsideClick, false);
    };
  }, []);

  const handleOutsideClick = () => {
    setShowSuggestions(false);
  };

  const suggestionSelected = (title) => {
    setQuery(title);
  };
  const renderSuggestions = () => {
    const filteredMovies = movies.filter((movie) => {
      const lowerCaseMovie = movie.title.toLowerCase();
      if (lowerCaseMovie.startsWith(debouncedSearchTerm)) {
        return movie;
      }
      return null;
    });
    if (
      filteredMovies.length === 0 ||
      !debouncedSearchTerm ||
      !showSuggestions
    ) {
      return null;
    }

    return (
      <ul className="SearchBar">
        {filteredMovies.map((movie) => (
          <li key={movie.id} onClick={() => suggestionSelected(movie.title)}>
            {movie.title}
          </li>
        ))}
      </ul>
    );
  };

  const sanitize = (string) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "/": "&#x2F;",
    };
    const reg = /[&<>"'/]/gi;
    return string.replace(reg, (match) => map[match]);
  };

  const onInputChange = (e) => {
    setShowSuggestions(true);
    const value = e.target.value;
    const sanitizedValue = sanitize(value);
    setQuery(sanitizedValue);
  };

  return (
    <header className="container-filter">
      <form onSubmit={(e) => e.preventDefault()} className="filter">
        <label htmlFor="filter_input" className="filter__label">
          Find your Movie
        </label>
        <input
          id="filter_input"
          value={query}
          onChange={onInputChange}
          className="filter__input"
          placeholder={"i.e. Batman"}
          type="text"
          title="Find your Movie"
        />
        {renderSuggestions()}
        {!!history.length && (
          <History history={history} deleteHistory={deleteHistory} />
        )}
      </form>
    </header>
  );
}
