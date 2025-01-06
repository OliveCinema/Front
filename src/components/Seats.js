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
        const response = await axios.get(`${API_BASE_URL}/movies/${movieId}`);
        setSeats(response.data.seats);
      } catch (err) {
        console.error("Error fetching seats:", err);
      }
    };
    fetchSeats();
  }, [movieId]);

  const reserveSeat = async (seatId) => {
    try {
      await axios.post(`${API_BASE_URL}/seats/${seatId}/reserve`);
      alert("Seat reserved successfully!");
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === seatId ? { ...seat, reserved: true } : seat
        )
      );
    } catch (err) {
      setError("Failed to reserve seat: " + err.response.data.message);
    }
  };

  return (
    <div>
      <h1>Seats</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {seats.map((seat) => (
          <li key={seat.id}>
            <p>
              Seat: {seat.seatNumber} - {seat.reserved ? "Reserved" : "Available"}
            </p>
            {!seat.reserved && (
              <button onClick={() => reserveSeat(seat.id)}>Reserve</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Seats;
