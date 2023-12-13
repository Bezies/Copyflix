import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addListResearch } from "../features/filmsDB";
import MoreFilmsButton from "./MoreFilmsButton";

export default function SearchFilms() {
  const filmsDB = useSelector((state) => state.filmsDB);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${filmsDB.MovieSearch}&include_adult=false&language=en-US&page=${filmsDB.page}&api_key=a4c079c7c15f0025ee0ea973937273b4
       `
      )
      .then((res) => {
        setLoading(false);
        dispatch(addListResearch(res.data.results));
      });
  }, [filmsDB.MovieSearch, filmsDB.page]);

  return (
    <>
      <h2 className="text-white pl-3 text-3xl mb-10 text-center">
        Your research
      </h2>
      <div className="flex flex-wrap justify-start">
        {filmsDB.ResearchList &&
          filmsDB.ResearchList.map((movie) => (
            <div key={movie.id} className="p-3 rounded cursor-pointer">
              <img
                className="h-72 w-48 object-cover object-center"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt=""
              />
              {/* <p className="text-white text-xl mt-3">{movie.Title}</p> */}
            </div>
          ))}
        <div className="flex items-center justify-center">
          <MoreFilmsButton />
        </div>
      </div>

      {filmsDB.ResearchList.length === 0 && (
        <div>
          <p className="text-white pl-3 text-xl">
            Plus aucun film à afficher...
          </p>
        </div>
      )}
    </>
  );
}
