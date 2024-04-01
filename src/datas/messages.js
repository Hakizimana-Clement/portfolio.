const messageContainerEl = document.querySelector(".edit-container--testing");
// ************************** CHECK USER TOKEN **************************
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

// ************************** LOADER **************************
const loaderContainer = document.querySelector(".loader-container");
const showLoader = () => {
  loaderContainer.style.display = "flex";
};

const hideLoader = () => {
  loaderContainer.style.display = "none";
};

console.log("message working");

const fetchQueries = async () => {
  try {
    showLoader();
    const response = await fetch("http://localhost:4000/api/v1/queries", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json);
    }

    if (response.ok) {
      const allQueries = json.querries;
      console.log(allQueries);
      renderQueries(allQueries);
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

fetchQueries();

const renderQueries = (queries) => {
  // Clear existing content in the container
  messageContainerEl.innerHTML = "";

  // Loop through each query and create HTML elements for them
  queries.forEach((query) => {
    // Create elements for the message card
    const messageCard = document.createElement("div");
    messageCard.classList.add("edit-container");

    const imgAndTextContainer = document.createElement("div");
    imgAndTextContainer.classList.add(
      "edit-container___img-and-text-container"
    );

    // image
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("edit-image-container");
    const img = document.createElement("img");
    img.src = "../images/default-user.svg";
    // img.src = `data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="#d6d6d6" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.985 7.985 0 0 1 12 20a7.985 7.985 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984"/></g></svg>`;

    img.alt = "user message";
    imageContainer.appendChild(img);

    const textContainer = document.createElement("div");
    textContainer.classList.add(
      "edit-container___img-and-text-container--text"
    );

    // title
    const title = document.createElement("p");
    title.classList.add("edit-text", "edit-text__title");
    // title.textContent = query.name;
    title.innerHTML = `<strong>Name :</strong> <span>${query.name}</span>`;

    // email
    const email = document.createElement("div");
    email.classList.add("edit-text", "edit-text__title");
    // email.textContent = query.name;
    email.innerHTML = `<strong>Email:</strong> <span>${query.email}</span>`;

    // message
    const message = document.createElement("p");
    message.classList.add("edit-text", "edit-text__written");
    message.innerHTML = `<strong>Message:</strong> <span>${query.message.slice(
      0,
      22
    )}...</span>`;

    // attach in text container
    textContainer.appendChild(title);
    textContainer.appendChild(email);
    textContainer.appendChild(message);

    imgAndTextContainer.appendChild(imageContainer);
    imgAndTextContainer.appendChild(textContainer);

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("edit-btn-container");

    const replyBtn = document.createElement("a");
    replyBtn.classList.add("btn", "edit-btn");
    replyBtn.textContent = "Reply";
    replyBtn.href = "./admin-panel--messages-reply.html";

    const deleteBtn = document.createElement("a");
    deleteBtn.classList.add("btn-remove", "delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.href = "./admin-panel--delete-blog-confirm-message.html";

    btnContainer.appendChild(replyBtn);
    btnContainer.appendChild(deleteBtn);

    messageCard.appendChild(imgAndTextContainer);
    messageCard.appendChild(btnContainer);

    messageContainerEl.appendChild(messageCard);
  });
};
