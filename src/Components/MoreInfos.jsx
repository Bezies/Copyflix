import React, { useEffect, useState } from "react";
import AddMyListButton from "./AddMyListButton";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";

export default function MoreInfos({ movie, closeModal }) {
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/movie/${movie.id}/recommendations?language=en-US&page=1&api_key=a4c079c7c15f0025ee0ea973937273b4`
    ).then((res) => setRecommendations(res.data.results));
  }, []);

  function NavigateMovie(el) {
    navigate(`/${el.id}`);
  }

  console.log(recommendations);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" bg-black fixed inset-0 flex items-start pt-10 h-screen w-full px-20"
    >
      <div className="text-white w-1/2">
        <h1 className=" text-5xl uppercase mt-5 font-bold">
          {movie.original_title}
        </h1>
        <div className="mt-5">
          <span className="font-bold text-green-500">
            Note: {movie.vote_average} / 10
          </span>
          <span className="ml-5 font-thin">{movie.release_date}</span>
        </div>
        <p className="pr-20 mt-5 font-thin">{movie.overview}</p>
        <div>
          <h2 className="text-white mt-5">Vous aimerez aussi:</h2>
          <div className="flex">
            {recommendations &&
              recommendations
                .slice(0, 5)
                .map((el) => (
                  <img
                    key={el.id}
                    onClick={() => NavigateMovie(el)}
                    className="rounded h-32 w-20 mr-4 mt-3 cursor-pointer"
                    src={`https://image.tmdb.org/t/p/original/${el.poster_path}`}
                    alt=""
                  />
                ))}
          </div>
        </div>
        <AddMyListButton film={movie} />
      </div>
      <div className="w-1/2 mt-32">
        <img
          className=""
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt=""
        />
      </div>

      <button
        onClick={closeModal}
        className="absolute top-10 right-20 bg-white text-black rounded-full"
      >
        <span className="px-5 py-3 text-3xl block">X</span>
      </button>
    </div>
  );
}
