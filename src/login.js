const loginFormEl = document.querySelector(".signup-container__form-form");
const showLoaderContainer = document.querySelector(".loader-container");
const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
class="toast-icons"><path fill="#3498db" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>`;

function decodeJwt(token) {
  const base64Payload = token.split(".")[1];
  const payloadBuffer = window.atob(base64Payload, "base64");
  return JSON.parse(payloadBuffer.toString());
}

// error form
const formError = {
  emailError: null,
  passwordError: null,
};
const showFormErros = (error) => {
  // email
  document.querySelector("#error-email").textContent = error.emailError || "";
  document.querySelector("#error-password").textContent =
    error.passwordError || "";
};

const showLoader = () => {
  showLoaderContainer.style.display = "flex";
};

const hideShowLoader = () => {
  showLoaderContainer.style.display = "none";
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
  // state
  let hasErrors = false;

  // validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (e.target.elements.email.value.trim().length === 0) {
    formError.emailError = "Email should not be empty";
  } else if (!emailPattern.test(e.target.elements.email.value.trim())) {
    formError.emailError = "Invalid email address.";
    hasErrors = true;
  } else {
    formError.emailError = null;
  }

  // // validate password
  if (e.target.elements.password.value.trim().length === 0) {
    formError.passwordError = "Password should not be empty";
    hasErrors = true;
  } else if (e.target.elements.password.value.trim().length < 8) {
    formError.passwordError = "Password should not be less than 8 character";
    hasErrors = true;
  } else {
    formError.passwordError = null;
  }

  // Show form errors
  showFormErrors(formError);

  if (!hasErrors) {
    try {
      // user data to login
      const loginUserData = {
        email: e.target.elements.email.value,
        password: e.target.elements.password.value,
      };

      // send to api for login
      const response = await fetch("http://localhost:4000/api/v1/users/login", {
        method: "POST",
        body: JSON.stringify(loginUserData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      // no response
      if (!response.ok) {
        console.log(json);
        createToast(error, errorIcon, json.message, json.error);
      }

      if (response.ok) {
        // show loader when user wait to login
        showLoader();

        const token = json.token;
        // decoded toke
        const decodedPayload = decodeJwt(token);

        // store in localstorage
        localStorage.setItem("userToken", token);
        if (decodedPayload.role === "user") {
          return location.assign("index.html");
        }
        if (decodedPayload.role === "admin") {
          return location.assign("./pages/admin-panel.html");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // const userDataToLogin = {
  //   email: e.target.elements.email.value,
  //   password: e.target.elements.password.value,
  // };
  // console.log(userDataToLogin);
  // try {
  //   const response = await fetch("http://localhost:4000/api/v1/users/login", {
  //     method: "POST",
  //     body: JSON.stringify(userDataToLogin),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const json = await response.json();
  //   if (!response.ok) {
  //     const error = json.error || "";
  //     const errors = {
  //       emailError: error.includes("email") ? error : "",
  //       passwordError: error.includes("password") ? error : "",
  //     };
  //     showFormErros(errors);
  //     hideShowLoader();
  //   }

  //   if (response.status === 201) {
  //     showLoader();
  //     // console.log("new user", json);
  //     // signupFormEl.reset();
  //     window.location.href = "signin.html";
  //   }
  //   console.log(json);
  // } catch (error) {
  //   console.log(error);
  // }
});

// Form submission logic here
// e.target.reset(); // Reset the form after successful submission
// location.assign(
//   "https://hakizimana-clement.github.io/my-brand-Clement-Hakizimana/pages/admin-panel.html"
// );
