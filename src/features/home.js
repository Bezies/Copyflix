import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {},
};

export const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { addUser } = users.actions;
export default users.reducer;
