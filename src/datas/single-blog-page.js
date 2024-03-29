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
// const pEl = document.querySelectorAll(".blog-content__paragraph");
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
// hard coded

// *********** localstorage ***************
// let blogs = [];

// const blogJSON = localStorage.getItem("blogs");

// if (blogJSON !== null) {
//   blogs = JSON.parse(blogJSON);
// }
// // **************************
// // ********* checking id from localstorage is equal to id in hash ****************
// const blog = blogs.find((blog) => blog.id === blogId);

// if (blog === undefined) {
//   // location.assign("/index.html");
// }
// **************************
// ************************** CHECK USER TOKEN **************************
const token = localStorage.getItem("userToken");
if (!token) {
  console.error("Token not found in localStorage");
}
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
// const blogId = "6606830935c27104c4a141a0";
const fetchSingleBlog = async () => {
  try {
    // showLoader();
    const response = await fetch(
      `http://localhost:4000/api/v1/blogs/${blogId}`
    );
    const json = await response.json();
    if (!response.ok) {
      location.assign("index.html");
      console.log("blog id not found");
      console.log(json);
    }

    if (response.ok) {
      console.log(json);
      const blog = json;
      console.log(blog);
      updatePageContents(blog);
    }
  } catch (error) {
    console.log(error);
  }
};

fetchSingleBlog();
// console.log(blog);
// **************************************************************************
// **************************UPDATING PAGE CONTEXT **************************
// **************************************************************************
const updatePageContents = (blog) => {
  // blog written data
  blogData.textContent = blog.blog.createdAt;
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
  const paragraphContext = document.createElement("p");
  // paragraphContext.textContent = blog.body;
  // paragraphContainer.append(paragraphContext);

  const createParagraph = (text) => {
    const paragraph = document.createElement("p");
    paragraph.classList.add("blog-content__paragraph");
    paragraph.textContent = text;
    paragraphContainer.append(paragraph);
  };

  const text = blog.blog.content;
  const words = text.split(" ");
  // console.log(words);
  let paragraphText = "";
  let paragraphCount = 0;

  words.forEach((word) => {
    if (paragraphText.length + word.length + 1 <= 300) {
      paragraphText += word + " ";
    } else {
      createParagraph(paragraphText.trim());
      paragraphText = word + " ";
      paragraphCount++;
    }
  });
  // create paragraph for the remaining text
  if (paragraphText) {
    createParagraph(paragraphText.trim());
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////
// fetch and then like
//////////////////////////////////////////////////////////////////////////////////////////////
const fetchToggleLike = async () => {
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

    if (!response.ok) {
      hideShowLoader();
      const json = await response.json();
      console.error("Error toggling like ", json);
      console.log("error", json);
      return;
    }
    hideShowLoader();
    const json = await response.json();
    console.log("like toggle successfully ", json);
    fetchSingleBlog();
  } catch (error) {
    console.log(error);
  }
};

// like icon button
const isLiked = JSON.parse(localStorage.getItem("userLike")) || false;

if (isLiked) {
  toggleLikeIcon.classList.add("toggleLike");
}
likeLinkEl.addEventListener("click", () => {
  console.log("clicked");

  const updateIsLiked = !isLiked;
  toggleLikeIcon.classList.toggle("toggleLike");
  fetchToggleLike();

  localStorage.setItem("userLike", JSON.stringify(updateIsLiked));
});

//////////////////////////////////////////////////////////////////////////////////////////////
//********************** COMMENTS ********************* */
//////////////////////////////////////////////////////////////////////////////////////////////

// errors
let formErrors = {
  // nameError: null,
  // emailError: null,
  commentTextError: null,
};

// display error below input
const showFormErrors = (error) => {
  // name
  // document.querySelector("#name-error").textContent = error.nameError;

  //email
  // document.querySelector("#email-error").textContent = error.emailError;
  // comment text
  document.querySelector("#comment-text-error").textContent =
    error.commentTextError;
};

//********************** FORM ********************* */
commentFormEl.addEventListener("submit", (e) => {
  e.preventDefault();

  //******* Form Validation *****************
  // state
  let hasErrors = false;

  // const nameInput = e.target.elements.name.value.trim();
  // const emailInput = e.target.elements.email.value.trim();
  const commentInput = e.target.elements.comment.value.trim();
  // validate name validation
  // if (nameInput.length === 0) {
  //   formErrors.nameError = "Please enter your name";
  //   hasErrors = true;
  // } else if (nameInput.length < 3) {
  //   formErrors.nameError = "Name should be at least 3 character.";
  //   hasErrors = true;
  // } else {
  //   formErrors.nameError = null;
  // }

  // validate email validation
  // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!emailPattern.test(emailInput)) {
  //   formErrors.emailError = "Invalid email address.";
  //   hasErrors = true;
  // } else {
  //   formErrors.emailError = null;
  // }

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
    e.target.reset();
    //******* add comment in local storage *****************
    const newComment = {
      // commentId: uuidv4(),
      // commentUsername: nameInput,
      // commentEmail: emailInput,
      commentText: commentInput,
      //  commentLiked: false,
    };

    // const blogIndex = blogs.findIndex((blog) => blog.id === blogId);
    // // blog index found
    // if (blogIndex !== -1) {
    //   // Here we targer the blog we want to update and then add comment in it.
    //   blogs[blogIndex].comments.push(newComment);
    //   // localstorage
    //   localStorage.setItem("blogs", JSON.stringify(blogs));
    //   renderComments(blogs);
    //   commentFormEl.reset();
    // } else {
    //   console.log("Blog comment not found");
    // }
  }
  //************************************
});
// console.log(blogs);

