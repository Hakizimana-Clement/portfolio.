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
  let hasErrors = false;

  // // Validate name
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
  } else if (e.target.elements.message.value.length > 400) {
    formError.errorMessage = "Message should not be have more than 400 words.";
    hasErrors = true;
  } else {
    formError.errorMessage = null;
  }

  // Show form errors
  showFormErrors(formError);

  if (!hasErrors) {
    // Form submission logic here
    const queryData = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      message: e.target.elements.message.value,
    };

    sendQueryFetch(queryData);
    e.target.reset(); // Reset the form after successful submission
    successMessageEl.style.display = "block";
  }
});

const sendQueryFetch = async (data) => {
  try {
    const response = await fetch(
      "https://mybrand-be-j4ci.onrender.com/api/v1/queries",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      console.log(json);
    }
  } catch (error) {
    console.log(error);
  }
};
