import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  activeUser: {
    name: "",
    image: "",
  },
  accounts: [
    {
      name: "Quentin",
      image: "profils/image-2.jpg",
      enfant: false,
      id: nanoid(4),
    },
  ],
};

export const profils = createSlice({
  name: "profils",
  initialState,
  reducers: {
    addActiveUser: (state, action) => {
      state.activeUser.name = action.payload.name;
      state.activeUser.image = action.payload.image;
    },
    addProfils: (state, action) => {
      state.accounts.push({
        name: action.payload.name,
        image: action.payload.image,
        enfant: action.payload.enfant,
        id: nanoid(4),
      });
      axios
        .get(
          `https://copyflix-json-server.onrender.com/Profils?name=${action.payload.name}`
        )
        .then((res) => {
          if (res.data.length > 0) {
            toast.error("Profil deja créé");
          } else if (res.data.length > 4) {
            toast.error("Nombre maximum de profils autorisé");
          } else {
            toast.success("Profil ajouté");
            axios.post("https://copyflix-json-server.onrender.com/Profils", {
              name: action.payload.name,
              image: action.payload.image,
              enfant: action.payload.enfant,
              id: nanoid(4),
            });
          }
        });
    },
  },
});

export const { addActiveUser, addProfils } = profils.actions;
export default profils.reducer;
