import { createSlice } from "@reduxjs/toolkit";

const blogInfoSlice = createSlice({
  name: "blogInfo",
  initialState: {
    title: "",
    url: "",
    author: "",
  },
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
    setUrl(state, action) {
      state.url = action.payload;
    },
    setAuthor(state, action) {
      state.author = action.payload;
    },
    clearAllInfo(state, _action) {
      state.title = "";
      state.url = "";
      state.author = "";
    },
  },
});

export const { setTitle, setUrl, setAuthor, clearAllInfo } =
  blogInfoSlice.actions;
export default blogInfoSlice.reducer;
