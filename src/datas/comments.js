console.log("test");
const comments = [
  {
    blogTitle: "Did you know",
    name: "Karimu",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Tempora rem quibusdam sed aut.",
    liked: false,
  },
  {
    blogTitle: "Did you know",
    name: "Mike",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Tempora rem quibusdam sed aut.",
    liked: false,
  },

  {
    blogTitle: "Did you know",
    name: "Somi",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Tempora rem quibusdam sed aut.",
    liked: false,
  },
];

// filters

const filters = {
  searchText: "",
  like: false,
};
// render comment function
const renderComments = (comments, filters) => {
  const filteredComment = comments.filter((comment) => {
    // return comment.name.toLowerCase().;
  });
};
