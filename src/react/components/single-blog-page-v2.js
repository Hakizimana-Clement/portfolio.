const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
className="toast-icons"><path fill="#3498db" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>`;

const { useEffect, useState } = React;

// ************************** GET BLOG ID FROM URL **************************

function createToast(type, icon, title, text) {
  let notifications = document.querySelector(".notifications");

  let newToast = document.createElement("div");

  newToast.innerHTML = `<div class="toast ${type}">
            <!--  icon -->
         <div>
         ${icon}
</div>
            <div class="content">
              <div class="title">${title}</div>
              <span>${text}</span>
            </div>
            <!-- close icon -->
         <div onClick="(this.parentElement).remove()">
         <svg
         xmlns="http://www.w3.org/2000/svg"
         width="1em"
         height="1em"
         viewBox="0 0 15 15"
         >
              <path
                fill="white"
                d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27"
              />
                </div>
            </svg>
          </div>
 </div>
          `;
  // add on click
  notifications.appendChild(newToast);
  // remove after 3s
  newToast.timeOut = setTimeout(() => newToast.remove(), 3000);
}

// ************************** GET BLOG ID FROM URL **************************
// remove # on id
const blogId = location.hash.substring(1);
// when no blog id in url redirect home page
if (blogId.length === 0) {
  location.assign("index.html");
}

// ************************** CHECK USER TOKEN **************************
const token = localStorage.getItem("userToken");
if (!token) {
  console.log("Token is missing.");
  // location.assign("../signin.html");
} else {
  const decodedPayload = decodedJwt(token);
  if (decodedPayload)
    if (decodedPayload.role !== "user") {
      console.log("User is not an login. Redirecting to login page.");
      // location.assign("../signin.html");
      localStorage.removeItem("userToken");
    }
}
console.log(("token", token));
// **********************************************************************************************
// *************************** blog details *************************************************
// **********************************************************************************************
const BlogDetails = ({ blog }) => {
  return (
    <>
      <div className="blog-container">
        <div className="blog-container__date">
          <div className="blog-container__date-text-and-icon">
            <ion-icon name="calendar" size="small"></ion-icon>
            <p className="blog-container__date-year">
              {blog.createdAt.split("T")[0]}
            </p>
          </div>

          <div className="comment-likes__main-container">
            <div className="comment-likes__container">
              <img
                className="blog-icons like-icon"
                src="images/like-heart-icon.svg"
                alt="like"
              />
              <span className="like-numbers">{blog.likes.length}</span>
            </div>
            <div className="comment-likes__container">
              <img
                className="blog-icons comment-icon"
                src="images/comment.svg"
                alt="comment"
              />
              <span className="comment-numbers">{blog.comments.length}</span>
            </div>
          </div>
        </div>
        <div className="blog-content">
          <h1 className="blog-content__title">{blog.title}</h1>
          <div className="blog-content-img-container">
            <img
              className="blog-content__img"
              src={blog.blogImage}
              alt={blog.title}
            />
          </div>

          {/* <div className="blog-content__paragraph--container">
          {blog.content}
        </div> */}

          <div
            className="blog-content__paragraph--container"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
          {/* <!-- start writer and like button --> */}
          <div className="blog-content__writer-and-like-button">
            <div className="blog-content__writer-and-like-button--write">
              <div className="blog-content__writer-and-like-button--write-img-container">
                <img
                  className="blog-content__writer-and-like-button--write-img"
                  src={`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="white" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.985 7.985 0 0 1 12 20a7.985 7.985 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984"/></g></svg>`
                  )}`}
                  alt={blog.writer}
                />
              </div>

              <p>
                Written By <span className="write-name">{blog.writer}</span>
              </p>
            </div>
            {/* ////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* likes button */}
            {/* ////////////////////////////////////////////////////////////////////////////////////////// */}
            <div className="blog-content__writer-and-like-button--like-button">
              <div className="blog-content__writer-and-like-button--like-button-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.2"
                  stroke="currentColor"
                  className="like-icon-active"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>

                <p className="blog-content__writer-and-like-button--like-button-text">
                  Like
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="notifications"></div>
    </>
  );
};

// **********************************************************************************************
// *************************************** LIKE *************************************************
// **********************************************************************************************
// **********************************************************************************************
// *************************************** RENDERING COMMENT ***************************************
// **********************************************************************************************
const RenderingComment = ({ comment }) => {
  return (
    <div className="comments-colors">
      <div className="blog-comment__main-container container">
        <div className="container comment-buble">
          <h4 className="comment-buble__title">{comment.name}</h4>
          <p className="comment-buble__paragraph">{comment.comment}</p>
        </div>
      </div>
    </div>
  );
};

// **********************************************************************************************
// *************************************** CREATE COMMENT ***************************************
// **********************************************************************************************
const CommentInput = ({ blog, setComments }) => {
  const blogId = location.hash.substring(1);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const commentData = { comment: comment };
      const response = await fetch(
        `https://mybrand-be-j4ci.onrender.com/api/v1/blogs/${blogId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(commentData),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        return;
      }

      if (json.status === "201") {
        setComment("");
        setError(null);
        // render on screen
        setComments((prevComments) => [...prevComments, json.comments]);
        createToast("info", errorIcon, "Comment created", "Successfully");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="leave-comment-container">
        <h3 className="leave-comment-container__title">Leave a comment</h3>
        <div className="leave-comment__form">
          {/* start comment form */}
          <form
            className="leave-comment__form-and-input"
            onSubmit={handleSubmit}
          >
            <div>
              <textarea
                className="leave-comment__input textarea"
                name="comment"
                placeholder="Content"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              ></textarea>

              {/* <!-- start email error --> */}
              {/* <span className="error" id="comment-text-error"></span> */}
              {error && (
                <span className="error" id="comment-text-error">
                  {error}
                </span>
              )}
              {/* <!-- start email error --> */}
            </div>
            <p className="leave-comment__form__note-text">
              All comments are moderated before being published
            </p>
            <div className="leave-comment__input-btn-container">
              <button className="btn post-btn">Post Comment</button>
            </div>
          </form>
          {/* end comment form */}
        </div>
      </div>
    </>
  );
};

