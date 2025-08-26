import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogsReducer from "./reducers/blogsReducer";
import blogInfoReducer from "./reducers/blogInfoReducer";
import userInfoReducer from "./reducers/userInfoReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    blogInfo: blogInfoReducer,
    userInfo: userInfoReducer,
  },
});

export default store;
