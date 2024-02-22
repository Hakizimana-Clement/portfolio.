const username = document.querySelector("#email");
const password = document.querySelector("#password");
const form = document.querySelector(".signup-container__form-form");
const errorEl = document.querySelector("#error");

form.addEventListener("submit", (e) => {
  let messages = [];
  // email check
  if (username.value === "" || username.value == null) {
    messages.push("Email is required");
  }

  // password
  if (password.value === "" || password.value == null) {
    messages.push("Password is required");
  }

  if (messages.length > 0) {
    e.preventDefault();
    errorEl.innerHTML = messages.join(", ");
  }
});
