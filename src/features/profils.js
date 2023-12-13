import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  activeUser: "",
  accounts: [
    {
      name: "Quentin",
      image: "profils/image-1.jpg",
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
      state.activeUser = action.payload;
      state.accounts[0].name = action.payload;
    },
    addProfils: (state, action) => {
      state.accounts.push({
        name: action.payload.name,
        image: action.payload.image,
        enfant: action.payload.enfant,
        id: nanoid(4),
      });
    },
  },
});

export const { addActiveUser, addProfils } = profils.actions;
export default profils.reducer;
