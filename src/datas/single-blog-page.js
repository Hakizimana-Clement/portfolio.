const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
class="toast-icons"><path fill="#3498db" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>`;
// elements
// heading
const blogData = document.querySelector(".blog-container__date-year");
const blogLikeNumber = document.querySelector(".like-numbers");
const blogCommentNumber = document.querySelector(".comment-numbers");
const toggleLikeIcon = document.querySelector(".like-icon-active");
// text
const h1El = document.querySelector(".blog-content__title");
const imgEl = document.querySelector(".blog-content__img");
const pEl = document.querySelector(".blog-content__paragraph");
const writeImage = document.querySelector(
  ".blog-content__writer-and-like-button--write-img"
);
const writeName = document.querySelector(".write-name");
const likeLinkEl = document.querySelector(
  ".blog-content__writer-and-like-button--like-button-link"
);
const commentFormEl = document.querySelector(".leave-comment__form-and-input");
const commentMainContainer = document.querySelector(".comments-colors");
const noCommentPEl = document.querySelector(".no-comment");
const errorEl = document.querySelector(".error");
const paragraphContainer = document.querySelector(
  ".blog-content__paragraph--container"
);
const showloadercontainer = document.querySelector(".loader-container");
const showLoader = () => {
  document.querySelector(".loader-container").style.display = "flex";
};
const hideShowLoader = () => {
  document.querySelector(".loader-container").style.display = "none";
};
// remove # on id
const blogId = location.hash.substring(1);
// when no blog id in url redirect home page
if (blogId.length === 0) {
  location.assign("index.html");
}

// ************************** CHECK USER TOKEN **************************
// const token = localStorage.getItem("userToken");
// if (!token) {
//   console.error("Token not found in localStorage");
// }

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
// const decodedPayload = decodedJwt(token);
// console.log(decodedPayload);
// console.log(token);
// if (token) {
//   // check user jwt decoded function
//   const decodedPayload = decodedJwt(token);
//   userAuthenticateToken = decodedPayload.role;
//   console.log(userAuthenticateToken);
//   // console.log(decodedPayload);
//   // if (decodedPayload.role === "user") {
//   //   document.querySelector(".mobile-nav___link .login-btn--text").textContent =
//   //     decodedPayload.name.split(" ")[0];
//   //   document.querySelector(".larger-screen-list .login-btn--text").textContent =
//   //     decodedPayload.name.split(" ")[0];

//   //////// with welcome message /////////////
//   // document.querySelector(".mobile-nav___link .login-btn--text").textContent =
//   // "Welcome " + decodedPayload.name.split(" ")[0];
//   // document.querySelector(".larger-screen-list .login-btn--text").textContent =
//   // "Welcome " + decodedPayload.name.split(" ")[0];
//   // }
// }

// **************************
// statics
// hard coded id
// const blogId = "6606830935c27104c4a141a0";
const fetchSingleBlog = async () => {
  try {
    showLoader();
    const response = await fetch(
      `http://localhost:4000/api/v1/blogs/${blogId}`
    );

    const json = await response.json();

    // redirect to home back when blog id doesn't exist and id is not equal to url
    if (response.status === 404 || json.blog._id !== blogId) {
      location.assign("index.html");
    }

    if (!response.ok) {
      hideShowLoader();
      // showLoader();
      location.assign("index.html");
      console.log("blog id not found");
      console.log(json);
    }
    console.log(response.status === 404);

    if (response.ok) {
      console.log(json);
      const blog = json;
      // console.log(blog);
      updatePageContents(blog);
    }
  } catch (error) {
    // console.log(response.status === 404);
    // if (response.status === 404) {
    //   location.assign("index.html");
    // }
    console.log(error);
  } finally {
    hideShowLoader();
  }
};

