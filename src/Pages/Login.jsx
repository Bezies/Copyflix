import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addActiveUser } from "../features/profils";

export default function Login() {
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    axios
      .get(
        `http://localhost:8000/users?mail=${data.email}&password=${data.password}`
      )
      .then((res) => {
        if (res.data.length > 0) {
          toast.success("Connexion réussie");
          navigate("/profils");
          dispatch(addActiveUser(res.data[0].prenom));
        } else {
          toast.error("Identifiant ou mot de passe invalide");
        }
      });
  }

  return (
    <div className="h-screen bg-[url('home/background.webp')] bg-cover flex items-center justify-center">
      <h1 className="fixed top-10 left-10 uppercase font-bold text-red-600 text-6xl">
        COPYFLIX
      </h1>
      <div className="w-1/4 bg-black/60  pt-5">
        <h2 className="text-white text-2xl font-semibold text-center">
          S'identifier
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center"
        >
          <div className="w-10/12">
            <input
              {...register("email", { required: true })}
              className="rounded bg-gray-700 text-white text-sm py-2 pl-5 w-full mt-5 outline-none"
              placeholder="Votre E-mail"
              type="text"
            />
          </div>
          <div className="w-10/12">
            <input
              {...register("password")}
              className="rounded w-full  bg-gray-700 text-white text-sm py-2 pl-5 mt-5 outline-none "
              placeholder="Mot de passe"
              type="password"
              id="password"
              autoComplete="none"
            />
          </div>

          <button
            type="submit"
            className="py-2 px-5 bg-red-600 text-white font-medium rounded mt-5 w-10/12"
          >
            S'identifier
          </button>
        </form>

        <p className="pb-10 text-slate-400 mt-5 text-center">
          Première visite sur Copyflix?{" "}
          <a
            className="text-white font-medium hover:underline"
            href="/inscription"
          >
            Inscrivez-vous
          </a>
        </p>
      </div>
    </div>
  );
}
