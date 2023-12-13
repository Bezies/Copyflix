import React from "react";
import SelectGenre from "../Components/SelectGenre";
import Navbar from "./Navbar";
import PopularFilms from "../Components/PopularFilms";
import TopRatedFilms from "../Components/TopRatedFilms";

export default function Films() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="px-20 mt-20">
        <SelectGenre />
      </div>

      <div className="mt-20 px-20 bg-black flex flex-col items-start">
        <PopularFilms />
      </div>

      <div className="mt-20 px-20 flex flex-col items-start">
        <TopRatedFilms />
      </div>
    </div>
  );
}
