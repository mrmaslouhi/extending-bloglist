import { createSlice, current } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(_state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (title, url, author) => {
  return async (dispatch) => {
    const blog = {
      title,
      url,
      author,
      likes: 0,
    };
    const newBlog = await blogService.post(blog);
    dispatch(appendBlog(newBlog));
  };
};

export const incrementLikes = (id) => {
  return async (dispatch) => {
    await blogService.incrementLikes(id);
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const { setBlogs, appendBlog } = blogSlice.actions;
export default blogSlice.reducer;
