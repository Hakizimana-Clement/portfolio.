const formEl = document.querySelector(".new-blog-container-form");

const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
class="toast-icons"><path fill="#3498db" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>`;
const successIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" class="toast-icons"><path fill="#0abf30" d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"/></svg>
         `;

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
// console.log(token);

// ************************** LOADER **************************
const loaderContainer = document.querySelector(".loader-container");
const showLoader = () => {
  loaderContainer.style.display = "flex";
};

const hideLoader = () => {
  loaderContainer.style.display = "none";
};

const fetchCreateBlog = async (blogData) => {
  try {
    showLoader();
    const formData = new FormData();
    // data to send to server
    formData.append("title", blogData.title);
    formData.append("writer", blogData.writer);
    formData.append("content", blogData.content);
    formData.append("blogImage", blogData.blogImage);

    console.log(formData);

    const response = await fetch("http://localhost:4000/api/v1/blogs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const jsonData = await response.json();

    if (!response.ok) {
      hideLoader();
      console.log("error ", jsonData);
      return createToast(error, errorIcon, jsonData.error, jsonData.message);
    }
    if (response.ok) {
      return createToast(error, successIcon, "Success", jsonData.message);
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

// errors
let formErrors = {
  titleError: null,
  writerError: null,
  // writeImageError: null,
  blogImageError: null,
  bodyTextError: null,
};
// display error on input below
const showFormErrors = (error) => {
  // title
  document.querySelector("#title-error").textContent = error.titleError;

  // writer
  document.querySelector("#writer-error").textContent = error.writerError;

  // // writer image
  // document.querySelector("#writer-image-error").textContent =
  //   error.writeImageError;

  // cover image
  document.querySelector("#upload-image-error").textContent =
    error.blogImageError;

  // body Text
  document.querySelector("#body-text-error").textContent = error.bodyTextError;
};

//********************************* FORM OF CREATE NEW BLOG *****************************************************
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  let hasErrors = false;

  /////////// Form Validation ////////////////////
  const title = e.target.elements.title.value.trim();
  const writer = e.target.elements.writer.value.trim();
  // const writeImage = e.target.elements.writeImage.files[0];
  const blogImage = e.target.elements.coverImage.files[0];
  // const body = e.target.elements.body.value;
  // const body = e.target.elements.body.getContent();
  const body = tinymce.get("blogDescription");
  // document.querySelector("#textarea").value;
  // clean body before save in local storage
  // const cleanBodyText = body.getContent();

  const cleanBodyText = body.getContent(); // Replace 'textarea' with the ID of your textarea element

  // .replace(/<\/?p>/g, "")
  // .replace(/&amp;nbsp;&nbsp;&rsquo;/g, "")
  // .trim();

  console.log("dddddddddddddd", cleanBodyText);
  // set upload max size
  // 50MB
  const maxImgSize = 50 * 1024 * 1024;

  // validate title
  if (title.length === 0) {
    formErrors.titleError = "Please type bog title";
    hasErrors = true;
  } else if (title.length > 200) {
    formErrors.titleError = "Blog title must be less than 200 character";
    hasErrors = true;
  } else {
    formErrors.titleError = null;
  }
  // validate writer
  if (writer.length === 0) {
    formErrors.writerError = "Please type writer name";
    hasErrors = true;
  } else if (writer.length > 50) {
    formErrors.writerError = "writer name must be less than 50 character";
    hasErrors = true;
  } else {
    formErrors.writerError = null;
  }

  // validate cover image
  if (!blogImage) {
    formErrors.blogImageError = "Please upload an image";
    hasErrors = true;
  } else if (blogImage.size > maxImgSize) {
    formErrors.blogImageError = "Image size exceeds 50MB";
    hasErrors = true;
  } else {
    formErrors.blogImageError = null;
  }

  // validate body text
  if (cleanBodyText.length === 0) {
    formErrors.bodyTextError = "Please type blog paragraphs ";
    hasErrors = true;
  } else if (cleanBodyText.length > 50000) {
    formErrors.bodyTextError =
      "blog paragraphs must be less than 50000 character ";
    hasErrors = true;
  } else {
    formErrors.cleanBodyText = null;
    formErrors.bodyTextError = "";
  }

  showFormErrors(formErrors);
  if (!hasErrors) {
    // console.log("pass");
    e.target.reset();
    // save in local storage
    // reader 1 for writer image
    // const reader1 = new FileReader();
    // reader 2 for cover image
    const reader2 = new FileReader();

    // reader1.onloadend = function () {
    reader2.onloadend = async function () {
      const data = {
        // blog parts
        title: title,
        writer: writer,
        // writerImage: reader1.result,
        blogImage: blogImage,
        content: cleanBodyText,
      };
      // console.log(data);
      await fetchCreateBlog(data);
      formEl.reset();
    };
    if (blogImage) {
      reader2.readAsDataURL(blogImage);
    }
  }
});

// *************** LOGOUT *****************
const logoutBtn = document.querySelector(".logout-link");

console.log("clicked");
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("userToken");
  location.assign("../index.html");
});

// if (writeImage) {
//   reader1.readAsDataURL(writeImage);
// }
// }

// // validate write image
// if (!writeImage) {
//   formErrors.writeImageError = "Please upload an image";
//   hasErrors = true;
// } else if (writeImage.size > maxImgSize) {
//   formErrors.writeImageError = "Image size exceeds 4MB";
//   hasErrors = true;
// } else {
//   formErrors.writeImageError = null;
//   formErrors.writeImageError = "";
// }
