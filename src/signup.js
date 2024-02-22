const email = document.querySelector("#email");
const fullNames = document.querySelector("#name");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const form = document.querySelector(".signup-container__form-form");
const errorEl = document.querySelector("#error");

form.addEventListener("submit", (e) => {
  let messages = [];

  // name check
  if (fullNames.value === "" || fullNames.value == null) {
    messages.push("Your full name is required");
  }
  // email check
  if (email.value === "" || email.value == null) {
    messages.push("Email is required");
  }

  // password
  if (password.value === "" || password.value == null) {
    messages.push("Password is required");
  }

  if (password.value.length < 8) {
    messages.push("Password must be longer than 8 character");
  }

  if (password.value.length > 10) {
    messages.push("Password must be less than 10 character");
  }

  if (password.value === "password") {
    messages.push("Password can't be password");
  }

  // confirm password
  if (confirmPassword.value === "" || confirmPassword.value == null) {
    messages.push("Confirm password is required");
  }

  if (password.value !== confirmPassword.value) {
    messages.push("Enter your password in confirm field");
  }
  if (messages.length > 0) {
    e.preventDefault();
    errorEl.innerHTML = messages.join(", ");
  }
});
