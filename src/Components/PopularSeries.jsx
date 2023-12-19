import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularSeries } from "../features/SerieDB";
import { createPortal } from "react-dom";
import MoreSeriesInfos from "./MoreSeriesInfos";

export default function PopularSeries() {
  const SerieDB = useSelector((state) => state.SerieDB);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ModalData, SetModalData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=a4c079c7c15f0025ee0ea973937273b4`
      )
      .then((res) => {
        setLoading(false);
        dispatch(addPopularSeries(res.data.results));
      });
  }, []);

  return (
    <>
      <h2 className="text-white pl-3 text-xl md:text-3xl mb-5 md:mb-10">
        Popular Series
      </h2>
      <div
        onClick={() => setShowModal(!showModal)}
        className="flex flex-wrap justify-start"
      >
        {SerieDB.popularSeries &&
          SerieDB.popularSeries.length > 0 &&
          SerieDB.popularSeries.map((serie) => (
            <div key={serie.id} className="p-3 rounded cursor-pointer">
              <img
                onClick={() => SetModalData(serie)}
                className="h-24 md:h-72 w-16 md:w-48 object-cover object-center"
                src={`https://image.tmdb.org/t/p/original/${serie.poster_path}`}
                alt=""
              />
              {showModal &&
                createPortal(
                  <MoreSeriesInfos
                    closeModal={() => setShowModal(!showModal)}
                    movie={ModalData}
                  />,
                  document.body
                )}
            </div>
          ))}
      </div>
    </>
  );
}
