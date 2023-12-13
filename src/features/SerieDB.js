import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ResearchListSeries: [],
  popularSeries: [],
  topRatedSeries: [],
  MovieSearch: "",
  pageSeries: 1,
  MyListSeries: [],
};

export const SerieDB = createSlice({
  name: "SerieDB",
  initialState,
  reducers: {
    addPopularSeries: (state, action) => {
      state.popularSeries = action.payload;
    },
    addTopRatedSeries: (state, action) => {
      state.topRatedSeries = action.payload;
    },
  },
});

export const { addPopularSeries, addTopRatedSeries } = SerieDB.actions;
export default SerieDB.reducer;
