import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

function Seats() {
  const { movieId } = useParams(); // URL에서 movieId 가져오기
  const [seats, setSeats] = useState([]); // 좌석 정보
  const [error, setError] = useState(""); // 오류 메시지

  // 좌석 정보 가져오기
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/seats/movie/${movieId}`);
        setSeats(response.data); // 좌석 데이터 설정
      } catch (err) {
        setError("Failed to fetch seats: " + (err.response?.data?.message || "Unknown error"));
      }
    };
    fetchSeats();
  }, [movieId]);

  // 좌석 선택
  const selectSeat = async (seatId) => {
    try {
      await axios.post(`${API_BASE_URL}/api/seats/${seatId}/select`); // 좌석 선택 API 호출
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

  // 좌석 예약 확정 (결제)
  const confirmReservation = async (seatId) => {
    try {
      await axios.post(`${API_BASE_URL}/api/seats/${seatId}/confirm`); // 좌석 예약 확정 API 호출
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
    <div>
      <h1>Seats</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {seats.map((seat) => (
          <li key={seat.id}>
            <p>
              Seat: {seat.seatNumber} - {seat.reserved ? "Reserved" : seat.selected ? "Selected" : "Available"}
            </p>
            {!seat.reserved && !seat.selected && (
              <button onClick={() => selectSeat(seat.id)}>Select</button>
            )}
            {seat.selected && !seat.reserved && (
              <button onClick={() => confirmReservation(seat.id)}>Confirm</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Seats;
