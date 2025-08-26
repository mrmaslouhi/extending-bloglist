import { addBlog } from "../reducers/blogsReducer";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import {
  setTitle,
  setUrl,
  setAuthor,
  clearAllInfo,
} from "../reducers/blogInfoReducer";

const BlogForm = () => {
  const { title, url, author } = useSelector((state) => state.blogInfo);
  const dispatch = useDispatch();

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

  return (
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
};

export default BlogForm;
