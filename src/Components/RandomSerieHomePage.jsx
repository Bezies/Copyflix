import React, { useEffect, useState } from "react";
import { intRange } from "aimless.js";
import { useSelector } from "react-redux";
import AddMyListButton from "./AddMyListButton";
import { createPortal } from "react-dom";
import MoreSeriesInfos from "./MoreSeriesInfos";
import { motion } from "framer-motion";

export default function RandomSerieHomePage() {
  const SerieDB = useSelector((state) => state.SerieDB);

  // Generation affichage random serie
  const [random, setRandom] = useState(
    intRange(0, SerieDB.popularSeries.length)
  );
  const randomSerie = SerieDB.popularSeries[random];
  useEffect(() => {
    return setRandom(intRange(0, SerieDB.popularSeries.length));
  }, []);

  // MODAL
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {SerieDB.popularSeries && random && (
        <div className="px-10 md:px-20 bg-black flex flex-col md:flex-row items-start w-full">
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 40, opacity: 1 }}
            transition={{ duration: 3, delay: 0.5 }}
            className="text-white w-full md:w-1/2"
          >
            <p className="mt-10 text-lg md:text-2xl font-thin">
              <span className="font-bold">COPYFLIX</span> present
            </p>
            <h1 className="text-2xl md:text-5xl uppercase mt-5 font-bold">
              {randomSerie.name}
            </h1>
            <div className="mt-5 text-sm md:text-base">
              <span className="font-bold text-green-500">
                Note: {randomSerie.vote_average} / 10
              </span>
              <span className="ml-5 font-thin">{randomSerie.release_date}</span>
            </div>
            <p className="pr-20 mt-5 font-thin text-sm md:text-base">
              {randomSerie.overview}
            </p>
            <div className="flex items-center mb-5 md:mb-0">
              <AddMyListButton film={randomSerie} />
              <button
                onClick={() => setShowModal(!showModal)}
                className="flex items-center bg-gray-200/20 text-sm md:text-base px-2 md:px-5 mt-8 md:ml-5 rounded py-2 md:py-4"
              >
                <span className="block border border-white px-2 py-0 md:py-1 rounded-full mr-3 text-xs md:text-sm">
                  i
                </span>
                Plus d'infos
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: +200, opacity: 0 }}
            animate={{ x: 40, opacity: 1 }}
            transition={{ duration: 3, delay: 0.5 }}
            className="w-full md:w-1/2"
          >
            <img
              className=""
              src={`https://image.tmdb.org/t/p/original/${randomSerie.backdrop_path}`}
              alt=""
            />
          </motion.div>
          {showModal &&
            createPortal(
              <MoreSeriesInfos
                movie={randomSerie}
                closeModal={() => setShowModal(!showModal)}
              />,
              document.body
            )}
        </div>
      )}
    </>
  );
}
