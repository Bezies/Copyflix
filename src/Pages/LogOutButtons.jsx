import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LogOutButtons() {
  const navigate = useNavigate();

  // CHANGER PROFIL
  function handleChangeProfil() {
    navigate("/Copyflix/profils");
  }

  //   DECO
  function handleLogOut() {
    navigate("/Copyflix/");
    localStorage.removeItem("utilisateur");
  }

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="md:absolute md:top-16 md:-right-3 md:z-10 md:w-40 flex flex-col text-white"
    >
      <button
        onClick={() => handleChangeProfil()}
        className="rounded bg-blue-500 mb-5 md:mb-2 px-2 py-1"
      >
        Changer de profil
      </button>
      <button
        onClick={() => handleLogOut()}
        className="bg-red-500 rounded px-2 py-1"
      >
        Déconnexion
      </button>
    </motion.div>
  );
}
