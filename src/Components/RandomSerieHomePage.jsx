import React, { useEffect, useState } from "react";
import { intRange } from "aimless.js";
import { useSelector } from "react-redux";
import AddMyListButton from "./AddMyListButton";

export default function RandomSerieHomePage() {
  useEffect(() => {
    return setRandom(intRange(0, SerieDB.popularSeries.length));
  }, []);

  const SerieDB = useSelector((state) => state.SerieDB);
  const [random, setRandom] = useState("");

  const randomSerie = SerieDB.popularSeries[random];

  return (
    <>
      {SerieDB.popularSeries && random && (
        <div className="px-20 bg-black flex items-start w-full">
          <div className="text-white w-1/2">
            <p className="mt-10 text-2xl font-thin">
              <span className="font-bold">COPYFLIX</span> present
            </p>
            <h1 className=" text-5xl uppercase mt-5 font-bold">
              {randomSerie.name}
            </h1>
            <div className="mt-5">
              <span className="font-bold text-green-500">
                Note: {randomSerie.vote_average} / 10
              </span>
              <span className="ml-5 font-thin">{randomSerie.release_date}</span>
            </div>
            {/* <AddMyListButton film={randomSerie} /> */}
            <p className="pr-20 mt-5 font-thin">{randomSerie.overview}</p>
          </div>
          <div className="w-1/2">
            <img
              className=""
              src={`https://image.tmdb.org/t/p/original/${randomSerie.backdrop_path}`}
              alt=""
            />
          </div>
        </div>
      )}
    </>
  );
}
