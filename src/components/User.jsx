import { useMatch } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const users = useSelector((state) => state.users);
  const match = useMatch("/user/:id");
  const user = match ? users.find((u) => u.id === match.params.id) : null;
  if (!user) {
    return <p>User not found</p>;
  }
  return (
    <div>
      <h2>{user.username}</h2>
      <h3>Added blogs:</h3>
      <ul>
        {user.blogs.map((b, index) => (
          <li key={index}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
