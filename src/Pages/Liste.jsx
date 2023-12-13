import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { AddInMyList } from "../features/filmsDB";

export default function Liste() {
  const filmsDB = useSelector((state) => state.filmsDB);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const [MyList, setMyList] = useState([]);

  useEffect(() => {
    axios
      .get("https://copyflix-json-server.onrender.com/MyList")
      .then((res) => setMyList(res.data));
  }, [MyList]);

  return (
    <div className="bg-black">
      <Navbar />
      <div className="bg-black min-h-screen flex flex-col items-start justify-start px-20 mt-20">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-white pl-3 text-3xl">Mes films favoris</h1>
            {edit ? (
              <button
                onClick={() => setEdit(!edit)}
                className="flex text-white items-center"
              >
                <span className="bg-green-500 flex items-center justify-center px-2 py-2 mr-3 rounded">
                  <img src="check.svg" alt="" />
                </span>
                Valider ma liste
              </button>
            ) : (
              <button
                onClick={() => setEdit(!edit)}
                className="flex text-white"
              >
                <img className="w-6 mr-3" src="pen.svg" alt="" /> Editer ma
                liste
              </button>
            )}
          </div>
          <div className="flex mt-5">
            {MyList.length === 0 && (
              <p className="text-white text-xl pl-3">Votre liste est vide...</p>
            )}

            {MyList.length > 0 &&
              MyList.map((fav) => (
                <div
                  key={fav.id}
                  className="p-3 rounded cursor-pointer relative"
                >
                  <img
                    className="h-72 w-48 object-cover object-center"
                    src={`https://image.tmdb.org/t/p/original/${fav.poster_path}`}
                    alt=""
                  />
                  {edit && (
                    <button
                      onClick={() => dispatch(AddInMyList(fav))}
                      className="text-white bg-red-500 w-full px-3 rounded-lg text-xl mt-5"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
        {/* <div className="mt-10 ">
          <h1 className="text-white pl-3 text-3xl">Mes series favorites</h1>
          <div className="flex mt-5">
            {MyList.length === 0 && (
              <p className="text-white text-xl pl-3">Votre liste est vide...</p>
            )}

            {MyList.length > 0 &&
              MyList.map((fav) => (
                <div key={fav.id} className="p-3 rounded cursor-pointer">
                  <img
                    className="h-72 w-48 object-cover object-center"
                    src={`https://image.tmdb.org/t/p/original/${fav.poster_path}`}
                    alt=""
                  />
                </div>
              ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
