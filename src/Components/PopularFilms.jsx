import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopular } from "../features/filmsDB";
import { createPortal } from "react-dom";
import MoreInfos from "./MoreInfos";

export default function PopularFilms() {
  const filmsDB = useSelector((state) => state.filmsDB);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=a4c079c7c15f0025ee0ea973937273b4
   `
      )
      .then((res) => {
        setLoading(false);
        dispatch(addPopular(res.data.results));
      });
  }, []);

  return (
    <>
      <h2 className="text-white pl-3 text-3xl mb-10">Popular films</h2>
      <div className="flex flex-wrap grow justify-start">
        {filmsDB.popular &&
          filmsDB.popular.map((movie) => (
            <div
              onClick={() => setShowModal(!showModal)}
              key={movie.id}
              className="p-3 rounded cursor-pointer"
            >
              <img
                className="h-72 w-48 object-cover object-center"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={`poster of ${movie.original_title}`}
              />
              {showModal &&
                createPortal(
                  <MoreInfos
                    closeModal={() => setShowModal(!showModal)}
                    movie={movie}
                  />,
                  document.body
                )}
            </div>
          ))}
      </div>
    </>
  );
}
