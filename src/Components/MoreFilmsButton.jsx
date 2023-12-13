import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../features/filmsDB";

export default function MoreFilmsButton() {
  const filmsDB = useSelector((state) => state.filmsDB);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(changePage(filmsDB.page))}
      className={`${
        filmsDB.ResearchList.length > 0
          ? "border border-slate-300 text-slate-300 text-lg mt-5 px-10 py-4 ml-10 rounded"
          : "hidden"
      }`}
    >
      Voir plus
    </button>
  );
}
