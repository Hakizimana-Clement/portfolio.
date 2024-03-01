tinymce.init({
  selector: "textarea",
  skin: "oxide-dark",
  content_css: "dark",
  setup: function (editor) {
    editor.on("init", function (e) {
      editor.getContent({ format: "text" });
    });
  },
  toolbar:
    " bold italic underline strikethrough |  align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
  menubar: false,
});
