const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
class="toast-icons"><path fill="#3498db" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>`;
const successIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" class="toast-icons"><path fill="#0abf30" d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"/></svg>`;

const xValues = ["Querries", "Likes", "Blogs", "Comments"];
const barColors = ["#ae33bc", "#a30303", "#a5a801", "#46dcb5"];
// chart element
const queriesEl = document.querySelector(".querries-box--paragraph__number");
const likeEl = document.querySelector(".querries-box--paragraph__likes");
const blogEl = document.querySelector(".querries-box--paragraph__blogs");
const commentEl = document.querySelector(".querries-box--paragraph__comments");

// check user token is valid and also is admin
const token = localStorage.getItem("userToken");
if (!token) {
  console.log("Token is missing. Redirecting to home page.");
  createToast(
    "Info",
    errorIcon,
    "Token is missing",
    "Redirecting to home page."
  );
  location.assign("../index.html");
} else {
  const decodedPayload = decodedJwt(token);

  if (decodedPayload)
    if (decodedPayload.role !== "admin" || !token) {
      console.log("User is not an admin. Redirecting to home page.");

      createToast(
        "Info",
        errorIcon,
        "User is not an admin",
        "Redirecting to home page."
      );
      location.assign("../index.html");
    }
}
const tokenMethod = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

// ************************** LOADER **************************
const loaderContainer = document.querySelector(".loader-container");
const showLoader = () => {
  loaderContainer.style.display = "flex";
  document.body.style.overflow = "hidden";
};

const hideLoader = () => {
  loaderContainer.style.display = "none";
  document.body.style.overflow = "";
};

// ************************** FETCHING **************************
// querries
const fetchQueryNumber = async () => {
  try {
    showLoader();
    const response = await fetch(
      "https://mybrand-be-j4ci.onrender.com/api/v1/queries",
      tokenMethod
    );
    const json = await response.json();
    console.log(json);

    return json.querries.length;
  } catch (error) {
    return 0;
  } finally {
    hideLoader();
  }
};

// like
const fetchLikeNumber = async () => {
  try {
    showLoader();
    const response = await fetch(
      "https://mybrand-be-j4ci.onrender.com/api/v1/likes"
    );
    const json = await response.json();
    console.log(json);

    console.log("likes", json.likes.length);
    return json.likes.length;
  } catch (error) {
    return 0;
  } finally {
    hideLoader();
  }
};

// blogs
const fetchBlogNumber = async () => {
  try {
    showLoader();
    const response = await fetch(
      "https://mybrand-be-j4ci.onrender.com/api/v1/blogs"
    );
    const json = await response.json();
    console.log(json);

    console.log("blogs", json.blogs.length);
    return json.blogs.length;
  } catch (error) {
    return 0;
  } finally {
    hideLoader();
  }
};

//comments
const fetchCommentNumber = async () => {
  try {
    showLoader();
    const response = await fetch(
      "https://mybrand-be-j4ci.onrender.com/api/v1/comments"
    );
    const json = await response.json();
    console.log(json);

    console.log("comments", json.comments.length);
    return json.comments.length;
  } catch (error) {
    return 0;
  } finally {
    hideLoader();
  }
};

const populateChart = async () => {
  const queries = await fetchQueryNumber();
  const likes = await fetchLikeNumber();
  const blogs = await fetchBlogNumber();
  const comments = await fetchCommentNumber();
  const yValues = [queries, likes, blogs, comments];
  console.log(yValues);

  // dispaly on html element

  // chartjs

  new Chart("myChart", {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          position: "right",
        },
      },
      title: {
        display: true,
        title: "charts graph",
      },
    },
  });

  queriesEl.textContent = yValues[0];
  likeEl.textContent = yValues[1];
  blogEl.textContent = yValues[2];
  commentEl.textContent = yValues[3];
};

populateChart();

// *************** LOGOUT *****************
const logoutBtn = document.querySelector(".logout-link");

console.log("clicked");
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("userToken");
  location.assign("../index.html");
});
