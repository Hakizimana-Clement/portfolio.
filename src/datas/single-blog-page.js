// elements
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

// remove # on id
const blogId = location.hash.substring(1);

// *********** localstorage ***************
let blogs = [];

const blogJSON = localStorage.getItem("blogs");

if (blogJSON !== null) {
  blogs = JSON.parse(blogJSON);
}
// **************************
// ********* checking id from localstorage is equal to id in hash ****************
const blog = blogs.find((blog) => blog.id === blogId);

if (blog === undefined) {
  location.assign("/index.html");
}
// **************************

//  updating page

// title
h1El.textContent = blog.title;
// blog image
imgEl.src = blog.coverImage;

pEl.textContent = blog.body.slice(3);
// writer img
writeImage.src = blog.writerImage;
// writer name
writeName.textContent = blog.writer;

//********************** LIKE********************* */
// find blog which matched id
const blogIndex = blogs.findIndex((blog) => blog.id === blogId);
// if blog found
if (blogIndex !== -1) {
  // state
  // default is false if not clicked
  let isLiked = blogs[blogIndex].like || false;
  likeLinkEl.addEventListener("click", () => {
    // toggle true or false
    isLiked = !isLiked;
    // update like in blog locastorage
    blogs[blogIndex].like = isLiked;
    // save it
    localStorage.setItem("blogs", JSON.stringify(blogs));
  });
} else {
  console.log("this blog,can't be liked");
}

//********************** COMMENTS ********************* */

// errors
let formErrors = {
  nameError: null,
  emailError: null,
  commentTextError: null,
};

// display error below input
const showFormErrors = (error) => {
  // name
  document.querySelector("#name-error").textContent = error.nameError;

  //email
  document.querySelector("#email-error").textContent = error.emailError;
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

  const nameInput = e.target.elements.name.value.trim();
  const emailInput = e.target.elements.email.value.trim();
  const commentInput = e.target.elements.comment.value.trim();

  // validate name validation
  if (nameInput.length === 0) {
    formErrors.nameError = "Please enter your name";
    hasErrors = true;
  } else if (nameInput.length < 5) {
    formErrors.nameError = "Name should be less than 5 character.";
    hasErrors = true;
  } else {
    formErrors.nameError = null;
  }

  // validate email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput)) {
    formErrors.emailError = "Invalid email address.";
    hasErrors = true;
  } else {
    formErrors.emailError = null;
  }

  // comment text validation
  if (commentInput.length === 0) {
    formErrors.commentTextError = "Please enter your comment";
    hasErrors = true;
  } else if (commentInput.length < 100) {
    formErrors.commentTextError =
      "Your comment should not be less than 100 character.";
    hasErrors = true;
  } else {
    formErrors.commentTextError = null;
  }

  showFormErrors(formErrors);
  if (!hasErrors) {
    e.target.reset();
    //******* add comment in local storage *****************
    const newComment = {
      commentId: uuidv4(),
      commentUsername: e.target.elements.name.value.trim(),
      commentEmail: e.target.elements.email.value.trim(),
      commentText: e.target.elements.comment.value.trim(),
      commentLiked: false,
    };

    const blogIndex = blogs.findIndex((blog) => blog.id === blogId);
    // blog index found
    if (blogIndex !== -1) {
      // Here we targer the blog we want to update and then add comment in it.
      blogs[blogIndex].comments.push(newComment);
      // localstorage
      localStorage.setItem("blogs", JSON.stringify(blogs));
      renderComments(blogs);
      commentFormEl.reset();
    } else {
      console.log("Blog comment not found");
    }
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
    if (commentArr.length === 0) {
      noCommentPEl.textContent = "No Comments";
    } else {
      commentArr.forEach((comment) => {
        // comment card or container
        const commentCard = document.createElement("div");
        commentCard.classList.add("blog-comment__main-container");

        // empty div -> comment card
        const commentHolderCard = document.createElement("div");
        commentCard.append(commentHolderCard);

        //******************* name and comment text *********************
        // bubble comment
        const commentBubbleTextContaner = document.createElement("div");
        commentBubbleTextContaner.classList.add("comment-buble");
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
renderComments(blogs);
