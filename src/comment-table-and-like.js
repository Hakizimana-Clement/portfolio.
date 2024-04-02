console.log("table working");

// ************************** LOADER **************************
const loaderContainer = document.querySelector(".loader-container");
const showLoader = () => {
  loaderContainer.style.display = "flex";
};

const hideLoader = () => {
  loaderContainer.style.display = "none";
};

// ************************** COMMENTS **************************
const fetchComments = async () => {
  try {
    showLoader();
    const response = await fetch(
      "https://mybrand-be-j4ci.onrender.com/api/v1/blogs"
    );
    const json = await response.json();

    if (!response.ok) {
      console.log(json);

      hideLoaderLoader();
    }

    if (response.ok) {
      console.log(json);
      const comments = json.blogs;
      renderComments(comments);
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};
fetchComments();

// **********************************************************************************
// ********************************* render commment ********************************
// **********************************************************************************

// **********************************************************************************
// ********************************* Table ******************************************
// **********************************************************************************
// target table container
const mainTableContainer = document.querySelector(
  ".comments-and-likes-container"
);

// create table
const tableContainer = document.createElement("table");
tableContainer.id = "myTable";

// Create table header row
const headerRow = document.createElement("tr");

// title header
// title
const titleHeader = document.createElement("th");
titleHeader.textContent = "Blog Title";
// comment
const commentsHeader = document.createElement("th");
commentsHeader.textContent = "Comments";
// like
const likesHeader = document.createElement("th");
likesHeader.textContent = "Likes";

// Append header cells to header row
headerRow.appendChild(titleHeader);
headerRow.appendChild(commentsHeader);
headerRow.appendChild(likesHeader);

// Append header row to table
tableContainer.appendChild(headerRow);

const renderComments = (blogs) => {
  blogs.forEach((blog) => {
    const row = document.createElement("tr");
    row.classList.add("table-data");
    // row.setAttribute("data-href", "comment-and-like-page-1.html");

    row.addEventListener("click", () => {
      console.log("row table clicked");
      location.assign(`comment-and-like-page-1.html#${blog._id}`);
    });
    const titleCell = document.createElement("td");
    titleCell.textContent = blog.title;

    const commentsCell = document.createElement("td");
    commentsCell.textContent = blog.comments.length;

    const likesCell = document.createElement("td");
    likesCell.textContent = blog.likes.length;

    row.appendChild(titleCell);
    row.appendChild(commentsCell);
    row.appendChild(likesCell);

    tableContainer.appendChild(row);
  });

  // Append table to container after adding header and rows
  mainTableContainer.appendChild(tableContainer);
};

// *************** LOGOUT *****************
const logoutBtn = document.querySelector(".logout-link");

logoutBtn.addEventListener("click", () => {
  console.log("deleted btn clicked");
  localStorage.removeItem("userToken");
  location.assign("../index.html");
});
// edit page not found
const pageNotFound = document.querySelector(".page-not-found");
pageNotFound.addEventListener("click", () => {
  document.querySelector(
    ".main-container__content--dashboard-wrapper"
  ).style.display = "none";
});
