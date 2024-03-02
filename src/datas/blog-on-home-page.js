// html elements
// const blogMainContainer = document.querySelector(".testing-blog-home");
const blogMainContainer = document.querySelector(".gallery");

// blogs and localstorage
let blogs = [];

const blogJSON = localStorage.getItem("blogs");
if (blogJSON !== null) {
  blogs = JSON.parse(blogJSON);
} else {
  document.querySelector(".gallery").style.justifyContent = "center";
  document.querySelector(".gallery-wrapper").style.marginTop = "4rem";
  blogMainContainer.innerHTML = `<p>No Blogs</p>`;
}

// render blog function
const renderBlogs = (blogsArr) => {
  blogsArr.forEach((blog) => {
    // blog card container
    const blogContainer = document.createElement("div");
    blogContainer.classList.add("card-container");
    // blog link container
    const linkContainer = document.createElement("a");
    linkContainer.setAttribute(
      "href",
      `../../single-blog-page.html#${blog.id}`
    );
    linkContainer.classList.add("card-blog-link");

    // card
    // link container -> card
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    linkContainer.append(cardDiv);
    // *********************** image ********************************
    //  card image content
    // card image content -> card
    const cardImgDiv = document.createElement("div");
    cardImgDiv.classList.add("image-content");
    cardDiv.append(cardImgDiv);

    //  card image
    // card image -> card image content
    const oneImgDiv = document.createElement("div");
    oneImgDiv.classList.add("card-image");
    cardImgDiv.append(oneImgDiv);

    // finale image
    const imgEl = document.createElement("img");
    imgEl.src = blog.coverImage;
    imgEl.classList.add("card-img");
    oneImgDiv.append(imgEl);
    // *******************************************************
    // ******************* text content in card *****************************

    // card content
    // card image -> card content (card content (text only))
    const cardContentDiv = document.createElement("div");
    cardContentDiv.classList.add("card-content");
    cardDiv.append(cardContentDiv);

    // h2
    const h2El = document.createElement("h2");
    h2El.textContent = blog.title;
    // h2El.classList.add("name");
    h2El.classList.add("blogs-container__card-title");
    cardContentDiv.append(h2El);

    ///////////////////////////////////////////// paragraph //////////////////////////////////////
    // const pEl = document.createElement("p");
    // // console.log(blog.body);
    // const content = blog.body;
    // // const cleanContent = content.replace(/<\/?p>/g, "").slice(2, 65);
    // // // pEl.textContent = `${blog.body.slice(3, 65)}...`;
    // // pEl.textContent = `${cleanContent}...`;
    // // Remove <p> and </p> tags and HTML entity codes
    // const cleanContent = content
    //   .replace(/<\/?p>/g, "")
    //   .replace(/&amp;nbsp;/g, "")
    //   .trim();

    // // Truncate the text if it's too long
    // const truncatedContent =
    //   cleanContent.slice(0, 63) + (cleanContent.length > 63 ? "..." : "");
    // pEl.textContent = truncatedContent;

    // // error
    // pEl.classList.add("blogs-container__card-description", "description");
    // cardContentDiv.append(pEl);
    // Assume blog.body contains the text content from local storage
    const content = blog.body;

    // Remove <p> and </p> tags and HTML entity codes
    const cleanContent = content
      .replace(/<\/?p>/g, "")
      .replace(/&amp;nbsp;/g, "")
      .trim();

    // Truncate the text if it's too long
    const truncatedContent =
      cleanContent.slice(0, 63) + (cleanContent.length > 63 ? "..." : "");

    // Create a paragraph element and set its text content
    const pEl = document.createElement("p");
    pEl.textContent = truncatedContent;

    // Add classes to the paragraph element
    pEl.classList.add("blogs-container__card-description", "description");

    // Append the paragraph element to the container
    cardContentDiv.append(pEl);

    // comment and likes
    // comment and like -> card content
    const commentAndLikeContainer = document.createElement("div");
    commentAndLikeContainer.classList.add(
      "blogs-container__card-likes-and-comments-container"
    );
    console.log(blog);
    // ////// WRITE CONTAINER///////
    // writer image, name and date container -> writer container
    const writeContainer = document.createElement("div");
    writeContainer.classList.add(
      "blogs-container__card-likes-and-comments-container--writer"
    );
    commentAndLikeContainer.append(writeContainer);

    cardContentDiv.append(commentAndLikeContainer);
    // write image
    const writeImg = document.createElement("img");
    writeImg.src = blog.writerImage;
    writeImg.classList.add("writer", "writer-image");
    writeContainer.append(writeImg);

    // write name
    const writeName = document.createElement("span");
    writeName.textContent = blog.writer;
    writeName.classList.add("writer", "writer-name");
    writeContainer.append(writeName);

    // full stop
    const writeFullStop = document.createElement("span");
    writeFullStop.textContent = "|";
    writeFullStop.classList.add("writer", "writer-full-stop");
    writeContainer.append(writeFullStop);

    // date
    const writeDate = document.createElement("span");
    // writeDate.textContent = blog.date;
    // console.log(blog.date !== 0){};
    if (blog.date !== 0) {
      writeDate.textContent = blog.date;
    } else {
      writeDate.textContent = "unkown";
    }
    writeDate.classList.add("writer", "writer-date");
    writeContainer.append(writeDate);

    ////////////////////////////////////////
    // ////// COMMENT AND LIKE CONTAINER///////
    const commentAndLikeDiv = document.createElement("div");
    commentAndLikeDiv.classList.add("like-and-comment-container");
    commentAndLikeContainer.append(commentAndLikeDiv);
    // like div
    const likeDiv = document.createElement("div");
    commentAndLikeDiv.append(likeDiv);
    likeDiv.classList.add(
      "blogs-container__card-likes-and-comments-container--comments-likes"
    );

    // like icon
    const likeIcon = document.createElement("span");
    likeIcon.innerHTML = `<svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                          likeDiv.append(likeIcon);
                        </svg>`;

    likeIcon.classList.add("icon-sizes");

    likeDiv.append(likeIcon);
    // like number
    const likeNum = document.createElement("span");
    // dynamic
    // likeNum.textContent = blog.like.length
    // hard coded
    likeNum.textContent = 250;
    likeDiv.append(likeNum);
    ////////////////////////////////////////

    // comment div
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comments");
    commentAndLikeDiv.append(commentDiv);

    // comment icon
    const commentIcon = document.createElement("span");
    commentIcon.innerHTML = `    <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                          />
                        </svg>`;
    commentIcon.classList.add("icon-sizes");
    commentDiv.append(commentIcon);
    // comment num
    const commentNum = document.createElement("span");
    commentNum.textContent = 67;
    commentNum.classList.add("comment-number");
    commentDiv.append(commentNum);

    // console.log(blog);
    // renders
    // card container -> start card
    blogContainer.append(linkContainer);
    // blog main container -> card container
    blogMainContainer.append(blogContainer);
  });
};

renderBlogs(blogs);
