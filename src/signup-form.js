const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
class="toast-icons"><path fill="#3498db" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>`;
const signupFormEl = document.querySelector(".signup-container__form-form");
const showLoaderContainer = document.querySelector(".loader-container");

// display error below input
const showLoader = () => {
  showLoaderContainer.style.display = "flex";
};

const hideLoader = () => {
  showLoaderContainer.style.display = "none";
};

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
signupFormEl.addEventListener("submit", async (e) => {
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

  const userDataToSignup = {
    name: e.target.elements.name.value,
    email: e.target.elements.email.value,
    password: e.target.elements.password.value,
    "confirm password": e.target.elements.confirmPassword.value,
  };
  if (!hasErrors) {
    // Form submission logic here
    // console.log("login successfully!");
    e.target.reset();

    try {
      showLoader();
      const response = await fetch(
        // "https://mybrand-be-j4ci.onrender.com/api/v1/users/signup",
        "https://mybrand-be-j4ci.onrender.com/api/v1/users/signup",
        {
          method: "POST",
          body: JSON.stringify(userDataToSignup),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();

      if (json.status === "409") {
        console.log(json);

        createToast(error, errorIcon, "Error", json.error);
      }

      // if (json.status === "400") {
      //   createToast(error, errorIcon, "Error", json.error);
      // }
      // validation
      if (!response.ok) {
        createToast(error, errorIcon, "Error", json.error);
      }

      if (json.message === "Signup successfully") {
        showLoader();
        console.log("new user", json);
        // window.location.href = "signin.html";
        // createToast("red", errorIcon, "Error", json.error);
        createToast("dfg", "info", "Create new account", "Successfully");
        setTimeout(() => {
          location.assign("signin.html");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      document.write("<div>something went wrong, wait a bit");
    } finally {
      hideLoader();
    }
  }
});

// const showFormErros = (error) => {
//   // email
//   document.querySelector("#name-error").textContent = error.nameError || "";
//   document.querySelector("#email-error").textContent = error.emailError || "";
//   document.querySelector("#password-error").textContent =
//     error.passwordError || "";
//   document.querySelector("#confirm-password-error").textContent =
//     error.confirmPasswordError || "";
// };

// signupFormEl.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const userDataToSignup = {
//     name: e.target.elements.name.value,
//     email: e.target.elements.email.value,
//     password: e.target.elements.password.value,
//     "confirm password": e.target.elements.confirmPassword.value,
//   };
//   try {
//     const response = await fetch(
//       "https://mybrand-be-j4ci.onrender.com/api/v1/users/signup",
//       {
//         method: "POST",
//         body: JSON.stringify(userDataToSignup),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const json = await response.json();
//     if (!response.ok) {
//       const error = json.error || "";

//       let nameError = "";
//       let emailError = "";
//       let passwordError = "";
//       let confirmPasswordError = "";

//       // Check for specific error messages related to each field
//       if (error.includes("name")) {
//         nameError = error;
//       }
//       if (error.includes("email")) {
//         emailError = error;
//       }
//       if (error.includes("Email already in use")) {
//         confirmPasswordError = error;
//       } else if (error.includes("confirm password is required")) {
//         confirmPasswordError = error;
//       } else if (error.includes("Password do not match")) {
//         confirmPasswordError = error;
//       } else if (error.includes("password")) {
//         passwordError = error;
//       }

//       const errors = {
//         nameError,
//         emailError,
//         passwordError,
//         confirmPasswordError,
//       };
//       showFormErros(errors);
//       hideShowLoader();
//     }

//     if (response.status === 201) {
//       showLoader();
//       // console.log("new user", json);
//       // signupFormEl.reset();
//       window.location.href = "signin.html";
//     }
//     // console.log(json);
//   } catch (error) {
//     console.log(error);
//   }
// });

// sign form
// signupFormEl.addEventListener("submit", (e) => {
//   console.log("clicked");
//   e.preventDefault();

//   // state
//   let hasErrors = false;

//   // Validate full name
//   if (e.target.elements.name.value.length === 0) {
//     formErrors.nameError = "full name should not be empty.";
//     hasErrors = true;
//   } else if (e.target.elements.name.value.length < 5) {
//     formErrors.nameError = "full name should not be less than 5 character.";
//     hasErrors = true;
//   } else {
//     formErrors.nameError = null;
//   }

//   // validate email
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailPattern.test(e.target.elements.email.value)) {
//     formErrors.emailError = "Invalid email address.";
//     hasErrors = true;
//   } else {
//     formErrors.emailError = null;
//   }

//   // validate password
//   if (e.target.elements.password.value.length === 0) {
//     formErrors.passwordError = "password  should not be empty.";
//     hasErrors = true;
//   } else if (e.target.elements.password.value.length < 8) {
//     formErrors.passwordError = "password should not be less than 8 character.";
//     hasErrors = true;
//   } else if (e.target.elements.password.value.length >= 15) {
//     formErrors.passwordError =
//       "password  should not greater than 15 character.";
//     hasErrors = true;
//   } else {
//     formErrors.passwordError = null;
//   }

//   // validate confirm password
//   if (e.target.elements.confirmPassword.value.length === 0) {
//     formErrors.confirmPasswordError = "confirm password  should not be empty.";
//     hasErrors = true;
//   } else if (
//     e.target.elements.confirmPassword.value.length !==
//     e.target.elements.password.value.length
//   ) {
//     formErrors.confirmPasswordError = "Re-enter password again.";
//     hasErrors = true;
//   } else {
//     formErrors.confirmPasswordError = null;
//   }

//   showFormErros(formErrors);

//   if (!hasErrors) {
//     // Form submission logic here
//     console.log("login successfully!");
//     e.target.reset(); // Reset the form after successful submission
//     location.assign(
//       "https://hakizimana-clement.github.io/my-brand-Clement-Hakizimana/pages/admin-panel.html"
//     );
//   }
// });
//   const error = json.error || {};
//   const errors = {
//     nameError: error.includes("name") ? error : "",
//     emailError: error.includes("email") ? error : "",
//     passwordError: error.includes("password") ? error : "",
//     confirmPasswordError: error.includes("Password do not match")
//       ? error
//       : "",
//   };
//   showFormErros(errors);
// const signupFormEl = document.querySelector(".signup-container__form-form");

// errors
