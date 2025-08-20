const Notification = ({ message, messageType }) => {
  const messageStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (messageType === "error") {
    messageStyle.color = "red";
  }

  if (message === null) {
    return null;
  }

  return <div style={messageStyle}>{message}</div>;
};

export default Notification;
