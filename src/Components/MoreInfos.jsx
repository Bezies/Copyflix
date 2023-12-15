import React, { useEffect, useState } from "react";
import AddMyListButton from "./AddMyListButton";
import axios from "axios";

export default function MoreInfos({ movie, closeModal }) {
  const [selection, setSelection] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [navigateFilm, setNavigateFilm] = useState("");
  const [credit, setCredits] = useState([]);

  // Affichage des données des films à partir de more infos ou de la naviagtion par recommandation
  useEffect(() => {
    if (navigateFilm === "") {
      // setSelection(movie);
      axios(
        `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US&api_key=a4c079c7c15f0025ee0ea973937273b4`
      ).then((res) => setSelection(res.data));
      axios(
        `https://api.themoviedb.org/3/movie/${movie.id}/recommendations?language=en-US&page=1&api_key=a4c079c7c15f0025ee0ea973937273b4`
      ).then((res) => setRecommendations(res.data.results));
      axios(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US&api_key=a4c079c7c15f0025ee0ea973937273b4`
      ).then((res) => setCredits(res.data.cast));
    } else {
      axios(
        `https://api.themoviedb.org/3/movie/${navigateFilm}?language=en-US&api_key=a4c079c7c15f0025ee0ea973937273b4`
      ).then((res) => setSelection(res.data));
      axios(
        `https://api.themoviedb.org/3/movie/${navigateFilm}/recommendations?language=en-US&page=1&api_key=a4c079c7c15f0025ee0ea973937273b4`
      ).then((res) => setRecommendations(res.data.results));
      axios(
        `https://api.themoviedb.org/3/movie/${navigateFilm}/credits?language=en-US&api_key=a4c079c7c15f0025ee0ea973937273b4`
      ).then((res) => setCredits(res.data.cast));
    }
  }, [navigateFilm]);

  console.log(selection);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" bg-black fixed inset-0 flex items-center pt-10 h-screen w-full px-20"
    >
      <div className="text-white w-1/2">
        <h1 className=" text-5xl uppercase mt-5 font-bold">
          {selection.original_title}
        </h1>
        <div className="mt-5">
          <span className="font-bold text-green-500">
            Note: {selection.vote_average} / 10
          </span>
          <span className="ml-5 font-thin">{selection.release_date}</span>
        </div>
        <p className="pr-20 mt-5 font-thin">{selection.overview}</p>
        <p className="mt-3 font-semibold">
          <span className="font-thin text-slate-300">Starring: </span>
          {credit && credit.slice(0, 3).map((actor) => `${actor.name}, `)}
        </p>
        <p className="font-semibold">
          <span className="font-thin text-slate-300">Genre: </span>
          {selection.genres && selection.genres.map((el) => `${el.name}, `)}
        </p>
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
                    onClick={() => setNavigateFilm(el.id)}
                    className="rounded h-32 w-20 mr-4 mt-3 cursor-pointer"
                    src={
                      el.poster_path
                        ? `https://image.tmdb.org/t/p/original/${el.poster_path}`
                        : "no-image.jpg"
                    }
                    alt=""
                  />
                ))}
          </div>
        </div>
        <AddMyListButton film={movie} />
      </div>
      <div className="w-1/2">
        <img
          className=""
          src={`https://image.tmdb.org/t/p/original/${selection.backdrop_path}`}
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
