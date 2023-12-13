import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";
import PopularFilms from "../Components/PopularFilms";
import TopRatedFilms from "../Components/TopRatedFilms";
import SearchFilms from "../Components/SearchFilms";
import RandomFilmsHomePage from "../Components/RandomFilmsHomePage";

export default function HomePage() {
  const filmsDB = useSelector((state) => state.filmsDB);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-black">
      <Navbar />
      <div className="">
        {loading && (
          <div className="flex items-center justify-center">
            <img className="w-32" src="loader.gif" alt="" />
          </div>
        )}

        {filmsDB.popular.length > 0 &&
          filmsDB.popular &&
          filmsDB.MovieSearch === "" && <RandomFilmsHomePage />}

        {filmsDB.MovieSearch !== "" && (
          <div className="mt-20 px-20 bg-black flex flex-col items-start">
            <SearchFilms />
          </div>
        )}

        <div className="mt-20 px-20 bg-black flex flex-col items-start">
          <PopularFilms />
        </div>

        <div className="mt-20 px-20 flex flex-col items-start">
          <TopRatedFilms />
        </div>

        {/* {!filmsDB.database && (
          <div className="flex items-center justify-center w-full">
            <p className="text-red-600 text-2xl">
              Aucun film à afficher, veuillez faire une autre recherche
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
}
