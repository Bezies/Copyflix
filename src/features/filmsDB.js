import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  ResearchList: [],
  popular: [],
  topRanked: [],
  MovieSearch: "",
  page: 1,
  MyList: [],
};

export const filmsDB = createSlice({
  name: "filmsDB",
  initialState,
  reducers: {
    addPopular: (state, action) => {
      state.popular = action.payload;
    },
    AddTopRanked: (state, action) => {
      state.topRanked = action.payload;
    },
    addResearch: (state, action) => {
      state.MovieSearch = action.payload;
    },
    addListResearch: (state, action) => {
      state.ResearchList = action.payload;
    },
    changePage: (state, action) => {
      state.page = action.payload + 1;
    },
    AddInMyList: (state, action) => {
      if (
        axios
          .get(
            `https://copyflix-json-server.onrender.com/MyList?id=${action.payload.id}`
          )
          .then((res) => {
            if (res.data.length > 0) {
              axios.delete(
                `https://copyflix-json-server.onrender.com/MyList/${action.payload.id}`
              );
            } else {
              axios.post(
                "https://copyflix-json-server.onrender.com/MyList",
                action.payload
              );
            }
          })
      );
    },
  },
});

export const {
  addPopular,
  addResearch,
  changePage,
  AddTopRanked,
  addListResearch,
  AddInMyList,
  RemoveFavList,
} = filmsDB.actions;
export default filmsDB.reducer;
