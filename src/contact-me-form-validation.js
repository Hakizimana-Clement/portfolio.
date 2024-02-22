const names = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const error = document.querySelector(".container-me__form--error");
const form = document.querySelector(".contact-me__form");

form.addEventListener("submit", (e) => {
  console.log("clicked");
  let errors = [];

  // names
  if (names.value === "" || names.value === null) {
    errors.push("Name is Required");
  }

  // email
  if (email.value === "" || email.value === null) {
    errors.push("Email is Required");
  }
  // message

  if (message.value === "" || message.value === null) {
    errors.push("message is Required");
  }
  // error pop up
  if (errors.length > 0) {
    // e.preventDefault();
    error.toggleAttribute("hidden");
    error.innerHTML = errors.join(", ");
  }
});
console.log("hello there");
