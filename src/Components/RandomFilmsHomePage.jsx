import React, { useEffect, useMemo, useRef } from "react";
import { intRange } from "aimless.js";
import { useSelector } from "react-redux";
import AddMyListButton from "./AddMyListButton";
import { useState } from "react";
import { createPortal } from "react-dom";
import MoreInfos from "./MoreInfos";
import { easeOut, motion, AnimatePresence } from "framer-motion";

export default function RandomFilmsHomePage() {
  const filmsDB = useSelector((state) => state.filmsDB);
  const [random, setRandom] = useState(intRange(0, filmsDB.popular.length));
  const randomFilm = filmsDB.popular[random];
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setRandom((state) => intRange(0, filmsDB.popular.length));
    }, 10000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <>
      {filmsDB.popular && randomFilm && (
        <AnimatePresence>
          <div
            className={
              "px-5 md:px-20 bg-black flex flex-col md:flex-row items-start w-full"
            }
          >
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 40, opacity: 1 }}
              transition={{
                duration: 3,
                delay: 0.5,
                repeat: Infinity,
                repeatDelay: 10,
              }}
              className="text-white w-full md:w-1/2"
            >
              <p className="mt-10 text-lg md:text-2xl font-thin">
                <span className="font-bold">COPYFLIX</span> present
              </p>
              <h1 className="text-2xl md:text-5xl uppercase mt-5 font-bold">
                {randomFilm.original_title}
              </h1>
              <div className="mt-5 text-sm md:text-base">
                <span className="font-bold text-green-500">
                  Note: {randomFilm.vote_average} / 10
                </span>
                <span className="ml-5 font-thin">
                  {randomFilm.release_date}
                </span>
              </div>
              <p className="pr-20 mt-5 font-thin text-sm md:text-base">
                {randomFilm.overview}
              </p>

              <div className="flex items-center mb-5 md:mb-0">
                <AddMyListButton film={randomFilm} />
                <button
                  onClick={() => setShowModal(!showModal)}
                  className="flex items-center justify-center bg-gray-200/20 text-sm md:text-base px-2 md:px-5 mt-8 md:ml-5 rounded py-2 md:py-4"
                >
                  <span className="block border border-white px-2 py-0 md:py-1 rounded-full mr-3 text-xs md:text-sm">
                    <img src="info-solid.svg" alt="icon info" />
                  </span>
                  Plus d'infos
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: +200, opacity: 0 }}
              animate={{ x: 40, opacity: 1 }}
              transition={{
                duration: 3,
                delay: 0.5,
                repeat: Infinity,
                repeatDelay: 10,
              }}
              className="w-full md:w-1/2"
            >
              <img
                src={`https://image.tmdb.org/t/p/original/${randomFilm.backdrop_path}`}
                alt=""
              />
            </motion.div>
            {showModal &&
              createPortal(
                <MoreInfos
                  movie={randomFilm}
                  closeModal={() => setShowModal(!showModal)}
                />,
                document.body
              )}
          </div>
        </AnimatePresence>
      )}
    </>
  );
}
