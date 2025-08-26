import { useDispatch, useSelector } from "react-redux";
import { incrementLikes, removeBlog } from "../reducers/blogsReducer";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  return blogs.map((blog) => (
    <div key={blog.id}>
      {blog.title} {blog.author}
      <button onClick={() => dispatch(incrementLikes(blog.id))}>like</button>
      <p>likes: {blog.likes}</p>
      <button onClick={() => dispatch(removeBlog(blog.id))}>remove blog</button>
    </div>
  ));
};

export default Blogs;
