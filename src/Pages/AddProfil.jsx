import React, { useEffect, useState } from "react";
import { addProfils } from "../features/profils";
import { useDispatch } from "react-redux";

export default function AddProfil({ closeModal, setShowModal, showModal }) {
  const [enfant, setEnfant] = useState(false);
  const [profilName, SetProfilName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setImage(Math.floor(Math.random() * 9) + 1);
  }, []);

  const dispatch = useDispatch();

  function handleCheck(e) {
    if (e.target.checked) {
      setEnfant(true);
    } else {
      setEnfant(false);
    }
  }

  function handleSubmit() {
    dispatch(
      addProfils({
        name: profilName,
        enfant: enfant,
        image: `profils/image-${image}.jpg`,
      })
    );
    setShowModal(!showModal);
  }

  return (
    <div className="fixed inset-0 bg-black flex items-start md:items-center justify-center pt-10 md:pt-0">
      <div className="pl-10">
        <div className="flex flex-col items-center border-b border-slate-500 pb-10">
          <h1 className="text-white text-2xl md:text-6xl">Ajouter un profil</h1>
          <p className="text-gray-400 text-base md:text-lg mt-5  ">
            Ajouter un profil pour un nouvel utilisateur
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center mt-10 border-b border-slate-500 pb-10">
          <img
            className="w-32 mt-5 rounded"
            src={`profils/image-${image}.jpg`}
            alt=""
          />
          <input
            onChange={(e) => SetProfilName(e.target.value)}
            className="bg-gray-200/40 rounded mt-5 md:mt-0 md:ml-20 text-white outline-none pl-5 py-2"
            type="text"
          />
          <div className="flex items-center mt-3 md:mt-0">
            <input
              onChange={(e) => handleCheck(e)}
              className="md:ml-10"
              type="checkbox"
              name=""
              id="enfant"
            />
            <label className=" text-white ml-2 text-xl" htmlFor="enfant">
              Enfant?
            </label>
          </div>
        </div>
        <div className="mt-10 flex flex-col md:flex-row ">
          <button
            onClick={() => handleSubmit()}
            className="bg-white text-black uppercase px-5 py-2 rounded"
          >
            Continuer
          </button>
          <button
            onClick={closeModal}
            className="text-slate-500 border border-slate-500 px-5 py-2 rounded uppercase md:ml-10 mt-5 md:mt-0"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
