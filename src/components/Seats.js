import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

function Seats() {
  const { movieId } = useParams();
  const [seats, setSeats] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/seats/movie/${movieId}`);
        setSeats(response.data);
      } catch (err) {
        setError("Failed to fetch seats: " + (err.response?.data?.message || "Unknown error"));
      }
    };
    fetchSeats();
  }, [movieId]);

  const selectSeat = async (seatId) => {
    try {
      await axios.post(`${API_BASE_URL}/api/seats/${seatId}/select`);
      alert("Seat selected successfully!");
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === seatId ? { ...seat, selected: true } : seat
        )
      );
    } catch (err) {
      setError("Failed to select seat: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  const confirmReservation = async (seatId) => {
    try {
      await axios.post(`${API_BASE_URL}/api/seats/${seatId}/confirm`);
      alert("Seat reservation confirmed!");
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === seatId ? { ...seat, reserved: true, selected: false } : seat
        )
      );
    } catch (err) {
      setError("Failed to confirm reservation: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Seats for Movie {movieId}</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {seats.map((seat) => (
          <div className="col-2 mb-3" key={seat.id}>
            <button
              className={`btn btn-${seat.reserved ? "secondary" : seat.selected ? "warning" : "success"} w-100`}
              onClick={
                seat.reserved
                  ? null
                  : seat.selected
                  ? () => confirmReservation(seat.id)
                  : () => selectSeat(seat.id)
              }
              disabled={seat.reserved}
            >
              {seat.seatNumber}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Seats;
