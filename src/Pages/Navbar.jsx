import { Input } from "postcss";
import React, { useState } from "react";
import { addResearch } from "../features/filmsDB";
import { useDispatch } from "react-redux";
import { changePage } from "../features/filmsDB";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [research, Setresearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSearch() {
    if (!showSearchBar) {
      setShowSearchBar(true);
    } else {
      dispatch(changePage(0));
      dispatch(addResearch(research));
    }
  }
  return (
    <div className="flex items-center justify-between px-20 py-5 border-b border-slate-300">
      <div className="flex items-center">
        <p className="text-red-500 text-3xl font-semibold">COPYFLIX</p>
        <ul className="flex text-white ml-20">
          <li className="ml-10 text-lg">
            <button
              className="focus:font-semibold"
              onClick={() => navigate("/Copyflix/home")}
            >
              Accueil
            </button>
          </li>
          <li className="ml-10 text-lg">
            <button
              className="focus:font-semibold"
              onClick={() => navigate("/Copyflix/serie")}
            >
              Serie
            </button>
          </li>
          <li className="ml-10 text-lg">
            <button className="focus:font-semibold" href="#">
              Films
            </button>
          </li>
          <li className="ml-10 text-lg">
            <button
              className="focus:font-semibold"
              onClick={() => navigate("/Copyflix/liste")}
            >
              Ma liste
            </button>
          </li>
        </ul>
      </div>
      <div className="flex items-center">
        {showSearchBar && (
          <input
            onChange={(e) => Setresearch(e.target.value)}
            className="mr-5 outline-none rounded pl-3"
            type="text"
          />
        )}
        <button onClick={() => handleSearch()}>
          <img className="w-8" src="loupe-w.svg" alt="icon loupe" />
        </button>
      </div>
    </div>
  );
}
