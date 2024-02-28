// local storage
let comments = [];
const commentJSON = localStorage.getItem("comments");

// checking if comment
if (commentJSON !== null) {
  comments = JSON.parse(commentJSON);
}
const commentForm = document.querySelector(".leave-comment__form-and-input");
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    name: e.target.elements.name.value,
    email: e.target.elements.email.value,
    comment: e.target.elements.comment.value,
  };
  comments.push(data);
  localStorage.setItem("comments", JSON.stringify(comments));
  console.log("clicked");
  commentForm.reset();
});

console.log(comments);

const commentContainer = document.querySelector(".all-comments-container");
