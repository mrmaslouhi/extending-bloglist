import { useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { incrementLikes } from "../reducers/blogsReducer";

const Blog = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null;

  if (!blog) {
    return <p>blog not found</p>;
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes</p>
      <button onClick={() => dispatch(incrementLikes(blog.id))}>like</button>
      <p>Added by {blog.user.username}</p>
    </div>
  );
};

export default Blog;
