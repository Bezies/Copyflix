import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../features/home";

export default function NouvelleInscription() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [nom, setNom] = useState("");
  const [nomError, setNomError] = useState(false);
  const [prenom, setPrenom] = useState("");
  const [prenomError, setPrenomError] = useState(false);
  const [mail, setMail] = useState("");
  const [mailError, setMailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState(false);

  // SHOW PASSWORD
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const PasswordRef = useRef();
  const PasswordConfirm = useRef();

  function handleShowPassword() {
    if (!showPassword) {
      setShowPassword(!showPassword);
      PasswordRef.current.type = "text";
    } else {
      setShowPassword(!showPassword);
      PasswordRef.current.type = "password";
    }
  }

  function handleShowConfirmPassword() {
    if (!showConfirmPassword) {
      setShowConfirmPassword(!showConfirmPassword);
      PasswordConfirm.current.type = "text";
    } else {
      setShowConfirmPassword(!showConfirmPassword);
      PasswordConfirm.current.type = "password";
    }
  }

  function handleSubmit(e) {
    // e.preventDefault();
    const regExMail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    setNomError(false);
    setPrenomError(false);
    setMailError(false);
    setPasswordError(false);
    setPasswordConfirmationError(false);

    if (nom === "") {
      setNomError(true);
    }
    if (prenom === "") {
      setPrenomError(true);
    }
    if (!regExMail.test(mail)) {
      setMailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }
    if (passwordConfirmation !== password) {
      setPasswordConfirmationError(true);
    }
    if (
      !nomError &&
      nomError !== "" &&
      !prenomError &&
      prenom !== "" &&
      !mailError &&
      mail !== "" &&
      !passwordError &&
      password !== "" &&
      !passwordConfirmationError &&
      passwordConfirmation !== "" &&
      password === passwordConfirmation
    ) {
      dispatch(
        addUser({ nom: nom, prenom: prenom, email: mail, password: password })
      );
    } else {
      e.preventDefault();
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
        <div className="flex flex-col w-full items-center justify-center">
          <div className="w-10/12">
            {nomError && (
              <label className="text-red-500" htmlFor="nom">
                Veuillez saisir votre nom
              </label>
            )}
            <input
              onChange={(e) => setNom(e.target.value)}
              id="nom"
              className={` ${
                nomError
                  ? "w-full rounded mb-5 pl-3 py-2 border border-red-500 outline-none"
                  : "w-full rounded mb-5 pl-3 py-2 outline-none"
              }`}
              placeholder="Votre nom"
              type="text"
            />
          </div>
          <div className="w-10/12">
            {prenomError && (
              <label className="text-red-500" htmlFor="nom">
                Veuillez saisir votre prénom
              </label>
            )}
            <input
              onChange={(e) => setPrenom(e.target.value)}
              className={` ${
                prenomError
                  ? "w-full rounded mb-5 pl-3 py-2 border border-red-500 outline-none"
                  : "w-full rounded mb-5 pl-3 py-2 outline-none"
              }`}
              placeholder="Votre prénom"
              type="text"
            />
          </div>
          <div className="w-10/12">
            {mailError && (
              <label className="text-red-500" htmlFor="nom">
                Veuillez saisir votre mail
              </label>
            )}

            <input
              onChange={(e) => setMail(e.target.value)}
              className={` ${
                mailError
                  ? "w-full rounded mb-5 pl-3 py-2 border border-red-500 outline-none"
                  : "w-full rounded mb-5 pl-3 py-2 outline-none"
              }`}
              placeholder="Votre email"
              type="email"
              name=""
              id=""
            />
          </div>
          <div className="w-10/12">
            {passwordError && (
              <label className="text-red-500" htmlFor="nom">
                Veuillez saisir un mot de passe
              </label>
            )}
            {/* {!passwordError && password !== "" && password.length < 8 && (
              <label className="text-red-500" htmlFor="nom">
                Veuillez saisir un mot de passe d'au moins 8 caractères
              </label>
            )} */}
            <div className="relative">
              <input
                ref={PasswordRef}
                onChange={(e) => setPassword(e.target.value)}
                className={` ${
                  passwordError
                    ? "w-full rounded mb-5 pl-3 py-2 border border-red-500 outline-none"
                    : "w-full rounded mb-5 pl-3 py-2 outline-none"
                }`}
                placeholder="Votre mot de passe"
                type="password"
                name=""
                id=""
              />
              {showPassword && (
                <img
                  onClick={() => handleShowPassword()}
                  className={`${
                    passwordError
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
            {passwordConfirmationError && passwordConfirmation === "" && (
              <label className="text-red-500" htmlFor="nom">
                Veuillez confirmer votre mot de passe
              </label>
            )}
            {passwordConfirmation !== "" && passwordConfirmationError && (
              <label className="text-red-500" htmlFor="nom">
                Vos mot de passe ne correspondent pas
              </label>
            )}
            <div className="relative">
              <input
                ref={PasswordConfirm}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full rounded mb-5 pl-3 py-2"
                placeholder="Confirmez mot de passe"
                type="password"
                name=""
                id=""
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
            onClick={(e) => handleSubmit(e)}
            className="py-2 px-5 bg-red-600 text-white font-medium rounded mt-5 w-10/12 cursor-pointer"
          >
            <a href="/login"></a>
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  );
}
