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
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="pl-10">
        <div className="border-b border-slate-500 pb-10">
          <h1 className="text-white text-6xl">Ajouter un profil</h1>
          <p className="text-gray-400 text-lg mt-5  ">
            Ajouter un profil pour un nouvel utilisateur
          </p>
        </div>
        <div className="flex items-center mt-10 border-b border-slate-500 pb-10">
          <img
            className="w-32 mt-5 rounded"
            src={`profils/image-${image}.jpg`}
            alt=""
          />
          <input
            onChange={(e) => SetProfilName(e.target.value)}
            className="bg-gray-400 rounded ml-20 text-white outline-none pl-5 py-2"
            type="text"
          />
          <div className="flex items-center">
            <input
              onChange={(e) => handleCheck(e)}
              className="ml-10"
              type="checkbox"
              name=""
              id="enfant"
            />
            <label className=" text-white ml-2 text-xl" htmlFor="enfant">
              Enfant?
            </label>
          </div>
        </div>
        <div className="mt-10 flex">
          <button
            onClick={() => handleSubmit()}
            className="bg-white text-black uppercase px-5 py-2 rounded"
          >
            Continuer
          </button>
          <button
            onClick={closeModal}
            className="text-slate-500 border border-slate-500 px-5 py-2 rounded uppercase ml-10"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
