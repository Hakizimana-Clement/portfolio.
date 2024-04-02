const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
class="toast-icons"><path fill="#3498db" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>`;
const successIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" class="toast-icons"><path fill="#0abf30" d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"/></svg>`;

const deleteBtnEl = document.querySelector(".confirm-btn");
const cancelBtnEl = document.querySelector(".btn-cancel");

// remove # on id
const blogId = location.hash.substring(1);
// when no blog id in url redirect home page
if (blogId.length === 0) {
  location.assign("index.html");
}

// *********************** LOADER ********************************************
const loaderContainer = document.querySelector(".loader-container");
const showLoader = () => {
  loaderContainer.style.display = "flex";
};

const hideLoader = () => {
  loaderContainer.style.display = "none";
};

// ************************** CHECK USER TOKEN **************************
const token = localStorage.getItem("userToken");
if (!token) {
  console.error("Token not found in localStorage");
  location.assign("../index.html");
}

console.log(blogId);

deleteBtnEl.addEventListener("click", () => {
  console.log("delete clicked");
  removeBlog(blogId);
});

// ******************* Remove blog************************
const removeBlog = async (blogId) => {
  console.log(blogId);
  try {
    showLoader();
    const response = await fetch(
      `http://localhost:4000/api/v1/blogs/${blogId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await response.json();
    console.log(json);

    if (json.status === "401") {
      hideLoader();
      return createToast(error, errorIcon, json.error, json.message);
    }
    if (json.status === "404") {
      hideLoader();
      return createToast(error, errorIcon, json.error, json.message);
    }

    if (json.status === "200") {
      hideLoader();
      createToast(error, successIcon, "delete blog", "successfully");
      location.assign("admin-panel--delete-blog.html");
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};
// *************** LOGOUT *****************
const logoutBtn = document.querySelector(".logout-link");

logoutBtn.addEventListener("click", () => {
  console.log("clicked");
  localStorage.removeItem("userToken");
  location.assign("../index.html");
});
