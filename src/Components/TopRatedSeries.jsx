import React from "react";
import { addTopRatedSeries } from "../features/SerieDB";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TopRatedSeries() {
  const SerieDB = useSelector((state) => state.SerieDB);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=a4c079c7c15f0025ee0ea973937273b4`
      )
      .then((res) => {
        setLoading(false);
        dispatch(addTopRatedSeries(res.data.results));
      });
  }, []);

  return (
    <>
      <h2 className="text-white pl-3 text-3xl mb-10">Top rated Series</h2>
      <div className="flex flex-wrap justify-start">
        {SerieDB.topRatedSeries &&
          SerieDB.topRatedSeries.length > 0 &&
          SerieDB.topRatedSeries.map((serie) => (
            <div key={serie.id} className="p-3 rounded cursor-pointer">
              <img
                className="w-48 h-72 object-cover object-top"
                src={`https://image.tmdb.org/t/p/original/${serie.poster_path}`}
                alt=""
              />
            </div>
          ))}
      </div>
    </>
  );
}
