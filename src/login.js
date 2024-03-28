const loginFormEl = document.querySelector(".signup-container__form-form");
const showLoaderContainer = document.querySelector(".loader-container");

const showFormErros = (error) => {
  // email
  document.querySelector("#email-error").textContent = error.emailError || "";
  document.querySelector("#password-error").textContent =
    error.passwordError || "";
};

const showLoader = () => {
  showLoaderContainer.style.display = "flex";
};

const hideShowLoader = () => {
  showLoaderContainer.style.display = "none";
};
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
loginFormEl.addEventListener("submit", async (e) => {
  // console.log("clicked");
  e.preventDefault();

  const userDataToLogin = {
    email: e.target.elements.email.value,
    password: e.target.elements.password.value,
  };
  console.log(userDataToLogin);
  try {
    const response = await fetch("http://localhost:4000/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify(userDataToLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      const error = json.error || "";
      const errors = {
        emailError: error.includes("email") ? error : "",
        passwordError: error.includes("password") ? error : "",
      };
      showFormErros(errors);
      hideShowLoader();
    }

    if (response.status === 201) {
      showLoader();
      // console.log("new user", json);
      // signupFormEl.reset();
      window.location.href = "signin.html";
    }
    console.log(json);
  } catch (error) {
    console.log(error);
  }

  // // state
  // let hasErrors = false;

  // // validate email
  // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!emailPattern.test(e.target.elements.email.value)) {
  //   formError.emailError = "Invalid email address.";
  //   hasErrors = true;
  // } else {
  //   formError.emailError = null;
  // }

  // // // validate password
  // if (e.target.elements.password.value.length === 0) {
  //   formError.passwordError = "Password should not be empty";
  //   hasErrors = true;
  // } else if (e.target.elements.password.value.length <= 8) {
  //   formError.passwordError = "Password should not be less than 8 character";
  //   hasErrors = true;
  // } else {
  //   formError.passwordError = null;
  // }

  // // Show form errors
  // showFormErrors(formError);

  // if (!hasErrors) {
  //   // Form submission logic here
  //   console.log("Form submitted successfully!");
  //   e.target.reset(); // Reset the form after successful submission
  //   location.assign(
  //     "https://hakizimana-clement.github.io/my-brand-Clement-Hakizimana/pages/admin-panel.html"
  //   );
  // }
});
