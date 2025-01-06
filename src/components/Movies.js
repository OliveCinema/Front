import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/movies`);
        setMovies(response.data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Movies</h1>
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
