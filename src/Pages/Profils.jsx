import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import AddProfil from "./AddProfil";
import { useNavigate } from "react-router-dom";
import Logo from "../Components/Logo";
import { addActiveUser } from "../features/profils";
import axios from "axios";
import toast from "react-hot-toast";

export default function Profils() {
  const profils = useSelector((state) => state.profils);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profilList, setProfilList] = useState([]);
  const [edit, setEdit] = useState(false);

  // Chargement des profils enregistrés
  useEffect(() => {
    axios
      .get("https://copyflix-json-server.onrender.com/Profils")
      .then((res) => setProfilList(res.data));
  }, [profilList]);

  // Selection du profil et navigation vers la homepage
  function handleClick(el) {
    navigate("/Copyflix/home");
    dispatch(addActiveUser(el));
  }

  function HandleAddProfil() {
    if (profilList.length === 5) {
      toast.error("Vous ne pouvez pas ajouter d'autres profils");
    } else {
      setShowModal(!showModal);
    }
  }

  // Supprimer un profil
  function deleteProfil(id) {
    axios.delete(`https://copyflix-json-server.onrender.com/Profils/${id}`);
  }

  return (
    <div className="h-screen bg-black flex items-start pt-40 md:pt-0 md:items-center justify-center">
      <Logo />
      <div className="w-1/2">
        <h1 className="text-white text-3xl md:text-5xl text-center">
          Qui est-ce?
        </h1>
        <ul className="flex flex-col md:flex-row items-center justify-center mt-16 h-60">
          {profilList.map((el) => (
            <li
              key={el.id}
              className="w-20 md:w-32 flex flex-col items-center cursor-pointer mx-5"
            >
              <img
                onClick={() => handleClick(el)}
                className="object-cover rounded"
                src={el.image}
                alt=""
              />
              <span className=" text-slate-400 text-lg mt-4">{el.name}</span>
              {edit && (
                <button
                  onClick={() => deleteProfil(el.id)}
                  className="text-white bg-red-500 w-full px-3 rounded-lg text-xl mt-2"
                >
                  Supprimer
                </button>
              )}
            </li>
          ))}

          <li className="flex flex-col items-center justify-center w-16 md:w-28 mx-5 mt-8 md:mt-0">
            <button
              onClick={() => HandleAddProfil()}
              className="bg-gray-500 rounded-full text-black text-[100px] md:text-[150px] font-bold w-full"
            >
              <img className="py-3 px-4 w-20 md:w-32" src="plus.svg" alt="" />
            </button>
            <span className=" text-slate-400 text-lg w-40 text-center mt-8">
              Ajouter un profil
            </span>
          </li>
        </ul>
        <div className="flex items-center justify-center mt-10">
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
              <img className="w-3 md:w-6 mr-3" src="pen.svg" alt="" /> Mettre à
              jour les profils
            </button>
          )}
        </div>
      </div>
      {profilList.length <= 5 &&
        showModal &&
        createPortal(
          <AddProfil
            closeModal={() => setShowModal(!showModal)}
            setShowModal={setShowModal}
            showModal={showModal}
          />,
          document.body
        )}
    </div>
  );
}
