import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addActiveUser } from "../features/profils";
import Logo from "../Components/Logo";

export default function Login() {
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Show password on click
  const [showPassword, setShowPassword] = useState(false);
  const PasswordRef = useRef();

  // function handleShowPassword() {
  //   if (!showPassword) {
  //     setShowPassword(!showPassword);
  //     PasswordRef.current.type = "text";
  //   } else {
  //     setShowPassword(!showPassword);
  //     PasswordRef.current.type = "password";
  //   }
  // }

  // SUBMIT FORM
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data.password);
    axios
      .get(
        `https://copyflix-json-server.onrender.com/users?mail=${data.email}&password=${data.password}`
      )
      .then((res) => {
        if (res.data.length > 0) {
          toast.success("Connexion réussie");
          navigate("/Copyflix/profils");
          dispatch(addActiveUser(res.data[0].prenom));
        } else {
          toast.error("Identifiant ou mot de passe invalide");
        }
      });
  }

  console.log(PasswordRef);

  return (
    <div className="h-screen bg-[url('/home/background.webp')] bg-cover flex items-center justify-center">
      <Logo />
      <div className="w-10/12 md:w-1/2 lg:w-1/4 bg-black/60  pt-5">
        <h2 className="text-white text-xl md:text-2xl font-semibold text-center">
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
          <div className="w-10/12 relative">
            <input
              {...register("password")}
              className="rounded w-full  bg-gray-700 text-white text-sm py-2 pl-5 mt-5 outline-none "
              placeholder="Mot de passe"
              type="password"
              id="password"
              // ref={PasswordRef}
              autoComplete="none"
            />
            {/* {showPassword ? (
              <img
                onClick={() => handleShowPassword()}
                className="absolute right-5 top-7 cursor-pointer"
                src="eye-slash-solid-w.svg"
              />
            ) : (
              <img
                onClick={() => handleShowPassword()}
                className="absolute right-5 top-7 cursor-pointer"
                src="eye-solid-w.svg"
              />
            )} */}
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
          <button
            className="text-white font-medium hover:underline"
            onClick={() => navigate("/Copyflix/inscription")}
          >
            Inscrivez-vous
          </button>
        </p>
      </div>
    </div>
  );
}
