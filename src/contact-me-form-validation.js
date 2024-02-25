// contact form
const contactForm = document.querySelector(".contact-me__form");
const successMessageEl = document.querySelector(".success-message");
// starting point of error
let formError = {
  errorName: "null",
  errorEmail: "null",
  errorMessage: "null",
};

// Function to display form errors
const showFormErrors = (error) => {
  document.querySelector("#name-error").textContent = error.errorName || "";
  document.querySelector("#email-error").textContent = error.errorEmail || "";
  document.querySelector("#message-error").textContent =
    error.errorMessage || "";
};
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // State
  let hasErrors = false;

  // Validate name
  if (e.target.elements.name.value.length === 0) {
    formError.errorName = "Name should not be empty.";
    hasErrors = true;
  } else if (e.target.elements.name.value.length < 3) {
    formError.errorName = "Name should have more than three characters.";
    hasErrors = true;
  } else {
    formError.errorName = null;
  }

  //  Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(e.target.elements.email.value)) {
    formError.errorEmail = "Invalid email address.";
    hasErrors = true;
  } else {
    formError.errorEmail = null;
  }

  // Validate message
  if (e.target.elements.message.value.length === 0) {
    formError.errorMessage = "Message should not be empty.";
    hasErrors = true;
  } else if (e.target.elements.message.value.length > 50) {
    formError.errorMessage = "Message should not be have more than 50 words.";
    hasErrors = true;
  } else {
    formError.errorMessage = null;
  }

  // Show form errors
  showFormErrors(formError);

  if (!hasErrors) {
    // Form submission logic here
    console.log("Form submitted successfully!");
    e.target.reset(); // Reset the form after successful submission
    successMessageEl.style.display = "block";
  }
});
