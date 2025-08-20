import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogger");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      console.log(user);
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
      const blog = await blogService.post({
        title,
        url,
        author,
      });
      setMessage(`added blog ${blog.title} by ${blog.author}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setMessageType("success");
      setAuthor("");
      setUrl("");
      setTitle("");
    } catch (error) {
      setMessage("Error while making blog");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setMessageType("error");
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
      setMessage("Wrong credentials");
      setMessageType("error");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogger");
    setUser(null);
  };

  if (user === null) {
    return (
      <div>
        <h1>login to the app</h1>
        <Notification message={message} messageType={messageType} />
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} messageType={messageType} />
      {user.username} logged in
      <button onClick={handleLogout}>logout</button>
      {blogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
