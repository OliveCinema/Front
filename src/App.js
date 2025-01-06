import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Movies from "./components/Movies";
import Seats from "./components/Seats";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId/seats" element={<Seats />} />
      </Routes>
    </Router>
  );
}

export default App;
