const formEl = document.querySelector(".new-blog-container-form");
const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
class="toast-icons"><path fill="#3498db" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>`;

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

const fetchCreateBlog = async (blogData) => {
  try {
    // const formData = new FormData();
    // formData.append("title", blogData.title);
    // formData.append("writer", blogData.writer);
    // formData.append("content", blogData.content);

    // formData.append("blogImage", blogData.blogImage);

    // console.log(formData);
    const formData = new FormData();

    // Append string data to the form data object
    formData.append("title", blogData.title);
    formData.append("writer", blogData.writer);
    formData.append("content", blogData.content);

    // Append file data to the form data object
    formData.append("blogImage", blogData.blogImage);
    const response = await fetch("http://localhost:4000/api/v1/blogs", {
      method: "POST",
      headers: {
        // "Content-Type":
        //   "multipart/form-data,boundary=---------------------------974767299852498929531610575",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      // body: JSON.stringify(blogData),
    });

    const json = await json();

    if (!response.ok) {
      console.log("error ", json);
      return createToast(error, errorIcon, json.message, json.error);
    }
    if (response.ok) {
      return createToast(error, errorIcon, json.message, json.error);
    }
  } catch (error) {
    console.log(error);
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
  const body = e.target.elements.body.value.trim();
  // const writeImage = e.target.elements.writeImage.files[0];
  const blogImage = e.target.elements.coverImage.files[0];

  // clean body before save in local storage
  const cleanBodyText = body
    .replace(/<\/?p>/g, "")
    .replace(/&amp;nbsp;&nbsp;&rsquo;/g, "")
    .trim();

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
    console.log("pass");
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
  // if (writeImage) {
  //   reader1.readAsDataURL(writeImage);
  // }
  // }
});

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
