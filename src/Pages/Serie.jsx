import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import PopularSeries from "../Components/PopularSeries";
import TopRatedSeries from "../Components/TopRatedSeries";
import RandomSerieHomePage from "../Components/RandomSerieHomePage";
import { useSelector } from "react-redux";

export default function Serie() {
  const [loading, setLoading] = useState(false);
  const SerieDB = useSelector((state) => state.SerieDB);

  return (
    <div className="bg-black">
      <Navbar />
      {loading && (
        <div className="flex items-center justify-center">
          <img className="w-32" src="loader.gif" alt="" />
        </div>
      )}

      {SerieDB.popularSeries.length > 0 && SerieDB.popularSeries && (
        <RandomSerieHomePage />
      )}

      <div className="mt-20 px-10 md:px-20 bg-black flex flex-col items-start">
        <PopularSeries />
      </div>

      <div className="mt-20 px-10 md:px-20 flex flex-col items-start">
        <TopRatedSeries />
      </div>
    </div>
  );
}
