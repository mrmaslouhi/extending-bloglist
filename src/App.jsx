import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import LoginStatus from "./components/LoginStatus";
import { initializeBlogs } from "./reducers/blogsReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
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
      {<BlogForm />}
      <Blogs />
    </div>
  );
};

export default App;
