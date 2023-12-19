import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import MoreInfos from "./MoreInfos";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function SelectGenre() {
  const dispatch = useDispatch();

  // Modal & ModalData
  const [showModal, setShowModal] = useState(false);
  const [ModalData, SetModalData] = useState([]);

  // Genres state
  const [genres, setGenres] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [genreSelection, setGenreSelection] = useState("");

  // Gestion des pages
  const [page, setPage] = useState(1);

  // Gestion du tri (popularity par defaut)
  const [sort, setSort] = useState("popularity.desc");

  // Resultats de la recherche
  const [result, setResult] = useState([]);

  // Liste des différents genres
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=a4c079c7c15f0025ee0ea973937273b4`
      )
      .then((res) => {
        setGenres(res.data.genres);
      });
  }, []);

  // Genres selectionnés
  function handleSelect(e) {
    setGenreSelection(e.target.value);
  }

  // Mode de tri
  function handleSort(e) {
    setSort(e.target.value);
  }

  // Recherche par film
  const [filmsResearch, setFilmsResearch] = useState("");

  useEffect(() => {
    if (filmsResearch !== "") {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${filmsResearch}&include_adult=false&language=en-US&page=1&api_key=a4c079c7c15f0025ee0ea973937273b4`
        )
        .then((res) => {
          setResult(res.data.results);
        });
    }
  }, [filmsResearch]);

  // Recherche avancée
  useEffect(() => {
    if (filmsResearch === "") {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sort}&with_genres=${genreSelection}&api_key=a4c079c7c15f0025ee0ea973937273b4`
        )
        .then((res) => {
          setResult(res.data.results);
        });
    }
  }, [genreSelection, page, sort]);

  // ANIMATION
  const boxVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <div className="flex flex-col md:items-start md:flex-row">
      <div>
        {!showAdvanced ? (
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center text-slate-200 rounded pl-5 py-1 text-lg border border-slate-200"
          >
            Search
            <span className="block w-4 ml-4 mr-5">
              <img src="loupe-w.svg" alt="" />
            </span>
          </button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex justify-center border border-slate-200 p-3 rounded"
          >
            <img className="w-5" src="arrow-left-solid-w.svg" alt="" />
          </motion.button>
        )}
        {showAdvanced && (
          <AnimatePresence>
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.5 }}
            >
              {showAdvanced && (
                <div
                  className={"mt-5 flex flex-col items-center justify-center"}
                >
                  <div className="relative">
                    <input
                      onChange={(e) => setFilmsResearch(e.target.value)}
                      placeholder="Chercher par nom..."
                      className="bg-black text-slate-200 rounded py-1 outline-none border border-slate-200 text-sm pl-3"
                      type="text"
                    />
                    <img
                      className="w-4 absolute top-1/2 right-4 -translate-y-1/2"
                      src="loupe-w.svg"
                      alt=""
                    />
                  </div>
                  <label
                    className="text-white mt-5 font-semibold text-lg"
                    htmlFor="tri"
                  >
                    Trier par:
                  </label>
                  <select
                    onChange={(e) => handleSort(e)}
                    className="block px-4 py-2 rounded mt-3 bg-black text-slate-200 text-center border border-slate-200"
                    name="tri"
                    id="tri"
                  >
                    <option value="popularity.desc">Popularity</option>
                    <option value="primary_release_date.desc">
                      Primary release
                    </option>
                    <option value="vote_average.desc">Vote</option>
                  </select>
                </div>
              )}

              <div className={"flex flex-col mt-5"}>
                <h2 className="text-white text-center font-semibold text-lg">
                  Chercher par genre:
                </h2>

                {genres &&
                  genres.map((el) => (
                    <button
                      className="text-white text-lg py-1 focus:bg-blue-500 rounded"
                      key={el.id}
                      value={el.id}
                      onClick={(e) => handleSelect(e)}
                    >
                      {el.name}
                    </button>
                  ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      <div className="flex flex-wrap justify-start items-center md:ml-10 mt-10 md:mt-0">
        {result &&
          result
            .filter((el) => el.poster_path !== null)
            .map((movie) => (
              <div
                onClick={() => setShowModal(!showModal)}
                key={movie.id}
                className="p-3 rounded cursor-pointer"
              >
                <img
                  onClick={() => SetModalData(movie)}
                  className="h-24 md:h-72 w-16 md:w-48 object-cover object-center"
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={`poster of ${movie.original_title}`}
                />
                {showModal &&
                  createPortal(
                    <MoreInfos
                      closeModal={() => setShowModal(!showModal)}
                      movie={ModalData}
                    />,
                    document.body
                  )}
              </div>
            ))}
        {result.length > 0 && (
          <button
            onClick={() => setPage(page + 1)}
            className="border border-slate-300 text-slate-300 text-lg mt-5 px-10 py-2 rounded-lg hover:scale-110 transition ease-in-out duration-200 ml-3"
          >
            Voir plus
          </button>
        )}
      </div>
    </div>
  );
}
