const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
class="toast-icons"><path fill="#3498db" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>`;
const signupFormEl = document.querySelector(".signup-container__form-form");
const showLoaderContainer = document.querySelector(".loader-container");

// display error below input
const showLoader = () => {
  showLoaderContainer.style.display = "flex";
  document.body.style.overflow = "hidden";
};

const hideLoader = () => {
  showLoaderContainer.style.display = "none";
  document.body.style.overflow = "";
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
    e.target.reset();

    try {
      showLoader();
      const response = await fetch(
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
        createToast(error, errorIcon, "Error", json.error);
      }
      // validation
      if (!response.ok) {
        createToast(error, errorIcon, "Error", json.error);
      }

      if (json.message === "Signup successfully") {
        showLoader();
        // createToast("red", errorIcon, "Error", json.error);
        createToast("dfg", "info", "Create new account", "Successfully");
        setTimeout(() => {
          location.assign("signin.html");
        }, 3000);
      }
    } catch (error) {
      document.write("<div>something went wrong, wait a bit");
    } finally {
      hideLoader();
    }
  }
});
