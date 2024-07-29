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

// ************************** CHECK USER TOKEN **************************
const token = localStorage.getItem("userToken");
if (!token) {
  location.assign("../signin.html");
} else {
  const decodedPayload = decodedJwt(token);

  if (decodedPayload)
    if (decodedPayload.role !== "admin") {
      location.assign("../signin.html");
    }
}

// ************************** LOADER **************************
const loaderContainer = document.querySelector(".loader-container");
const showLoader = () => {
  loaderContainer.style.display = "flex";
  document.body.style.overflow = "hidden";
};

const hideLoader = () => {
  loaderContainer.style.display = "none";
  document.body.style.overflow = "";
};

// ************************** FETCH COMMENTS **************************
const fetchComments = async () => {
  try {
    showLoader();
    const response = await fetch(
      `https://mybrand-be-j4ci.onrender.com/api/v1/blogs/${blogId}`
    );
    const json = await response.json();


    if (json.status === "404") {
      hideLoader();
      return location.assign("admin-panel--comments-blog.html");
    }

    if (json.status === "200") {
      // const blog = json.comments;
      const comment = json;

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
    // Append comment content to comment card container
    commentContainer.appendChild(commentContent);

    // Append comment card container to main container
    mainCommentContainer.appendChild(commentContainer);
  });
};
// *************** LOGOUT *****************
const logoutBtn = document.querySelector(".logout-link");

logoutBtn.addEventListener("click", () => {
  console.log("deleted btn clicked");
  localStorage.removeItem("userToken");
  location.assign("../index.html");
});
