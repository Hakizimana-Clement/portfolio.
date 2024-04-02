console.log("table working");
// document.addEventListener("DOMContentLoaded", function () {
//   // This code runs when the DOM (Document Object Model) has been fully loaded and parsed.

//   var table = document.getElementById("myTable");
//   if (table) {
//     // This line retrieves a reference to the table element with the ID "myTable" from the DOM.
//     var rows = table.getElementsByClassName("table-data");
//     // This line retrieves all elements with the class "table-data" that are descendants of the table element.

//     Array.prototype.forEach.call(rows, function (row) {
//       // This line converts the HTMLCollection (retrieved by getElementsByClassName) into an array and then loops through each element in the array.

//       row.addEventListener("click", function () {
//         // This line adds a click event listener to each table row.

//         var href = this.getAttribute("data-href");
//         // This line retrieves the value of the "data-href" attribute of the clicked table row.

//         if (href) {
//           // This line checks if the "data-href" attribute has a value (i.e., if it's not null or empty).

//           window.location.href = href;
//           // This line changes the location of the current page to the URL specified in the "data-href" attribute, effectively navigating to that page.
//         }
//       });
//     });
//   }
// });

const fetchComments = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/blogs");
    const json = await response.json();

    if (!response.ok) {
      console.log(json);
    }

    if (response.ok) {
      console.log(json);
      const comments = json.blogs;
      renderComments(comments);
    }
  } catch (error) {
    console.log(error);
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
