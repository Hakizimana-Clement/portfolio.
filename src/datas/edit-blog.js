const titleEl = document.querySelector(".new-blog-container-form__input-title");
const writerEl = document.querySelector(
  ".new-blog-container-form__input-writter"
);
const imageEl = document.querySelector(".new-blog-container-form__input-image");
const contentEl = document.querySelector(
  ".new-blog-container-form__input-textarea"
);

const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
class="toast-icons"><path fill="#3498db" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>`;
const successIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" class="toast-icons"><path fill="#0abf30" d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"/></svg>
         `;
// remove # on id
const blogId = location.hash.substring(1);
// when no blog id in url redirect home page
if (blogId.length === 0) {
  location.assign("index.html");
}
document.addEventListener("DOMContentLoaded", function () {
  tinymce.init({
    selector: "textarea", // Replace 'textarea' with the ID or class of your textarea element
    // Add any other configuration options as needed
  });
});

console.log(blogId);
// ************************** CHECK USER TOKEN **************************

const token = localStorage.getItem("userToken");
if (!token) {
  console.log("Token is missing. Redirecting to home page.");
  location.assign("../signin.html");
} else {
  const decodedPayload = decodedJwt(token);

  if (decodedPayload)
    if (decodedPayload.role !== "admin") {
      console.log("User is not an admin. Redirecting to home page.");
      location.assign("../signin.html");
    }
}

// ************************** LOADER **************************
const loaderContainer = document.querySelector(".loader-container");
const showLoader = () => {
  loaderContainer.style.display = "flex";
};

const hideLoader = () => {
  loaderContainer.style.display = "none";
};

// ************************** UPDATE BLOG **************************
// fetch update
const fetchUpdateBlog = async (updateData) => {
  try {
    showLoader();

    const formData = new FormData();

    // data to send to server
    formData.append("title", updateData.title);
    formData.append("writer", updateData.writer);
    formData.append("blogImage", updateData.blogImage);
    formData.append("content", updateData.content);

    console.log(formData);
    const response = await fetch(
      `http://localhost:4000/api/v1/blogs/${blogId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const json = await response.json();

    // redirect to home back when blog id doesn't exist and id is not equal to url
    if (response.status === 404 || json.blog._id !== blogId) {
      location.assign("../signin.html");
    }

    if (!response.ok) {
      hideLoader();
      location.assign("index.html");
      console.log("blog id not found");
      console.log(json);

      return createToast(error, errorIcon, json.error, json.message);
    }
    // console.log(response.status === 404);

    if (response.ok) {
      console.log(json);
      const blog = json;
      console.log(blog);
      // updatePageContents(blog);
      return createToast(error, successIcon, "Blog update", "successfully");
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

// // fetchUpdateBlog();
// const updateFormEl = document.querySelector(".new-blog-container-form");
// updateFormEl.addEventListener("submit", (e) => {
//   e.preventDefault();

//   console.log("clicked");
//   // console.log(e.target);
//   const content = tinymce.get("textarea").getContent(); // Replace 'textarea' with the ID of your textarea element

//   const title = e.target.elements.title.value.trim();
//   const writer = e.target.elements.writer.value.trim();
//   const blogImage = e.target.elements.blogImage.files[0];
//   // const content = e.target.elements.body.value;
//   // const content = e.target.elements.body.value;

//   const reader2 = new FileReader();

//   reader2.onloadend = async function () {
//     const data = {
//       // blog parts
//       title: title,
//       writer: writer,
//       // writerImage: reader1.result,
//       blogImage: blogImage,
//       content: content,
//     };
//     console.log(data);
//     await fetchUpdateBlog(data);
//     updateFormEl.reset();
//   };
//   if (blogImage) {
//     reader2.readAsDataURL(blogImage);
//   }

//   console.log(title, writer, content);
//   // console.log(reader2);
// });

// const fetchBlogs = async () => {
//   try {
//     showLoader();
//     const response = await fetch(
//       `http://localhost:4000/api/v1/blogs/${blogId}`
//     );
//     const json = await response.json();

//     if (!response.ok) {
//       console.log(json);
//     }

//     if (response.ok) {
//       const blog = json.blog;
//       console.log(blog);
//       // set input to have text from blog api
//       titleEl.value = blog.title;
//       writerEl.value = blog.writer;
//       imageEl.src = blog.writer;
//       // contentEl.value = blog.content;
//       tinymce.get("textarea").setContent(blog.content); // Replace 'textarea' with the ID of your textarea element
//     }
//   } catch (error) {
//     console.log(error);
//   } finally {
//     hideLoader();
//   }
// };
// fetchBlogs();
const updateFormEl = document.querySelector(".new-blog-container-form");
updateFormEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  // element
  const title = e.target.elements.title.value.trim();
  const writer = e.target.elements.writer.value.trim();
  const blogImage = e.target.elements.blogImage.files[0];
  const reader2 = new FileReader();
  // Get the content from the TinyMCE editor
  const content = tinymce.get("textarea").getContent(); // Replace 'textarea' with the ID of your textarea element

  reader2.onloadend = async function () {
    const data = {
      title: title,
      writer: writer,
      blogImage: blogImage,
      content: content,
    };

    await fetchUpdateBlog(data);
    updateFormEl.reset();
  };

  if (blogImage) {
    reader2.readAsDataURL(blogImage);
  }
});

const fetchBlogs = async () => {
  try {
    showLoader();
    const response = await fetch(
      `http://localhost:4000/api/v1/blogs/${blogId}`
    );
    const json = await response.json();

    if (!response.ok) {
      console.log(json);
    }

    if (response.ok) {
      const blog = json.blog;

      titleEl.value = blog.title;
      writerEl.value = blog.writer;
      imageEl.src = blog.writer;
      contentEl.value = blog.content;

      // tinymce.activeEditor.setContent(blog.content);

      // tinymce.init({
      //   selector: "textarea",
      //   setup: function (editor) {
      //     editor.on("init", function (e) {
      //       editor.setContent(blog.content);
      //     });
      //   },
      // });
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};
fetchBlogs();
