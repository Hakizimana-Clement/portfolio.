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
  location.assign("../index.html");
} else {
  const decodedPayload = decodedJwt(token);

  if (decodedPayload)
    if (decodedPayload.role !== "admin" || !token) {
      console.log("User is not an admin. Redirecting to home page.");
      location.assign("../index.html");
    }
}
const tokenMethod = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

// querries
const fetchQueryNumber = async () => {
  try {
    const response = await fetch(
      "http://localhost:4000/api/v1/queries",
      tokenMethod
    );
    const json = await response.json();
    return json.querries.length;
  } catch (error) {
    return 0;
  }
};

// like
const fetchLikeNumber = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/likes");
    const json = await response.json();
    console.log(json);
    return json.likes.length;
  } catch (error) {
    return 0;
  }
};

// blogs
const fetchBlogNumber = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/blogs");
    const json = await response.json();
    console.log(json);
    return json.blogs.length;
  } catch (error) {
    return 0;
  }
};

//comments
const fetchCommentNumber = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/comments");
    const json = await response.json();
    console.log(json);
    return json.comments.length;
  } catch (error) {
    return 0;
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