//******* render comments on page *****************
const renderComments = (blogs) => {
  /////// Looping through comments ////////
  const blogIndex = blogs.findIndex((blog) => blog.id === blogId);
  if (blogIndex !== -1) {
    // comment array
    const commentArr = blogs[blogIndex].comments;
    console.log(commentArr.length);
    if (commentArr.length <= 0) {
      noCommentPEl.textContent = "No Comments";
      commentMainContainer.style.padding = "1.5rem ";
      renderComments(blog);
    } else {
      // clean comment message
      noCommentPEl.textContent = "";
      // clean container
      commentMainContainer.innerHTML = "";

      commentMainContainer.style.padding = "0";
      commentArr.forEach((comment) => {
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
        h4El.textContent = comment.commentUsername;
        h4El.classList.add("comment-buble__title");
        commentBubbleTextContaner.append(h4El);

        // comment text or paragraph
        const pEl = document.createElement("p");
        pEl.textContent = comment.commentText;
        pEl.classList.add("comment-buble__paragraph");
        commentBubbleTextContaner.append(pEl);

        //******************* comment and like *********************
        // comment and like container
        const commentAndLikeContainer = document.createElement("div");
        commentAndLikeContainer.classList.add("like-and-comment-container");
        commentHolderCard.append(commentAndLikeContainer);

        // like icon
        const likeIcon = document.createElement("span");
        likeIcon.innerHTML = `<svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                          likeDiv.append(likeIcon);
                        </svg>`;
        likeIcon.classList.add("icon-sizes");
        commentAndLikeContainer.append(likeIcon);

        // like function to change color (toggle)
        // commentAndLikeContainer.textContent = "";
        let isLiked = false;
        likeIcon.addEventListener("click", () => {
          isLiked = !isLiked;
          console.log(isLiked);

          // const commentId = comment.commentId;
          // if (blogIndex !== -1) {
          //   const commentIndex = blogs[blogIndex].comments.findIndex(
          //     (comment) => comment.commentId === commentId
          //   );
          //   if (commentIndex !== -1) {
          //     blogs[blogIndex].comments[commentIndex].commentLiked = isLiked;

          //     // save in local storage
          //     localStorage.setItem("blogs", JSON.stringify(blogs));
          //     renderComments(blogs);
          //   }
          // }

          if (isLiked) {
            likeIcon.innerHTML = `<svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="red"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                          likeDiv.append(likeIcon);
                        </svg>`;
          } else {
            likeIcon.innerHTML = `<svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                          likeDiv.append(likeIcon);
                        </svg>`;
          }
        });

        // reply coming soon
        // add comment card to main comment card
        commentMainContainer.append(commentCard);

        // console.log(comment);
      });
    }
  }
};

// render existing comment

renderComments(blogs);
