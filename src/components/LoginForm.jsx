import loginService from "../services/login";
import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsername,
  setPassword,
  clearAllUserInfo,
} from "../reducers/userInfoReducer";
import { setNotification } from "../reducers/notificationReducer";

const LoginForm = ({ setUser }) => {
  const { username, password } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

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
  return (
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
};

export default LoginForm;
