const { useEffect, useState } = React;

// blog components
const BlogCardDetails = ({ blog }) => {
  // ***************** like and comment **********************
  // like color icon
  const [likeColor, setLikeColor] = useState("#ffffff00");
  // comment icon color
  const [commentIconColor, setCommentIconColor] = useState("#ffffff00");

  // Update icon like color when like change
  useEffect(() => {
    if (blog.likes.length > 0) {
      setLikeColor("#ff0000");
    } else {
      setLikeColor("#ffffff00");
    }
  }, [blog.likes]);

  // Update icon comment color when comment change
  useEffect(() => {
    if (blog.comments.length > 0) {
      setCommentIconColor("#28396d");
    } else {
      setCommentIconColor("#ffffff00");
    }
  }, [blog.comments]);

  // ******************************************************************
  const handleClick = (id) => {
    console.log("clicked ", id);
    location.assign(`single-blog-page.html#${blog._id}`);
  };

  return (
    <>
      <div className="card-container">
        <a className="card-blog-link"></a>
        <div className="card" onClick={() => handleClick(blog._id)}>
          <div className="image-content">
            <div className="card-image">
              <img src={blog.blogImage} alt={blog.title} />
            </div>
          </div>
          <div className="card-content">
            <h2 className="blogs-container__card-title">
              {blog.title.length > 24
                ? `${blog.title.slice(0, 24)} ...`
                : blog.title}
            </h2>
            <p className="blogs-container__card-description description">
              {blog.content.length > 63
                ? `${blog.content.slice(0, 63)} ...`
                : blog.content}
              {/* dangerouslySetInnerHTML={{ __html: blog.content }} */}
            </p>
            <div className="blogs-container__card-likes-and-comments-container">
              <div className="blogs-container__card-likes-and-comments-container--writer">
                {/* image */}
                <img
                  className="writer writer-image"
                  src='data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="white" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.985 7.985 0 0 1 12 20a7.985 7.985 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984"/></g></svg>'
                  alt="like icon"
                />

                {/* writer */}
                <span className="writer writer-name">
                  {" "}
                  {blog.writer.split(" ")[0]}
                </span>
                {/* full stop */}
                <span className="writer writer-full-stop"> | </span>
                {/* date */}
                <span className="writer writer-date">
                  {blog.createdAt.split("T")[0]}
                </span>
              </div>
              <div className="like-and-comment-container">
                <div className="like-and-comment-container">
                  <span className="icon-sizes">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={likeColor}
                      stroke="white"
                      viewBox="0 0 24 24"
                      stroke-width="1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      ></path>
                    </svg>
                  </span>
                  <span>{blog.likes.length}</span>
                </div>
                <div className="comments">
                  <span className="icon-sizes">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={commentIconColor}
                      stroke="white"
                      viewBox="0 0 24 24"
                      stroke-width="1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                      ></path>
                    </svg>
                  </span>
                  <span className="comment-number">{blog.comments.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

////////////////////////////////////////////////////////////////////
// Working and cover page
////////////////////////////////////////////////////////////////////
const BlogCards = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://mybrand-be-j4ci.onrender.com/api/v1/blogs/"
        );

        const json = await response.json();

        console.log(json);

        if (response.ok) {
          // if (json.message === "success") {
          setBlogs(json.blogs);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        document.body.style.overflow = "auto";
      }
    };
    fetchBlogs();

    // disable scrolling
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <>
      {isLoading && (
        <div class="loader-container">
          <span class="loader"></span>
        </div>
      )}
      {!isLoading &&
        blogs.map((blog) => <BlogCardDetails key={blog._id} blog={blog} />)}
    </>
  );
};

ReactDOM.render(<BlogCards />, document.getElementById("gallery"));
