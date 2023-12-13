import React, { useEffect, useState } from "react";
import axios from "axios";
import AddMyListButton from "../Components/AddMyListButton";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Movie() {
  const [recommendations, setRecommendations] = useState([]);
  const [film, setFilm] = useState([]);
  const path = window.location.pathname;
  const navigate = useNavigate();

  function NavigateMovie(el) {
    navigate(`/${el.id}`);
  }

  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/movie${path}?language=en-US&api_key=a4c079c7c15f0025ee0ea973937273b4`
    ).then((res) => setFilm(res.data));
  }, [path]);

  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/movie${path}/recommendations?language=en-US&page=1&api_key=a4c079c7c15f0025ee0ea973937273b4`
    ).then((res) => setRecommendations(res.data.results));
  }, [path]);

  return (
    <>
      {film && (
        <div className="bg-black h-screen">
          <Navbar />
          <div className="  flex items-start pt-10  w-full px-20">
            <div className="text-white w-1/2">
              <h1 className=" text-5xl uppercase mt-5 font-bold">
                {film.original_title}
              </h1>
              <div className="mt-5">
                <span className="font-bold text-green-500">
                  Note: {film.vote_average} / 10
                </span>
                <span className="ml-5 font-thin">{film.release_date}</span>
              </div>
              <p className="pr-20 mt-5 font-thin">{film.overview}</p>
              <div>
                {recommendations.length > 0 && (
                  <h2 className="text-white mt-5">Vous aimerez aussi:</h2>
                )}
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
              <AddMyListButton film={film} />
            </div>
            <div className="w-1/2 mt-32">
              <img
                className=""
                src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`}
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
