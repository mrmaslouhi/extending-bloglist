import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import Users from "./components/Users";
import User from "./components/User";
import BlogForm from "./components/BlogForm";
import LoginStatus from "./components/LoginStatus";
import { initializeBlogs } from "./reducers/blogsReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogger");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  if (user === null) {
    return (
      <div>
        <h1>login to the app</h1>
        <Notification />
        {<LoginForm setUser={setUser} />}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <LoginStatus user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BlogForm />
              <Blogs />
            </>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;
