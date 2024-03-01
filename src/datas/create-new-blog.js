console.log(uuidv4());
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
  const id = uuidv4();

  // // Get content from create blog from
  // const bodyContent = e.target.elements.body.value;
  // // remove <p> before save in local storage
  // const cleanBodyContent = bodyContent.replace(/<\/?p>/g, "");
  // console.log(cleanBodyContent);

  // reader 1 for writer image
  const reader1 = new FileReader();
  // reader 2 for cover image
  const reader2 = new FileReader();
  // reader 1 for writer image
  const file1 = e.target.elements.writeImage.files[0];
  // reader 2 for cover image
  const file2 = e.target.elements.coverImage.files[0];

  reader1.onloadend = function () {
    reader2.onloadend = function () {
      const data = {
        // blog id parts
        id: id,
        // blog parts
        title: e.target.elements.title.value,
        writer: e.target.elements.writer.value,
        writerImage: reader1.result,
        coverImage: reader2.result,
        body: e.target.elements.body.value,
        like: false,
        date: new Date().getTime(),
        // comments part
        comments: [],
        // body: cleanBodyContent,
        // comments part
        // commentUsername: "",
        // commentText: "",
        // commentEmail: "",
        // commentid:
      };
      blogs.push(data);
      localStorage.setItem("blogs", JSON.stringify(blogs));
      formEl.reset();
    };
    if (file2) {
      reader2.readAsDataURL(file2);
    }
  };
  if (file1) {
    reader1.readAsDataURL(file1);
  }
});

// reader.onloadend = function () {
//   const data = {
//     title: e.target.elements.title.value,
//     writer: e.target.elements.writer.value,
//     writerImage: reader.result,
//     coverImage: reader.result,
//     body: e.target.elements.body.value,
//   };
//   blogs.push(data);
//   localStorage.setItem("blogs", JSON.stringify(blogs));
//   formEl.reset();
// };

// if (file1) {
//   reader.readAsDataURL(file1);
// }
// if (file2) {
//   reader.readAsDataURL(file2);
// }
