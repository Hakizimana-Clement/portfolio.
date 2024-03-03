const formEl = document.querySelector(".new-blog-container-form");
let blogs = [];

// check existing saved data
const blogsJSON = localStorage.getItem("blogs");
// if we have blog in localstorage
if (blogsJSON !== null) {
  blogs = JSON.parse(blogsJSON);
}

// errors
let formErrors = {
  titleError: null,
  writerError: null,
  writeImageError: null,
  coverImageError: null,
  bodyTextError: null,
};
// display error on input below
const showFormErrors = (error) => {
  // title
  document.querySelector("#title-error").textContent = error.titleError;

  // writer
  document.querySelector("#writer-error").textContent = error.writerError;

  // writer image
  document.querySelector("#writer-image-error").textContent =
    error.writeImageError;

  // cover image
  document.querySelector("#upload-image-error").textContent =
    error.coverImageError;

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
  const writeImage = e.target.elements.writeImage.files[0];
  const coverImage = e.target.elements.coverImage.files[0];

  // clean body before save in local storage
  const cleanBodyText = body
    .replace(/<\/?p>/g, "")
    .replace(/&amp;nbsp;&nbsp;/g, "")
    .trim();

  // set upload max size
  // 4MB
  const maxImgSize = 4 * 1024 * 1024;

  // validate title
  if (title.length === 0) {
    formErrors.titleError = "Please type bog title";
    hasErrors = true;
  } else if (title.length > 20) {
    formErrors.titleError = "Blog title must be less than 20 character";
    hasErrors = true;
  } else {
    formErrors.titleError = null;
  }
  // validate writer
  if (writer.length === 0) {
    formErrors.writerError = "Please type writer name";
    hasErrors = true;
  } else if (writer.length > 9) {
    formErrors.writerError = "writer name must be less than 9 character";
    hasErrors = true;
  } else {
    formErrors.writerError = null;
  }

  // validate write image
  if (!writeImage) {
    formErrors.writeImageError = "Please upload an image";
    hasErrors = true;
  } else if (writeImage.size > maxImgSize) {
    formErrors.writeImageError = "Image size exceeds 4MB";
    hasErrors = true;
  } else {
    formErrors.writeImageError = null;
    formErrors.writeImageError = "";
  }
  // validate cover image
  if (!coverImage) {
    formErrors.coverImageError = "Please upload an image";
    hasErrors = true;
  } else if (coverImage.size > maxImgSize) {
    formErrors.coverImageError = "Image size exceeds 4MB";
    hasErrors = true;
  } else {
    formErrors.coverImageError = null;
  }

  // validate body text
  if (cleanBodyText.length === 0) {
    formErrors.bodyTextError = "Please type blog paragraphs ";
    hasErrors = true;
  } else if (cleanBodyText.length > 10000) {
    formErrors.bodyTextError =
      "blog paragraphs must be less than 10000 character ";
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
    const reader1 = new FileReader();
    // reader 2 for cover image
    const reader2 = new FileReader();

    reader1.onloadend = function () {
      reader2.onloadend = function () {
        const data = {
          // blog id parts
          id: uuidv4(),
          // blog parts
          title: title,
          writer: writer,
          writerImage: reader1.result,
          coverImage: reader2.result,
          body: cleanBodyText,
          date: new Date().getTime(),
          // comments part
          comments: [],
          like: false,
        };
        blogs.push(data);
        console.log(data);
        localStorage.setItem("blogs", JSON.stringify(blogs));
        formEl.reset();
      };
      if (coverImage) {
        reader2.readAsDataURL(coverImage);
      }
    };
    if (writeImage) {
      reader1.readAsDataURL(writeImage);
    }
  }
});
