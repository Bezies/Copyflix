import React from "react";
import SelectGenre from "../Components/SelectGenre";
import Navbar from "./Navbar";
import PopularFilms from "../Components/PopularFilms";
import TopRatedFilms from "../Components/TopRatedFilms";
import { useSelector } from "react-redux";
import RandomFilmsHomePage from "../Components/RandomFilmsHomePage";

export default function Films() {
  const filmsDB = useSelector((state) => state.filmsDB);

  return (
    <div className=" min-h-screen bg-black">
      <Navbar />
      <div className="flex flex-col">
        {/* <div className="px-20">
          {filmsDB.popular.length > 0 &&
            filmsDB.popular &&
            filmsDB.MovieSearch === "" && <RandomFilmsHomePage />}
        </div> */}

        <div className="px-20 mt-20">
          <SelectGenre />
        </div>
        <div>
          <div className="mt-20 px-20 bg-black flex flex-col items-start">
            <PopularFilms />
          </div>

          <div className="mt-20 px-20 flex flex-col items-start">
            <TopRatedFilms />
          </div>
        </div>
      </div>
    </div>
  );
}
