const token = localStorage.getItem("userToken");
// console.log(token);

if (token) {
  // check user jwt decoded function
  const decodedPayload = decodedJwt(token);
  // console.log(decodedPayload);
  if (decodedPayload.role === "user") {
    document.querySelector(".mobile-nav___link .login-btn--text").textContent =
      decodedPayload.name.split(" ")[0];
    document.querySelector(".larger-screen-list .login-btn--text").textContent =
      decodedPayload.name.split(" ")[0];

    //////// with welcome message /////////////
    // document.querySelector(".mobile-nav___link .login-btn--text").textContent =
    // "Welcome " + decodedPayload.name.split(" ")[0];
    // document.querySelector(".larger-screen-list .login-btn--text").textContent =
    // "Welcome " + decodedPayload.name.split(" ")[0];
  }
}
