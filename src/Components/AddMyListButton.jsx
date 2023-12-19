import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddInMyList, RemoveFavList } from "../features/filmsDB";

export default function AddMyListButton({ film }) {
  const filmsDB = useSelector((state) => state.filmsDB);
  const dispatch = useDispatch();
  const [Fav, setFav] = useState(false);

  function FavList(film) {
    setFav(!Fav);
    if (!Fav) {
      dispatch(AddInMyList(film));
    } else {
      dispatch(AddInMyList(film));
    }
  }

  return (
    <button
      onClick={() => FavList(film)}
      className="bg-gray-200/20 px-2 md:px-5 mt-8 rounded mr-3 md:mr-0"
    >
      {Fav ? (
        <span className="text-green-300 p-2 md:p-4 text-base md:text-xl block">
          Ajouté
        </span>
      ) : (
        <p className="flex items-center">
          <span className="text-base md:text-5xl mb-2 font-thin mr-3">+</span>Ma
          liste
        </p>
      )}
    </button>
  );
}
