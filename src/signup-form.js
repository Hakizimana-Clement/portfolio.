const signupFormEl = document.querySelector(".signup-container__form-form");

// errors
let formErrors = {
  nameError: null,
  emailError: null,
  passwordError: null,
  confirmPasswordError: null,
};

// display error below input
const showFormErros = (error) => {
  // email
  document.querySelector("#name-error").textContent = error.nameError || "";
  document.querySelector("#email-error").textContent = error.emailError || "";
  document.querySelector("#password-error").textContent =
    error.passwordError || "";
  document.querySelector("#confirm-password-error").textContent =
    error.confirmPasswordError || "";
};

// sign form
signupFormEl.addEventListener("submit", (e) => {
  console.log("clicked");
  e.preventDefault();

  // state
  let hasErrors = false;

  // Validate full name
  if (e.target.elements.name.value.length === 0) {
    formErrors.nameError = "full name should not be empty.";
    hasErrors = true;
  } else if (e.target.elements.name.value.length < 5) {
    formErrors.nameError = "full name should not be less than 5 character.";
    hasErrors = true;
  } else {
    formErrors.nameError = null;
  }

  // validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(e.target.elements.email.value)) {
    formErrors.emailError = "Invalid email address.";
    hasErrors = true;
  } else {
    formErrors.emailError = null;
  }

  // validate password
  if (e.target.elements.password.value.length === 0) {
    formErrors.passwordError = "password  should not be empty.";
    hasErrors = true;
  } else if (e.target.elements.password.value.length < 8) {
    formErrors.passwordError = "password should not be less than 8 character.";
    hasErrors = true;
  } else if (e.target.elements.password.value.length >= 15) {
    formErrors.passwordError =
      "password  should not greater than 15 character.";
    hasErrors = true;
  } else {
    formErrors.passwordError = null;
  }

  // validate confirm password
  if (e.target.elements.confirmPassword.value.length === 0) {
    formErrors.confirmPasswordError = "confirm password  should not be empty.";
    hasErrors = true;
  } else if (
    e.target.elements.confirmPassword.value.length !==
    e.target.elements.password.value.length
  ) {
    formErrors.confirmPasswordError = "Re-enter password again.";
    hasErrors = true;
  } else {
    formErrors.confirmPasswordError = null;
  }

  showFormErros(formErrors);

  if (!hasErrors) {
    // Form submission logic here
    console.log("login successfully!");
    e.target.reset(); // Reset the form after successful submission
    location.assign(
      "https://hakizimana-clement.github.io/my-brand-Clement-Hakizimana/pages/admin-panel.html"
    );
  }
});
