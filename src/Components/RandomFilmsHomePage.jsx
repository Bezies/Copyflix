import React, { useEffect, useMemo, useRef } from "react";
import { intRange } from "aimless.js";
import { useSelector } from "react-redux";
import AddMyListButton from "./AddMyListButton";
import { useState } from "react";
import { createPortal } from "react-dom";
import MoreInfos from "./MoreInfos";
import { easeOut, motion } from "framer-motion";

export default function RandomFilmsHomePage() {
  const filmsDB = useSelector((state) => state.filmsDB);
  const [random, setRandom] = useState(intRange(0, filmsDB.popular.length));
  const randomFilm = filmsDB.popular[random];
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandom((random) => intRange(0, filmsDB.popular.length));
    }, 10000);
  }, []);

  return (
    <>
      {filmsDB.popular && randomFilm && (
        <div className={"px-20 bg-black flex items-start w-full"}>
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 40, opacity: 1 }}
            transition={{ duration: 3, delay: 0.5 }}
            className="text-white w-1/2"
          >
            <p className="mt-10 text-2xl font-thin">
              <span className="font-bold">COPYFLIX</span> present
            </p>
            <h1 className=" text-5xl uppercase mt-5 font-bold">
              {randomFilm.original_title}
            </h1>
            <div className="mt-5">
              <span className="font-bold text-green-500">
                Note: {randomFilm.vote_average} / 10
              </span>
              <span className="ml-5 font-thin">{randomFilm.release_date}</span>
            </div>
            <p className="pr-20 mt-5 font-thin">{randomFilm.overview}</p>

            <div className="flex items-center">
              <AddMyListButton film={randomFilm} />
              <button
                onClick={() => setShowModal(!showModal)}
                className="flex items-center bg-gray-200/20 px-5 mt-8 ml-5 rounded py-4"
              >
                <span className="block border border-white px-3 py-1 rounded-full mr-3 text-sm">
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
            className="w-1/2"
          >
            <img
              className=""
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
      )}
    </>
  );
}
