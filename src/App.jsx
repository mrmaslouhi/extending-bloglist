import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { setNotification } from "./reducers/notificationReducer";
import {
  addBlog,
  incrementLikes,
  initializeBlogs,
  removeBlog,
} from "./reducers/blogsReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  setTitle,
  setUrl,
  setAuthor,
  clearAllInfo,
} from "./reducers/blogInfoReducer";
import {
  setUsername,
  setPassword,
  clearAllUserInfo,
} from "./reducers/userInfoReducer";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const { title, url, author } = useSelector((state) => state.blogInfo);
  const { username, password } = useSelector((state) => state.userInfo);

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
          onChange={({ target }) => dispatch(setUsername(target.value))}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => dispatch(setPassword(target.value))}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const handleAddBlog = async (event) => {
    event.preventDefault();

    try {
      if (!title || !url) {
        throw new Error("missing title or id");
      }
      dispatch(addBlog(title, url, author));
      dispatch(
        setNotification(
          !author ? `added ${title}` : `added blog ${title} by ${author}`,
          "success",
          5,
        ),
      );
      dispatch(clearAllInfo());
    } catch (error) {
      dispatch(setNotification("error while adding this blog", "error", 5));
    }
  };

  const blogForm = () => (
    <form onSubmit={handleAddBlog}>
      <div>
        title
        <input
          onChange={({ target }) => dispatch(setTitle(target.value))}
          value={title}
        />
        author
        <input
          onChange={({ target }) => dispatch(setAuthor(target.value))}
          value={author}
        />
        url
        <input
          onChange={({ target }) => dispatch(setUrl(target.value))}
          value={url}
        />
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
      dispatch(clearAllUserInfo());
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
          <button onClick={() => dispatch(incrementLikes(blog.id))}>
            like
          </button>
          <p>likes: {blog.likes}</p>
          <button onClick={() => dispatch(removeBlog(blog.id))}>
            remove blog
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
