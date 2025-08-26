import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const LoginStatus = ({ user, setUser }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogger");
    dispatch(setNotification(null, "success", 0));
    setUser(null);
  };
  return (
    <>
      {user.username} logged in
      <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default LoginStatus;
