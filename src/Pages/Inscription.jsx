import React from "react";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Inscription() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  function onSubmit(data) {
    if (data.password !== data.passwordConfirm) {
      toast.error("les mots de passe ne correspondent pas");
    } else {
      axios.get(`http://localhost:8000/users?mail=${data.mail}`).then((res) => {
        if (res.data.length > 0) {
          toast.error("Un compte existe deja avec cette adresse mail");
        } else {
          axios.post("http://localhost:8000/users", data).then((res) => {
            toast.success("Inscription confirmée");
            navigate("/");
          });
        }
      });
    }
  }

  // SHOW PASSWORD
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const PasswordRef = useRef();
  const PasswordConfirm = useRef();

  function handleShowPassword() {
    if (!showPassword) {
      setShowPassword(!showPassword);
      document.getElementById("password").type = "text";
    } else {
      setShowPassword(!showPassword);
      document.getElementById("password").type = "password";
    }
  }

  function handleShowConfirmPassword() {
    if (!showConfirmPassword) {
      setShowConfirmPassword(!showConfirmPassword);
      document.getElementById("ConfirmPassword").type = "text";
    } else {
      setShowConfirmPassword(!showConfirmPassword);
      document.getElementById("ConfirmPassword").type = "password";
    }
  }

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <h1 className="fixed top-10 left-10 uppercase font-bold text-red-600 text-6xl">
        COPYFLIX
      </h1>
      <div className="flex flex-col items-center justify-center w-1/4">
        <h1 className="text-white font-medium text-center text-2xl mb-5">
          Inscription
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full items-center justify-center"
        >
          <div className="w-10/12">
            {errors.nom && (
              <label className="text-red-500" htmlFor="nom">
                Veuillez saisir votre nom
              </label>
            )}
            <input
              autoComplete="none"
              {...register("nom", { required: true, minLength: 2 })}
              id="nom"
              className="w-full rounded mb-5 pl-3 py-2 outline-none"
              placeholder="Votre nom"
              type="text"
            />
          </div>
          <div className="w-10/12">
            {errors.prenom && (
              <label className="text-red-500" htmlFor="nom">
                Veuillez saisir votre prénom
              </label>
            )}
            <input
              {...register("prenom", { required: true, minLength: 2 })}
              className="w-full rounded mb-5 pl-3 py-2 outline-none"
              placeholder="Votre prénom"
              autoComplete="none"
              type="text"
            />
          </div>
          <div className="w-10/12">
            {errors.mail && (
              <label className="text-red-500" htmlFor="nom">
                Veuillez saisir un mail valide
              </label>
            )}

            <input
              {...register("mail", {
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                required: true,
              })}
              className="w-full rounded mb-5 pl-3 py-2 outline-none"
              placeholder="Votre email"
              type="text"
              autoComplete="none"
              id=""
            />
          </div>
          <div className="w-10/12">
            {errors.password && (
              <label className="text-red-500" htmlFor="nom">
                Veuillez saisir un mot de passe de 8 caractères minimum
              </label>
            )}
            <div className="relative">
              <input
                {...register("password")}
                id="password"
                className="w-full rounded mb-5 pl-3 py-2 outline-none"
                placeholder="Votre mot de passe"
                autoComplete="none"
                type="password"
              />
              {showPassword && (
                <img
                  onClick={() => handleShowPassword()}
                  className={`${
                    errors.password
                      ? "absolute right-5 top-6 cursor-pointer"
                      : "absolute right-5 top-3 cursor-pointer"
                  }`}
                  src="eye-slash-solid.svg"
                />
              )}
              {!showPassword && (
                <img
                  onClick={() => handleShowPassword()}
                  className="absolute right-5 top-3 cursor-pointer"
                  src="eye-solid.svg"
                />
              )}
            </div>
          </div>
          <div className="w-10/12 relative">
            {errors.passwordConfirm && (
              <label className="text-red-500" htmlFor="nom">
                Veuillez confirmer votre mot de passe
              </label>
            )}
            {/* {passwordConfirmation !== "" && passwordConfirmationError && (
              <label className="text-red-500" htmlFor="nom">
                Vos mot de passe ne correspondent pas
              </label>
            )} */}
            <div className="relative">
              <input
                {...register("passwordConfirm")}
                id="ConfirmPassword"
                className="w-full rounded mb-5 pl-3 py-2"
                placeholder="Confirmez mot de passe"
                type="password"
                autoComplete="none"
              />
              {showConfirmPassword && (
                <img
                  onClick={() => handleShowConfirmPassword()}
                  className="absolute right-5 top-3 cursor-pointer"
                  src="eye-slash-solid.svg"
                />
              )}
              {!showConfirmPassword && (
                <img
                  onClick={() => handleShowConfirmPassword()}
                  className="absolute right-5 top-3 cursor-pointer"
                  src="eye-solid.svg"
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="py-2 px-5 bg-red-600 text-white font-medium rounded mt-5 w-10/12 cursor-pointer"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}
