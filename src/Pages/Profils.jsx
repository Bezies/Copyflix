import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";
import AddProfil from "./AddProfil";
import { useNavigate } from "react-router-dom";

export default function Profils() {
  const profils = useSelector((state) => state.profils);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    navigate("/home");
  }

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <h1 className="fixed top-10 left-10 uppercase font-bold text-red-600 text-6xl">
        COPYFLIX
      </h1>

      <div className="w-1/2">
        <h1 className="text-white text-5xl text-center">Qui est-ce?</h1>
        <ul className="flex items-center justify-center mt-10 h-60">
          {profils.accounts.map((el) => (
            <li
              onClick={() => handleClick()}
              key={el.id}
              className="w-32 flex flex-col items-center cursor-pointer mx-5"
            >
              <img className="object-cover rounded" src={el.image} alt="" />
              <span className=" text-slate-400 text-lg mt-4">{el.name}</span>
            </li>
          ))}
          <li className="flex flex-col items-center justify-center w-28 mx-5">
            <button
              onClick={() => setShowModal(!showModal)}
              className="bg-gray-500 rounded-full text-black text-[150px] font-bold w-full"
            >
              <img className="py-3 px-4 w-32" src="plus.svg" alt="" />
            </button>
            <span className=" text-slate-400 text-lg w-40 text-center mt-8">
              Ajouter un profil
            </span>
          </li>
        </ul>
      </div>
      {showModal &&
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
