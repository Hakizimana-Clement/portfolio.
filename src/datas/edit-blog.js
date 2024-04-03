const titleEl = document.querySelector(".new-blog-container-form__input-title");
const writerEl = document.querySelector(
  ".new-blog-container-form__input-writter"
);
const imageEl = document.querySelector(".new-blog-container-form__input-image");
const contentEl = document.querySelector(
  ".new-blog-container-form__input-textarea"
);

const blogId = location.hash.substring(1);

// ************************** CHECK USER TOKEN **************************
const token = localStorage.getItem("userToken");
if (!token) {
  console.log("Token is missing. Redirecting to home page.");
  location.assign("../signin.html");
} else {
  const decodedPayload = decodedJwt(token);
  if (decodedPayload && decodedPayload.role !== "admin") {
    console.log("User is not an admin. Redirecting to home page.");
    location.assign("../signin.html");
  }
}

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

/*
blogid = ""
blogid =2

blogid = 2
 window.load = ()=>{

   1. set value (fetchblog)
    - title
    - writer

   2. on submit (update blog)
    - title 

   3. update blog
 }

 
*/

// ************************** UPDATE BLOG **************************
// const fetchUpdateBlog = async (updateData) => {
const fetchUpdateBlog = async (updateData) => {
  try {
    showLoader();

    const formData = new FormData();
    formData.append("title", updateData.title);
    formData.append("writer", updateData.writer);
    formData.append("blogImage", updateData.blogImage);
    formData.append("content", updateData.content);
    console.log(formData);
    const response = await fetch(
      `https://mybrand-be-j4ci.onrender.com/api/v1/blogs/${blogId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const json = await response.json();

    if (response.status === 404 || json.blog._id !== blogId) {
      location.assign("../signin.html");
    }

    if (!response.ok) {
      hideLoader();
      console.log("blog id not found");
      console.log(json);
      return createToast(error, errorIcon, json.error, json.message);
    }

    if (response.ok) {
      console.log(json);
      const blog = json;
      createToast(error, successIcon, "Blog update", "successfully");
      location.assign("admin-panel--edit-blog.html");
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

const updateFormEl = document.querySelector(".new-blog-container-form");
updateFormEl.addEventListener("submit", async (e) => {
  console.log("clicked");
  e.preventDefault();

  const title = titleEl.value.trim();
  const writer = writerEl.value.trim();
  const blogImage = imageEl.files[0];
  const content = contentEl.value;

  const reader = new FileReader();
  reader.onloadend = async function () {
    const data = {
      title: title,
      writer: writer,
      blogImage: blogImage,
      content: content,
    };

    fetchUpdateBlog(data);
    updateFormEl.reset();
  };

  if (blogImage) {
    reader.readAsDataURL(blogImage);
  }
});

const fetchBlogs = async () => {
  try {
    showLoader();
    const response = await fetch(
      `https://mybrand-be-j4ci.onrender.com/api/v1/blogs/${blogId}`
    );
    const json = await response.json();

    if (!response.ok) {
      console.log(json);
    }

    if (response.ok) {
      const blog = json.blog;

      titleEl.value = blog.title;
      writerEl.value = blog.writer;
      imageEl.src = blog.blogImage;
      contentEl.value = blog.content;
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

fetchBlogs();
