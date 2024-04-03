const token = localStorage.getItem("userToken");
if (!token) {
  console.log("Token is missing. Redirecting to home page.");
  location.assign("../signin.html");
} else {
  const decodedPayload = decodedJwt(token);

  if (decodedPayload)
    if (decodedPayload.role !== "admin") {
      console.log("User is not an admin. Redirecting to home page.");
      location.assign("../signin.html");
    }
}

// *************** LOGOUT *****************
const logoutBtn = document.querySelector(".logout-link");

logoutBtn.addEventListener("click", () => {
  console.log("deleted btn clicked");
  localStorage.removeItem("userToken");
  location.assign("../index.html");
});

// ************* edit page not found ***************************
const pageNotFound = document.querySelector(".page-not-found");
pageNotFound.addEventListener("click", () => {
  document.querySelector(
    ".main-container__content--dashboard-wrapper"
  ).style.display = "none";
});
