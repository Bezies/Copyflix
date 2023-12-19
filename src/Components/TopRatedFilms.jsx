import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddTopRanked } from "../features/filmsDB";
import { createPortal } from "react-dom";
import MoreInfos from "./MoreInfos";

export default function TopRatedFilms() {
  const filmsDB = useSelector((state) => state.filmsDB);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ModalData, SetModalData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=a4c079c7c15f0025ee0ea973937273b4`
      )
      .then((res) => {
        setLoading(false);
        dispatch(AddTopRanked(res.data.results));
      });
  }, []);

  return (
    <>
      <h2 className="text-white pl-3 text-xl md:text-3xl mb-5 md:mb-10 text-center">
        Top rated
      </h2>
      <div className="flex flex-wrap justify-start">
        {filmsDB.topRanked &&
          filmsDB.topRanked.map((movie) => (
            <div
              onClick={() => setShowModal(!showModal)}
              key={movie.id}
              className="p-3 rounded cursor-pointer"
            >
              <img
                onClick={() => SetModalData(movie)}
                className="h-24 md:h-72 w-16 md:w-48 object-cover object-center"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={`affiche ${movie.original_title}`}
              />
              {showModal &&
                createPortal(
                  <MoreInfos
                    movie={ModalData}
                    closeModal={() => setShowModal(!showModal)}
                  />,
                  document.body
                )}
            </div>
          ))}
      </div>
    </>
  );
}
