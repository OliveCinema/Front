import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";
import "./Seats.css";

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
    <div className="seats-container">
      <h1 className="seats-title">🎟️ 좌석 선택</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="seats-grid">
        {seats.map((seat) => (
          <div
            className={`seat-card ${seat.reserved ? "reserved" : seat.selected ? "selected" : "available"}`}
            key={seat.id}
          >
            <p>Seat {seat.seatNumber}</p>
            {!seat.reserved && !seat.selected && (
              <button className="seat-button" onClick={() => selectSeat(seat.id)}>
                선택하기
              </button>
            )}
            {seat.selected && !seat.reserved && (
              <button className="confirm-button" onClick={() => confirmReservation(seat.id)}>
                예약 확정
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Seats;
