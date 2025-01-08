import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config";

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
    <div>
      <h1>Movies</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <p>{movie.title}</p>
            <Link to={`/movies/${movie.id}/seats`}>View Seats</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;
