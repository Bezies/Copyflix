import { configureStore } from "@reduxjs/toolkit";
import filmsDB from "./features/filmsDB";
import users from "./features/home";
import profils from "./features/profils";
import SerieDB from "./features/SerieDB";

export const store = configureStore({
  reducer: {
    filmsDB,
    users,
    profils,
    SerieDB,
  },
});
