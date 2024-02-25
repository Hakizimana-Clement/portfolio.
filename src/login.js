const loginFormEl = document.querySelector(".signup-container__form-form");

// error form
const formError = {
  emailError: null,
  passwordError: null,
};

// function to display error
const showFormErrors = (error) => {
  document.querySelector("#error-email").textContent = error.emailError || "";
  document.querySelector("#error-password").textContent =
    error.passwordError || "";
};

// login form
loginFormEl.addEventListener("submit", (e) => {
  console.log("clicked");
  e.preventDefault();

  // state
  let hasErrors = false;

  // validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(e.target.elements.email.value)) {
    formError.emailError = "Invalid email address.";
    hasErrors = true;
  } else {
    formError.emailError = null;
  }

  // // validate password
  if (e.target.elements.password.value.length === 0) {
    formError.passwordError = "Password should not be empty";
    hasErrors = true;
  } else if (e.target.elements.password.value.length <= 8) {
    formError.passwordError = "Password should not be less than 8 character";
    hasErrors = true;
  } else {
    formError.passwordError = null;
  }
  // else if (e.target.elements.password.value.length > 8) {
  //   formError.passwordError = "Password should be less than 8 character";
  //   hasErrors = true;
  // }

  // Show form errors
  showFormErrors(formError);

  if (!hasErrors) {
    // Form submission logic here
    console.log("Form submitted successfully!");
    e.target.reset(); // Reset the form after successful submission
    location.assign(
      "https://hakizimana-clement.github.io/my-brand-Clement-Hakizimana/pages/admin-panel.html"
    );
  }
});

// const username = document.querySelector("#email");
// const password = document.querySelector("#password");

// const form = document.querySelector(".signup-container__form-form");
// const errorEl = document.querySelector("#error");

// form.addEventListener("submit", (e) => {
//   let messages = [];
//   // email check
//   if (username.value === "" || username.value == null) {
//     messages.push("Email is required");
//   }

//   // password
//   if (password.value === "" || password.value == null) {
//     messages.push("Password is required");
//   }

//   if (messages.length > 0) {
//     e.preventDefault();
//     errorEl.innerHTML = messages.join(", ");
//   }
// });
