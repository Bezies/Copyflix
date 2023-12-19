import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { AddInMyList } from "../features/filmsDB";
import { createPortal } from "react-dom";
import MoreInfos from "../Components/MoreInfos";

export default function Liste() {
  const filmsDB = useSelector((state) => state.filmsDB);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const [MyList, setMyList] = useState([]);

  console.log(MyList);

  // GESTION MODAL
  const [ModalData, SetModalData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("https://copyflix-json-server.onrender.com/MyList")
      .then((res) => setMyList(res.data));
  }, []);

  return (
    <div className="bg-black">
      <Navbar />
      <div className="bg-black min-h-screen flex flex-col items-start justify-start px-5 md:px-20 mt-20">
        <div className="w-full">
          <div className="flex justify-between items-center md:items-center">
            <h1 className="text-white pl-3 text-xl md:text-3xl">
              Mes films favoris
            </h1>
            {edit ? (
              <button
                onClick={() => setEdit(!edit)}
                className="flex text-white items-center text-xs md:text-base "
              >
                <span className="bg-green-500 flex items-center justify-center px-1 md:px-2 py-1 md:py-2 mr-1 md:mr-3 rounded">
                  <img className="w-2 md:w-4" src="check.svg" alt="" />
                </span>
                Valider ma liste
              </button>
            ) : (
              <button
                onClick={() => setEdit(!edit)}
                className="flex items-center text-white text-xs md:text-base"
              >
                <img className="w-3 md:w-6 mr-3" src="pen.svg" alt="" /> Mettre
                à jour ma liste
              </button>
            )}
          </div>
          <div className="flex mt-5">
            {MyList.length === 0 && (
              <p className="text-white text-base md:text-xl pl-3">
                Votre liste est vide...
              </p>
            )}

            {MyList.length > 0 &&
              MyList.map((fav) => (
                <div
                  onClick={() => setShowModal(!showModal)}
                  key={fav.id}
                  className="p-3 rounded cursor-pointer relative"
                >
                  <img
                    onClick={() => SetModalData(fav)}
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
            {showModal &&
              createPortal(
                <MoreInfos
                  closeModal={() => setShowModal(!showModal)}
                  movie={ModalData}
                  fav={MyList}
                />,
                document.body
              )}
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
