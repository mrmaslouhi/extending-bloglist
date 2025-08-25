import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (notification.type === "error") {
    notificationStyle.color = "red";
  }

  if (notification.message === null) {
    return null;
  }

  return <div style={notificationStyle}>{notification.message}</div>;
};

export default Notification;
