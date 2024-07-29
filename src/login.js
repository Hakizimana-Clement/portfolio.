const loginFormEl = document.querySelector(".signup-container__form-form");
const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
class="toast-icons"><path fill="#3498db" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>`;

// ************************** LOADER **************************
const loaderContainer = document.querySelector(".loader-container");

function decodeJwt(token) {
  const base64Payload = token.split(".")[1];
  const payloadBuffer = window.atob(base64Payload, "base64");
  return JSON.parse(payloadBuffer.toString());
}

const showLoaderr = () => {
  loaderContainer.style.display = "flex";
  document.body.style.overflow = "hidden";
};

const hideLoaderr = () => {
  loaderContainer.style.display = "none";
  document.body.style.overflow = "";
};
// // ************************** CHECK USER TOKEN **************************
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
      showLoaderr();
      // user data to login
      const loginUserData = {
        email: e.target.elements.email.value,
        password: e.target.elements.password.value,
      };

      // send to api for login
      const response = await fetch(
        "https://mybrand-be-j4ci.onrender.com/api/v1/users/login",
        {
          method: "POST",
          body: JSON.stringify(loginUserData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();

      // no response
      if (!response.ok) {
        hideLoaderr();
        console.log(json);
        createToast(error, errorIcon, "Error", json.error);
      }

      if (response.ok) {
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
    } finally {
      hideLoaderr();
    }
  }
});
