import { Link } from "react-router-dom";

const Navigation = (props) => {
  return (
    <nav
      style={{
        padding: 10,
        backgroundColor: "lightgray",
      }}
    >
      <Link to="/">blogs</Link>
      <br />
      <Link to="/users">users</Link>
      <br />
      {props.children}
    </nav>
  );
};

export default Navigation;
