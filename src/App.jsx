import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { setNotification } from "./reducers/notificationReducer";
import { addBlog, initializeBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const handleAddBlog = async (event) => {
    event.preventDefault();

    try {
      dispatch(addBlog(title, url, author));
      dispatch(
        setNotification(`added blog ${title} by ${author}`, "success", 5),
      );
      setAuthor("");
      setUrl("");
      setTitle("");
    } catch (error) {
      dispatch(setNotification("error while adding this blog", "error", 5));
    }
  };

  const blogForm = () => (
    <form onSubmit={handleAddBlog}>
      <div>
        title
        <input
          onChange={({ target }) => setTitle(target.value)}
          value={title}
        />
        author
        <input
          onChange={({ target }) => setAuthor(target.value)}
          value={author}
        />
        url
        <input onChange={({ target }) => setUrl(target.value)} value={url} />
        <button type="submit">post blog</button>
      </div>
    </form>
  );

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogger", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("wrong credentials", "error", 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogger");
    dispatch(setNotification(null, "success", 0));
    setUser(null);
  };

  if (user === null) {
    return (
      <div>
        <h1>login to the app</h1>
        <Notification />
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user.username} logged in
      <button onClick={handleLogout}>logout</button>
      {blogForm()}
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Blog blog={blog} />
          <button>like</button>
        </div>
      ))}
    </div>
  );
};

export default App;
