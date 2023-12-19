import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Hamburger from "hamburger-react";

export default function Navbar() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [research, Setresearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const Users = useSelector((state) => state.profils);

  // STOP SCROLL MENU OPEN
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isOpen]);

  // MENU DETAILS FOR MAP
  const menuArray = [
    {
      name: "Accueil",
      link: "/Copyflix/home",
    },
    {
      name: "Serie",
      link: "/Copyflix/serie",
    },
    {
      name: "Films",
      link: "/Copyflix/films",
    },
    {
      name: "Ma liste",
      link: "/Copyflix/liste",
    },
  ];

  return (
    <div className="flex items-center justify-between px-10 md:px-20 py-5 border-b border-slate-300">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex justify-between items-center w-full">
          <p className="text-red-500 text-lg md:text-3xl font-semibold">
            COPYFLIX
          </p>

          <button className="md:hidden" onClick={() => setOpen(!isOpen)}>
            <Hamburger
              toggled={isOpen}
              size={20}
              direction="right"
              toggle={setOpen}
              duration={0.8}
              color="#fff"
            />
          </button>
        </div>

        {/* NAVBAR DESKTOP */}
        <ul className="hidden md:relative md:flex md:flex-row text-white ml-10 md:ml-20">
          {menuArray.map((el, index) => (
            <li key={index} className="ml-10 text-lg w-16">
              <button
                className="focus:font-semibold"
                onClick={() => navigate(`${el.link}`)}
              >
                {el.name}
              </button>
            </li>
          ))}
        </ul>

        {/* NAVBAR MOBILE  */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              exit={{ y: -500, opacity: 0 }}
              className="fixed flex flex-col items-center top-20 bg-black z-10 w-screen h-screen left-0 text-white md:hidden"
            >
              {menuArray.map((el, index) => (
                <motion.li
                  key={index}
                  initial={{ y: -200, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-2xl mt-10"
                >
                  <button
                    className="focus:font-semibold"
                    onClick={() => navigate(`${el.link}`)}
                  >
                    {el.name}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      <div className="hidden md:flex items-center">
        <span className="text-white">{Users.accounts[0].name}</span>
        <button className="flex items-center">
          {/* <img className="w-3 ml-1" src="chevron-down.svg" alt="" /> */}
          <img
            className="w-8 rounded ml-2"
            src={Users.accounts[0].image}
            alt=""
          />
        </button>
      </div>
    </div>
  );
}
