// tinymce.init({
//   selector: "textarea",
//   skin: "oxide-dark",
//   content_css: "dark",
//   setup: function (editor) {
//     editor.on("init", function (e) {
//       editor.getContent({ format: "text" });
//     });
//   },
//   toolbar:
//     " bold italic underline strikethrough |  align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
//   menubar: false,
// });
// tinymce.init({
//   selector: "textarea",
//   skin: "oxide-dark",
//   content_css: "dark",
//   plugins:
//     "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker markdown",
//   oolbar:
//     " bold italic underline strikethrough |  align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
//   menubar: false,
// });
tinymce.init({
  selector: "textarea",
  plugins:
    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
  toolbar:
    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
  tinycomments_mode: "embedded",
  tinycomments_author: "Author name",
  mergetags_list: [
    { value: "First.Name", title: "First Name" },
    { value: "Email", title: "Email" },
  ],
  ai_request: (request, respondWith) =>
    respondWith.string(() =>
      Promise.reject("See docs to implement AI Assistant")
    ),
});
