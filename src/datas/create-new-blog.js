console.log("working");
let blogs = [];

// check existing saved data
const blogsJSON = localStorage.getItem("blogs");
// if we have blog in localstorage
if (blogsJSON !== null) {
  blogs = JSON.parse(blogsJSON);
}
const formEl = document.querySelector(".new-blog-container-form");
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const reader = new FileReader();
  const file = e.target.elements.image.files[0];

  reader.onloadend = function () {
    const data = {
      title: e.target.elements.title.value,
      writer: e.target.elements.writer.value,
      image: reader.result,
      body: e.target.elements.body.value,
    };
    blogs.push(data);
    localStorage.setItem("blogs", JSON.stringify(blogs));
    formEl.reset();
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});
