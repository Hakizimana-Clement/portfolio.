const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
class="toast-icons"><path fill="#3498db" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>`;
const successIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" class="toast-icons"><path fill="#0abf30" d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"/></svg>`;
// select elements
const blogContainer = document.querySelector(".all-blog-container-testing");
// blogContainer.classList.add("edit-container");
const noMessageEL = document.querySelector(".no-message");

// *********************** LOADER ********************************************
const loaderContainer = document.querySelector(".loader-container");
const showLoader = () => {
  loaderContainer.style.display = "flex";
  document.body.style.overflow = "hidden";
};

const hideLoader = () => {
  loaderContainer.style.display = "none";
  document.body.style.overflow = "";
};

// check user token is valid and also is admin
const token = localStorage.getItem("userToken");
if (!token) {
  console.log("Token is missing. Redirecting to home page.");
  location.assign("../index.html");
} else {
  const decodedPayload = decodedJwt(token);

  if (decodedPayload)
    if (decodedPayload.role !== "admin" || !token) {
      console.log("User is not an admin. Redirecting to home page.");
      location.assign("../index.html");
    }
}

// // ******************* Remove blog************************
// const removeBlog = async (blogId) => {
//   try {
//     const response = await fetch(
//       `https://mybrand-be-j4ci.onrender.com/api/v1/blogs/${blogId}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     const json = await response.json();
//     console.log(json);

//     if (json.status === "401") {
//       return createToast(error, errorIcon, json.error, json.message);
//     }
//     if (json.status === "404") {
//       return createToast(error, errorIcon, json.error, json.message);
//     }

//     // if (json.status === "200") {
//     //   return createToast(error, successIcon, "delete blog", "successfully");
//     // }
//   } catch (error) {
//     console.log(error);
//   }
// };

const fetchBlogs = async () => {
  try {
    showLoader();
    const response = await fetch(
      "https://mybrand-be-j4ci.onrender.com/api/v1/blogs/"
    );
    const json = await response.json();

    if (!response.ok) {
      console.log(json);
      noMessageEL.textContent = "No Blogs";
      console.log("no data");
    }

    if (response.ok) {
      const allBlogs = json.blogs;
      // console.log(allBlogs);
      renderBlogs(allBlogs);
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

fetchBlogs();

// ******************* Render blog ************************
const renderBlogs = (blogsArray) => {
  console.log(blogsArray);
  blogsArray.forEach((blog) => {
    // main container
    const mainContainer = document.createElement("div");
    mainContainer.classList.add("edit-container");
    // blog card
    // 1 container
    const blogCard = document.createElement("div");
    blogCard.classList.add("edit-container___img-and-text-container");

    // 2 container
    // edit button container
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("edit-btn-container");
    const editBtnLink = document.createElement("a");
    // redirect to update page
    editBtnLink.setAttribute(
      "href",
      `admin-panel--delete-blog-confirm-message.html#${blog._id}`
    );
    editBtnLink.classList.add("btn", "btn-remove", "btn-remove-padding");
    editBtnLink.textContent = "delete";
    // edit button for each blog according to id
    // editBtnLink.addEventListener("click", () => {
    //   console.log("clicked");
    //   // console.log(blog._id);
    //   removeBlog(blog._id);
    //   renderBlogs(blog);
    // });
    btnContainer.append(editBtnLink);

    // blog img
    // img div
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("edit-image-container");
    const blogImgEl = document.createElement("img");
    blogImgEl.src = blog.blogImage;
    imgDiv.append(blogImgEl);
    blogCard.append(imgDiv);
    // blogContainer.append(blogImgEl);

    ///////////// text container //////////////
    const textDiv = document.createElement("div");
    textDiv.classList.add("edit-container___img-and-text-container--text");
    // blog title
    const pTitleEl = document.createElement("p");
    pTitleEl.innerHTML = `<strong>Title :</strong> ${blog.title}`;
    pTitleEl.classList.add("edit-text", "edit-text__title");
    textDiv.append(pTitleEl);
    blogCard.append(textDiv);
    // blogContainer.append(pTitleEl);

    // blog writer
    const pWriterEl = document.createElement("p");
    pWriterEl.innerHTML = `<strong>Writer:</strong> ${blog.writer}`;
    pWriterEl.classList.add("edit-text", "edit-text__title");
    textDiv.append(pWriterEl);
    // blogContainer.append(pWriterEl);

    // blog paragraph
    const pBlogEl = document.createElement("p");
    pBlogEl.innerHTML = `<strong>Body :</strong> ${blog.content.slice(
      3,
      65
    )}...`;
    // pBlogEl.textContent = blog.body;
    pBlogEl.classList.add("edit-text", "edit-text__title");
    textDiv.append(pBlogEl);
    // blogContainer.append(pBlogEl);
    mainContainer.append(blogCard);
    mainContainer.append(btnContainer);
    blogContainer.append(mainContainer);
  });
};
// *************** LOGOUT *****************
const logoutBtn = document.querySelector(".logout-link");

logoutBtn.addEventListener("click", () => {
  console.log("clicked");
  localStorage.removeItem("userToken");
  location.assign("../index.html");
});
