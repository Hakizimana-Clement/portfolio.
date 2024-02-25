const showFormErrors = (error) => {
  if (error.errorUsername !== null) {
    document.querySelector("#error-username").textContent = error.errorUsername;
  } else if (error.errorPassword !== null) {
    document.querySelector("#error-password").textContent = error.errorPassword;
  } else if (error.errorConfirmPassword !== null) {
    document.querySelector("#error-confirm-password").textContent = "test";
    // error.errorConfirmPassword;
    // document.querySelector("#error-confirm-password").textContent =
    // error.errorConfirmPassword;
  } else {
    document.querySelector("#error-username").textContent = "";
    document.querySelector("#error-password").textContent = "";
    document.querySelector("#error-confirm-password").textContent = "";
  }
  console.log(error);
};
