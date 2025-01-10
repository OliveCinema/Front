import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config";
import "./Movies.css";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/movies`);
        setMovies(response.data);
      } catch (err) {
        setError("Failed to fetch movies: " + (err.response?.data?.message || "Unknown error"));
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="movies-container">
      <h1 className="movies-title">🎥 영화 목록</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="movies-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              className="movie-poster"
              src={movie.posterUrl || "https://via.placeholder.com/150"}
              alt={movie.title}
            />
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-description">{movie.description || "No description available."}</p>
            <Link to={`/movies/${movie.id}/seats`} className="view-seats-button">
              예매하기
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
