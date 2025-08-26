import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    username: "",
    password: "",
  },
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    clearAllUserInfo(state, _action) {
      state.username = "";
      state.password = "";
    },
  },
});

export const { setUsername, setPassword, clearAllUserInfo } =
  userInfoSlice.actions;
export default userInfoSlice.reducer;