fetchSingleBlog();
// console.log(blog);
// **************************************************************************
// **************************UPDATING PAGE CONTEXT **************************
// **************************************************************************
const updatePageContents = (blog) => {
  paragraphContainer.innerHTML = "";

  // blog written data
  blogData.textContent = blog.blog.createdAt.split("T")[0];
  // blogData.textContent = blog.blog.updatedAt;
  // blog likes number
  blogLikeNumber.textContent = blog.blog.likes.length;
  // blog comment number
  blogCommentNumber.textContent = blog.blog.comments.length;

  // title
  h1El.textContent = blog.blog.title;
  // blog image
  imgEl.src = blog.blog.blogImage;

  // pEl.textContent = blog.body;
  // writer img
  // console.log(writeImage.src);
  if (writeImage.src.length !== 0) {
    // default image when user don't use his / her image
    writeImage.src = `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="white" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.985 7.985 0 0 1 12 20a7.985 7.985 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984"/></g></svg>`;
  } else {
    // writer image
    writeImage.src = blog.blog.writerImage;
  }

  // writer name
  writeName.textContent = blog.blog.writer;
  ///////////// rendering paragraph from local storage //////////
  // const paragraphContext = document.createElement("p");
  const paragraphContext = document.createElement("div");
  paragraphContext.innerHTML = blog.blog.content;
  paragraphContainer.append(paragraphContext);

  // ************* create paragraph *************
  // const createParagraph = (text) => {
  //   const paragraph = document.createElement("p");
  //   paragraph.classList.add("blog-content__paragraph");
  //   // paragraph.textContent = text;
  //   paragraph.innerHTML = text;
  //   paragraphContainer.append(paragraph);
  // };

  // const text = blog.blog.content;
  // const words = text.split(" ");
  // // console.log(words);
  // let paragraphText = "";
  // let paragraphCount = 0;

  // words.forEach((word) => {
  //   if (paragraphText.length + word.length + 1 <= 300) {
  //     paragraphText += word + " ";
  //   } else {
  //     createParagraph(paragraphText.trim());
  //     paragraphText = word + " ";
  //     paragraphCount++;
  //   }
  // });
  // // create paragraph for the remaining text
  // if (paragraphText) {
  //   createParagraph(paragraphText.trim());
  // }
};
//////////////////////////////////////////////////////////////////////////////////////////////
// fetch and then like
//////////////////////////////////////////////////////////////////////////////////////////////
const fetchToggleLike = async (blogId) => {
  try {
    showLoader();
    const response = await fetch(
      `http://localhost:4000/api/v1/blogs/${blogId}/likes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await response.json();
    // unauthorized
    if (json.status === "401") {
      // hideLoader();
      // createToast("info", "info","lllllllllll" ,"unauthorize");
      // createToast("info", errorIcon, json.message, json.error);
      createToast("info", errorIcon, "Please login", "Redirect to login page");
      // setTimeout(() => {
      // }, 3000);
      location.assign("signin.html");
      return;
    }

    // blog not found
    if (json.status === "404") {
      hideShowLoader();
      console.error("Error toggling like ", json);
      console.log("error", json);

      createToast(
        "info",
        errorIcon,
        "Blog not found",
        "You can't like this blog"
      );
      return;
    }

    // blog liked
    if (json.status === "201") {
      hideShowLoader();

      // createToast("info", errorIcon, "Like toggle", "Successfully");

      console.log("like toggle successfully ", json);
      fetchSingleBlog();
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideShowLoader();
  }
};

// // like state
// const isLiked = localStorage.getItem("userLike");
// // on mount
// isLiked && toggleLikeIcon.classList.add("toggleLike");
// // for saving like state and fetch page for like
// const likeToggleIcon = () => {
//   toggleLikeIcon.classList.toggle("toggleLike");
//   if (toggleLikeIcon.classList.contains("toggleLike")) {
//     localStorage.setItem("userLike", JSON.stringify(`[like-${blogId}]`));
//   } else {
//     localStorage.removeItem("userLike", JSON.stringify(`[like-${blogId}]`));
//   }
//   fetchToggleLike();
// };

// like button clicked
// likeLinkEl.addEventListener("click", likeToggleIcon);

// const toggleLikeFunction = async (blogId) => {
//   console.log(blogId);
//   const isLiked =
//     JSON.stringify(localStorage.getItem(`userLike-${blogId}`)) || false;

//   const updatedIsLiked = !isLiked;

//   if (updatedIsLiked) {
//     toggleLikeIcon.classList.add("toggleLike");
//   } else {
//     toggleLikeIcon.classList.remove("toggleLike");
//   }
//   await fetchToggleLike(blogId);
//   localStorage.setItem(`userLike-${blogId}`, JSON.stringify(updatedIsLiked));
// };

// likeLinkEl.addEventListener("click", () => toggleLikeFunction(blogId));
const toggleLikeFunction = async (blogId) => {
  console.log(blogId);
  const isLiked =
    JSON.parse(localStorage.getItem(`userLike-${blogId}`)) || false; // Parse the stored value

  const updatedIsLiked = !isLiked;

  if (updatedIsLiked) {
    toggleLikeIcon.classList.add("toggleLike");
  } else {
    toggleLikeIcon.classList.remove("toggleLike");
  }

  // Pass the blogId to fetchToggleLike
  await fetchToggleLike(blogId); // Wait for the fetchToggleLike function to complete

  localStorage.setItem(`userLike-${blogId}`, JSON.stringify(updatedIsLiked));
};

likeLinkEl.addEventListener("click", () => toggleLikeFunction(blogId));

//////////////////////////////////////////////////////////////////////////////////////////////
//********************** COMMENTS ********************* */
//////////////////////////////////////////////////////////////////////////////////////////////

// errors
let formErrors = {
  commentTextError: null,
};

// display error below input
const showFormErrors = (error) => {
  document.querySelector("#comment-text-error").textContent =
    error.commentTextError;
};

//********************** FORM ********************* */
const addComment = async (e) => {
  e.preventDefault();

  //******* Form Validation *****************
  // state
  let hasErrors = false;
  const commentInput = e.target.elements.comment.value.trim();
  // comment text validation
  if (commentInput.length === 0) {
    formErrors.commentTextError = "Please enter your comment";
    hasErrors = true;
  } else if (commentInput.length > 1000) {
    formErrors.commentTextError =
      "Your comment should be less than 1000 character.";
    hasErrors = true;
  } else {
    formErrors.commentTextError = null;
  }

  showFormErrors(formErrors);

  if (!hasErrors) {
    //******* add comment in local storage *****************
    const newComment = {
      comment: commentInput,
    };

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/blogs/${blogId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newComment),
        }
      );
      const json = await response.json();

      if (json.status === "401") {
        // createToast("info", "info",json.error ,"unauthorize");
        // createToast("info", errorIcon, json.message, json.error);
        createToast(
          "info",
          errorIcon,
          "Please login",
          "Redirect to login page"
        );

        location.assign("signin.html");
        // setTimeout(() => {
        // location.assign("signin.html");
        // }, 2000);
      }

      if (!response.ok) {
        console.log("error", json.error);
      }
      if (json.status === "201") {
        // console.log(json);
        createToast("info", errorIcon, "Comment created", "Successfully");
        newComment.comment = "";
        e.target.reset();
        fetchComments();
      }
    } catch (error) {
      console.log(error);
    }
  }
};

// comment from
commentFormEl.addEventListener("submit", addComment);

//*****************************************************************************************
//******* Render comments on page *****************
//*****************************************************************************************
const fetchComments = async () => {
  try {
    showLoader();
    const response = await fetch(
      `http://localhost:4000/api/v1/blogs/${blogId}/comments`
    );
    const json = await response.json();

    if (!response.ok) {
      console.log(json);
    }

    if (response.ok) {
      console.log("comments", json);
      const commentsArray = json.comments;
      renderComments(commentsArray);
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideShowLoader();
  }
};
fetchComments();

const renderComments = (blogs) => {
  // console.log("cccccccccccccccc", blogs);
  if (blogs.length <= 0) {
    noCommentPEl.textContent = "No Comments";
    commentMainContainer.style.padding = "1.5rem ";
    renderComments(blogs);
  } else {
    // clean comment message
    noCommentPEl.textContent = "";
    // clean container
    commentMainContainer.innerHTML = "";
    commentMainContainer.style.padding = "0";

    blogs.forEach((comment) => {
      // comment card or container
      const commentCard = document.createElement("div");
      commentCard.classList.add("blog-comment__main-container");

      // empty div -> comment card
      const commentHolderCard = document.createElement("div");
      commentHolderCard.classList.add("container");
      commentCard.append(commentHolderCard);

      //******************* name and comment text *********************
      // bubble comment
      const commentBubbleTextContaner = document.createElement("div");
      commentBubbleTextContaner.classList.add("comment-buble", "container");
      commentHolderCard.append(commentBubbleTextContaner);

      // name
      const h4El = document.createElement("h4");
      h4El.textContent = comment.name;
      h4El.classList.add("comment-buble__title");
      commentBubbleTextContaner.append(h4El);

      // comment text or paragraph
      const pEl = document.createElement("p");
      pEl.textContent = comment.comment;
      pEl.classList.add("comment-buble__paragraph");
      commentBubbleTextContaner.append(pEl);

      //******************* comment and like *********************
      // comment and like container
      const commentAndLikeContainer = document.createElement("div");
      commentAndLikeContainer.classList.add("like-and-comment-container");
      commentHolderCard.append(commentAndLikeContainer);

      // // like icon
      // const likeIcon = document.createElement("span");
      // likeIcon.innerHTML = `<svg
      //                     xmlns="http://www.w3.org/2000/svg"
      //                     fill="none"
      //                     viewBox="0 0 24 24"
      //                     stroke-width="1.5"
      //                     stroke="currentColor"
      //                   >
      //                     <path
      //                       stroke-linecap="round"
      //                       stroke-linejoin="round"
      //                       d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      //                     />
      //                     likeDiv.append(likeIcon);
      //                   </svg>`;
      // likeIcon.classList.add("icon-sizes");
      // commentAndLikeContainer.append(likeIcon);

      // // like function to change color (toggle)
      // // commentAndLikeContainer.textContent = "";
      // let isLiked = false;
      // likeIcon.addEventListener("click", () => {
      //   isLiked = !isLiked;
      //   console.log(isLiked);

      //   if (isLiked) {
      //     likeIcon.innerHTML = `<svg
      //                     xmlns="http://www.w3.org/2000/svg"
      //                     fill="red"
      //                     viewBox="0 0 24 24"
      //                     stroke-width="1.5"
      //                     stroke="white"
      //                   >
      //                     <path
      //                       stroke-linecap="round"
      //                       stroke-linejoin="round"
      //                       d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      //                     />
      //                     likeDiv.append(likeIcon);
      //                   </svg>`;
      //   } else {
      //     likeIcon.innerHTML = `<svg
      //                     xmlns="http://www.w3.org/2000/svg"
      //                     fill="none"
      //                     viewBox="0 0 24 24"
      //                     stroke-width="1.5"
      //                     stroke="currentColor"
      //                   >
      //                     <path
      //                       stroke-linecap="round"
      //                       stroke-linejoin="round"
      //                       d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      //                     />
      //                     likeDiv.append(likeIcon);
      //                   </svg>`;
      //   }
      // });

      // reply coming soon
      // add comment card to main comment card
      commentMainContainer.append(commentCard);
    });
  }
};

// renderComments();
renderComments();
