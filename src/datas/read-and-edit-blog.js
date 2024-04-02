// select elements
const blogContainer = document.querySelector(".all-blog-container-testing");
// blogContainer.classList.add("edit-container");
const noMessageEL = document.querySelector(".no-message");

const loaderContainer = document.querySelector(".loader-container");
const showLoader = () => {
  loaderContainer.style.display = "flex";
};

const hideLoader = () => {
  loaderContainer.style.display = "none";
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

const fetchBlogs = async () => {
  try {
    showLoader();
    const response = await fetch("http://localhost:4000/api/v1/blogs/");
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

// local storage
// // blog arrays
// let blogs = [];

// // get data from local storage
// const blogJSON = localStorage.getItem("blogs");
// // check if data existing
// if (blogJSON !== null) {
//   blogs = JSON.parse(blogJSON);
// } else {
//   noMessageEL.textContent = "No Blogs";
//   console.log("no data");
// }

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
      `admin-panel--edit-upgrade.html#${blog._id}`
    );
    editBtnLink.classList.add("btn", "edit-btn");
    editBtnLink.textContent = "edit";
    // edit button for each blog according to id
    editBtnLink.addEventListener("click", () => {
      console.log("clicked");
      // console.log(blog._id);
      // editBlog(blog._id);
    });
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
  console.log("logout btn clicked");
  localStorage.removeItem("userToken");
  location.assign("../index.html");
});
