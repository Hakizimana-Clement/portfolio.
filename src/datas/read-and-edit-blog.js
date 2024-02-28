// select elements
const blogContainer = document.querySelector(".all-blog-container-testing");
// blogContainer.classList.add("edit-container");
const noMessageEL = document.querySelector(".no-message");
// blog arrays
let blogs = [];

// get data from local storage
const blogJSON = localStorage.getItem("blogs");
// check if data existing
if (blogJSON !== null) {
  blogs = JSON.parse(blogJSON);
} else {
  noMessageEL.textContent = "No Blogs";
  console.log("no data");
}

const renderBlogs = (blogsArray) => {
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
    editBtnLink.classList.add("btn", "edit-btn");
    editBtnLink.textContent = "edit";
    btnContainer.append(editBtnLink);

    // blog img
    // img div
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("edit-image-container");
    const blogImgEl = document.createElement("img");
    blogImgEl.src = blog.image;
    imgDiv.append(blogImgEl);
    blogCard.append(imgDiv);
    // blogContainer.append(blogImgEl);

    ///////////// text container //////////////
    const textDiv = document.createElement("div");
    textDiv.classList.add("edit-container___img-and-text-container--text");
    // blog title
    const pTitleEl = document.createElement("p");
    pTitleEl.textContent = blog.title;
    pTitleEl.classList.add("edit-text", "edit-text__title");
    textDiv.append(pTitleEl);
    blogCard.append(textDiv);
    // blogContainer.append(pTitleEl);

    // blog writer
    const pWriterEl = document.createElement("p");
    pWriterEl.textContent = blog.writer;
    pWriterEl.classList.add("edit-text", "edit-text__title");
    textDiv.append(pWriterEl);
    // blogContainer.append(pWriterEl);

    // blog paragraph
    const pBlogEl = document.createElement("p");
    pBlogEl.textContent = blog.body;
    pBlogEl.classList.add("edit-text", "edit-text__title");
    textDiv.append(pBlogEl);
    // blogContainer.append(pBlogEl);
    mainContainer.append(blogCard);
    mainContainer.append(btnContainer);
    blogContainer.append(mainContainer);
  });
};
console.log(blogs);

renderBlogs(blogs);
