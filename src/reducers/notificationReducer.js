import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: null,
    type: "success",
  },
  reducers: {
    setMessage(_state, action) {
      return action.payload;
    },
  },
});

export const setNotification = (message, type, displayTime) => {
  return (dispatch) => {
    dispatch(setMessage({ message, type }));
    setTimeout(() => {
      dispatch(setMessage({ message: null, type: "succes" }));
    }, displayTime * 1000);
  };
};

export const { setMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
