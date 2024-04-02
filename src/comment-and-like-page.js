// elements
const titleEl = document.querySelector(".blog-title--title");
const commentNameEl = document.querySelector(
  ".comments-and-likes-container__bubble-comment--title"
);
const commentTextEl = document.querySelector(
  ".comments-and-likes-container__bubble-comment--description"
);
const blogLikesEl = document.querySelector(".blog-title--likes");

// ************************** CHECK USER TOKEN AND BLOG ID **************************
const blogId = location.hash.substring(1);
// when no blog id in url redirect home page
if (blogId.length === 0) {
  location.assign("admin-panel--comments-blog.html");
}
const token = localStorage.getItem("userToken");
if (!token) {
  console.log("Token is missing. Redirecting to home page.");
  // location.assign("../signin.html");
} else {
  const decodedPayload = decodedJwt(token);

  if (decodedPayload)
    if (decodedPayload.role !== "admin") {
      console.log("User is not an admin. Redirecting to home page.");
      // location.assign("../signin.html");
    }
}

// ************************** LOADER **************************
const loaderContainer = document.querySelector(".loader-container");
const showLoader = () => {
  loaderContainer.style.display = "flex";
};

const hideLoader = () => {
  loaderContainer.style.display = "none";
};

// ************************** FETCH COMMENTS **************************
const fetchComments = async () => {
  try {
    showLoader();
    const response = await fetch(
      `http://localhost:4000/api/v1/blogs/${blogId}`
    );
    const json = await response.json();

    // console.log(json.blog._id !== blogId);

    if (json.status === "404") {
      console.log(json);
      hideLoader();
      return location.assign("admin-panel--comments-blog.html");
    }

    if (json.status === "200") {
      // const blog = json.comments;
      const comment = json;

      console.log(comment);
      console.log(json);
      blogLikesEl.textContent = comment.blog.likes.length;
      titleEl.textContent = comment.blog.title;
      // commentNameEl.textContent = comment.blog.comments.name;

      hideLoader();
      renderComment(comment.blog.comments);
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};
fetchComments();

const mainCommentContainer = document.querySelector(".comment-container");
// render comments
const renderComment = (comments) => {
  if (comments.length <= 0) {
    console.log("looped", comments.length);
    const noCommentContainer = document.createElement("div");
    noCommentContainer.classList.add("noCommentContainer");
    const noEl = document.createElement("p");
    noEl.textContent = "⚠ This blog don't have any comment sir. ⚠";
    noCommentContainer.append(noEl);
    mainCommentContainer.append(noCommentContainer);
  }
  comments.forEach((comment) => {
    // Create comment card container
    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comments-and-likes-container");

    // Create delete button
    const deleteButton = document.createElement("div");
    deleteButton.innerHTML = `
      <a class="btn-remove delete-comment-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" class="delete-icon">
          <path fill="white" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/>
        </svg>
      </a>
    `;
    deleteButton.classList.add("delete-button");
    commentContainer.appendChild(deleteButton);

    // Create comment content
    const commentContent = document.createElement("div");
    commentContent.classList.add("comments-and-likes-container__wrapper");

    // Create comment bubble container
    const commentBubbleContainer = document.createElement("div");
    commentBubbleContainer.classList.add(
      "comments-and-likes-container__bubble-comment"
    );
    commentBubbleContainer.innerHTML = `
      <h4 class="comments-and-likes-container__bubble-comment--title">${comment.name}</h4>
      <p class="comments-and-likes-container__bubble-comment--description">${comment.comment}</p>
    `;
    commentContent.appendChild(commentBubbleContainer);

    // Create heart button
    // const heartButton = document.createElement("div");
    // heartButton.classList.add(
    //   "comments-and-likes-container__bubble-comment--heart-icon-container"
    // );
    // heartButton.innerHTML = `
    //   <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" class="heart-icon">
    //     <path fill="#f00000" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"/>
    //   </svg>
    //   <span class="comment-like-number">234</span>
    // `;
    // commentContent.appendChild(heartButton);

    // Append comment content to comment card container
    commentContainer.appendChild(commentContent);

    // Append comment card container to main container
    mainCommentContainer.appendChild(commentContainer);
  });
};

// const test = [
//   {
//     name: "manzi",
//     comment: "hello sir, keep it up.",
//   },
//   {
//     name: "iradukunda",
//     comment: "I have a project idea",
//   },
// ];

// renderComment(test);
