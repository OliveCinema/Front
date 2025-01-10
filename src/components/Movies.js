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
    <div className="container mt-5">
      <h1 className="text-center mb-4">Olive Cinema - Movies</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-4 mb-4" key={movie.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <Link to={`/movies/${movie.id}/seats`} className="btn btn-primary">
                  View Seats
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