// Inside SingleBlogPage component

const SingleBlogPage = () => {
  const blogId = location.hash.substring(1);

  const [isLoading, setIsLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlog = async (id) => {
      try {
        const response = await fetch(
          `https://mybrand-be-j4ci.onrender.com/api/v1/blogs/${id}`
        );

        if (!response.ok) {
          console.error("Error fetching blog:", response.status);
          // Handle error
          return;
        }

        const json = await response.json();
        setBlog(json.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
        document.body.style.overflow = "auto";
      }
    };

    fetchBlog(blogId);
    document.body.style.overflow = "hidden";
  }, [blogId]);

  // ******* fecth comment
  useEffect(() => {
    const fetchComment = async (id) => {
      try {
        const response = await fetch(
          `https://mybrand-be-j4ci.onrender.com/api/v1/blogs/${id}/comments`
        );

        const json = await response.json();

        if (!response.ok) {
          console.error(json);
          return;
        }

        setComments(json.comments);
      } catch (error) {
        console.error(error);
      }
    };

    if (blog) {
      fetchComment(blogId);
    }
  }, [blogId, blog]);
  return (
    <>
      {isLoading && !blog && (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )}
      {!isLoading && <BlogDetails key={blog._id} blog={blog} />}
      <div className="blog-comments-container">
        <h3 className="comment-title">Comments</h3>

        {comments.map((comment) => (
          <RenderingComment key={comment._id} comment={comment} />
        ))}
      </div>
      {/* Pass setComments function to CommentInput */}
      {blog && <CommentInput blog={blog} setComments={setComments} />}
    </>
  );
};

// **********************************************************************************************
// *************************** single blog page *************************************************
// **********************************************************************************************
// const SingleBlogPage = () => {
//   // Get the blog ID from the URL hash
//   const blogId = location.hash.substring(1);
//   // loader
//   const [isLoading, setIsLoading] = useState(true);
//   // blog state
//   const [blog, setBlog] = useState(null);

//   // comment state
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     // ****************** fetching blog *****************
//     const fetchBlog = async (id) => {
//       try {
//         const response = await fetch(
//           `https://mybrand-be-j4ci.onrender.com/api/v1/blogs/${id}`
//         );

//         if (!response.ok) {
//           // Handle error here
//           console.error("Error fetching blog:", response.status);
//           createToast(
//             "info",
//             errorIcon,
//             "Blog not found",
//             "Redirect to home page"
//           );
//           location.assign("index.html");
//           return;
//         }

//         const json = await response.json();
//         console.log(json);
//         setBlog(json.blog);
//       } catch (error) {
//         console.error("Error fetching blog:", error);
//       } finally {
//         setIsLoading(false);
//         document.body.style.overflow = "auto";
//       }
//     };

//     fetchBlog(blogId);

//     // disable scrolling
//     document.body.style.overflow = "hidden";
//   }, [blogId]);

//   // ****************** fetching comment *****************
//   useEffect(() => {
//     const fetchComment = async (id) => {
//       try {
//         const response = await fetch(
//           `https://mybrand-be-j4ci.onrender.com/api/v1/blogs/${id}/comments`
//         );

//         const json = await response.json();

//         if (!response.ok) {
//           console.log(json);
//         }
//         console.log(json);
//         if (response.ok) {
//           const commentsArray = json.comments;
//           console.log(commentsArray);
//           setComments(commentsArray);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchComment(blogId);
//   }, [blogId]);
//   return (
//     <>
//       {isLoading && !blog && (
//         <div className="loader-container">
//           <span className="loader"></span>
//         </div>
//       )}
//       {!isLoading && <BlogDetails key={blog._id} blog={blog} />}
//       {comments.map((comment) => (
//         <RenderingComment key={comment._id} comment={comment} />
//       ))}
//       <CommentInput blog={blog} />
//     </>
//   );
// };

ReactDOM.render(
  <SingleBlogPage />,
  document.getElementById("blog-container-v2")
);

{
  /* <BlogDetails key={blog._id} blog={blog} /> */
}
{
  /* <RenderingComment key={} /> */
}
{
  /* {comments.map((comment) => (
       <RenderingComment key={}
      )}) */
}
