import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function SelectGenre() {
  const dispatch = useDispatch();
  const [genres, setGenres] = useState();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [genreSelection, setGenreSelection] = useState([]);

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

  function handleResearch() {}

  console.log(genreSelection);

  return (
    <div>
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-black bg-slate-200 rounded-lg px-5 py-2 text-xl"
      >
        Recherche avancée
      </button>
      <div className="flex flex-wrap gap-4 mt-5 pl-3">
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
    </div>
  );
}
