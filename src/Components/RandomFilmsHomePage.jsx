import React, { useEffect, useMemo } from "react";
import { intRange } from "aimless.js";
import { useSelector } from "react-redux";
import AddMyListButton from "./AddMyListButton";
import { useState } from "react";
import { createPortal } from "react-dom";
import MoreInfos from "./MoreInfos";

export default function RandomFilmsHomePage() {
  useEffect(() => {
    return setRandom(intRange(0, filmsDB.popular.length));
  }, []);

  const filmsDB = useSelector((state) => state.filmsDB);
  const [random, setRandom] = useState("");
  const randomFilm = filmsDB.popular[random];
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {filmsDB.popular && randomFilm && (
        <div className="px-20 bg-black flex items-start w-full">
          <div className="text-white w-1/2">
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
            <p className="pr-20 mt-5 font-thin">{randomFilm.overview}</p>
          </div>
          <div className="w-1/2">
            <img
              className=""
              src={`https://image.tmdb.org/t/p/original/${randomFilm.backdrop_path}`}
              alt=""
            />
          </div>
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
