import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function SelectGenre() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [genres, setGenres] = useState();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [genreSelection, setGenreSelection] = useState([]);
  const [genreResearch, setGenreResearch] = useState("");
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);

  // Liste des différents genres
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=a4c079c7c15f0025ee0ea973937273b4`
      )
      .then((res) => {
        dispatch(setGenres(res.data.genres));
      });
  }, []);

  // Genres selectionnés
  function handleSelect(e) {
    if (e.target.checked) {
      setGenreSelection([...genreSelection, e.target.id]);
    }
  }

  function handleResearch() {
    setGenreResearch(genreSelection.join("and"));
  }

  // Recherche avancée
  useEffect(() => {
    if (genreResearch !== "") {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreResearch}&api_key=a4c079c7c15f0025ee0ea973937273b4`
        )
        .then((res) => {
          dispatch(setResult(res.data.results));
        });
    }
  }, [genreResearch]);

  console.log(genreResearch);

  return (
    <div>
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-black bg-slate-200 rounded-lg px-5 py-2 text-xl"
      >
        Recherche avancée
      </button>
      <div className="flex flex-wrap gap-4 mt-10 pl-3">
        {genres &&
          showAdvanced &&
          genres.map((genre) => (
            <div key={genre.id} className="mr-5 flex items-center">
              <input
                onChange={(e) => handleSelect(e)}
                type="checkbox"
                name={genre.name}
                id={genre.id}
              />
              <label className="text-white ml-2 text-xl" htmlFor={genre.name}>
                {genre.name}
              </label>
            </div>
          ))}
        {showAdvanced && (
          <button
            onClick={() => handleResearch()}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Rechercher
          </button>
        )}
      </div>
      <div className="flex flex-wrap grow justify-start items-center mt-10">
        {result &&
          result.map((movie) => (
            <div
              onClick={() => setShowModal(!showModal)}
              key={movie.id}
              className="p-3 rounded cursor-pointer"
            >
              <img
                onClick={() => SetModalData(movie)}
                className="h-72 w-48 object-cover object-center"
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
            className="border border-slate-300 text-slate-300 text-lg mt-5 px-10 py-4 ml-10 rounded"
          >
            Voir plus
          </button>
        )}
      </div>
    </div>
  );
}
