import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Inscription from "./Pages/Inscription";
import Profils from "./Pages/Profils";
import HomePage from "./Pages/HomePage";
import Liste from "./Pages/Liste";
import Serie from "./Pages/Serie";
import Movie from "./Pages/Movie";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/profils" element={<Profils />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/liste" element={<Liste />} />
        <Route path="/serie" element={<Serie />} />
        <Route path="/:moviID" element={<Movie />} />
      </Routes>
    </div>
  );
}
