console.log("hello test");
const form = document.querySelector(".user-form");

let formError = {
  errorPassword: null,
  errorUsername: null,
  errorConfirmPassword: null,
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // state
  let hasErrors = false;
  // console.log(e.target.elements.username.value);
  // username
  if (e.target.elements.username.value.length === 0) {
    formError.errorUsername = "Username name should no be empty.";
    hasErrors = true;
  } else if (e.target.elements.username.value.length < 3) {
    formError.errorUsername =
      "Username name should be have more than three (3) words.";
    hasErrors = true;
  } else {
    formError.errorUsername = null;
  }

  // Password
  if (e.target.elements.password.value.length === 0) {
    formError.errorPassword = "Password should no be empty.";
    hasErrors = true;
  } else if (e.target.elements.password.value.length < 8) {
    formError.errorPassword = "Password should be greater than 8 character.";
    hasErrors = true;
  } else if (e.target.elements.password.value.length > 10) {
    formError.errorPassword = "Password should less than 10 character.";
    hasErrors = true;
  }
  // Confirm Password
  if (e.target.elements.confirmPassword.value.length === 0) {
    formError.errorPassword = "Password should no be empty.";
    hasErrors = true;
  } else if (
    e.target.elements.password.value !== e.target.elements.confirmPassword.value
  ) {
    formError.errorPassword = "Please enter the password again.";
    hasErrors = true;
  }
  showFormErrors(formError);

  if (hasErrors) {
    return;
  }
  console.log("submitted");
});
