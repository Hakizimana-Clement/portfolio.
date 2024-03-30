// html elements
const blogMainContainer = document.querySelector(".gallery");
const loaderContainer = document.querySelector(".loader-container");
const showLoader = () => {
  loaderContainer.style.display = "flex";
};

const hideLoader = () => {
  loaderContainer.style.display = "none";
};

const fetchBlogs = async () => {
  try {
    showLoader();
    const response = await fetch("http://localhost:4000/api/v1/blogs/");
    const json = await response.json();

    if (!response.ok) {
      console.log(json);
      document.querySelector(".gallery").style.justifyContent = "center";
      document.querySelector(".gallery-wrapper").style.marginTop = "4rem";
      blogMainContainer.innerHTML = `<p>No Blogs</p>`;
    }

    if (response.ok) {
      const allBlogs = json.blogs;
      console.log(allBlogs);
      renderBlogs(allBlogs);
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

fetchBlogs();

// render blog function
const renderBlogs = (blogsArr) => {
  blogsArr.forEach((blog) => {
    // blog card container
    const blogContainer = document.createElement("div");
    blogContainer.classList.add("card-container");
    // blog link container
    // This is blocked link
    //`../../single-blog-page.html#${blog.id}`
    const linkContainer = document.createElement("a");
    linkContainer.setAttribute("href", `single-blog-page.html#${blog._id}`);
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
    imgEl.src = blog.blogImage;
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
    h2El.textContent =
      blog.title.length > 24 ? `${blog.title.slice(0, 24)} ...` : blog.title;
    // blog.title;
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
    const content = blog.content;

    // Remove <p> and </p> tags and HTML entity codes
    const cleanContent = content;

    // .replace(/<\/?p>/g, "")
    //   .replace(/&amp;nbsp;/g, "")
    //   .trim();

    // Truncate the text if it's too long
    // const truncatedContent = cleanContent;
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
    // console.log(blog);
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

    if (writeImg.src.length === 0) {
      // default image when user don't use his / her image
      writeImg.src = `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="white" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.985 7.985 0 0 1 12 20a7.985 7.985 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984"/></g></svg>`;
    } else {
      // writer image
      writeImg.src = blog.writerImage;
    }
    writeImg.classList.add("writer", "writer-image");
    writeContainer.append(writeImg);

    // write name
    const writeName = document.createElement("span");
    // writeName.textContent = blog.writer;
    writeName.textContent = blog.writer.split(" ")[0];
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
      writeDate.textContent = blog.createdAt;
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
    // check icon when its has liked or not
    let fillLikeColor = "none";
    if (blog.likes.length > 0) {
      fillLikeColor = "#ff0000";
    }
    // like icon
    const likeIcon = document.createElement("span");
    likeIcon.innerHTML = `<svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill= "${fillLikeColor}";
                          stroke="white"
                          viewBox="0 0 24 24"
                          stroke-width="1"
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
    likeNum.textContent = blog.likes.length;
    likeDiv.append(likeNum);
    ////////////////////////////////////////

    // comment div
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comments");
    commentAndLikeDiv.append(commentDiv);

    // comment icon

    // check icon when its has liked or not
    let fillCommentColor = "none";
    if (blog.likes.length > 0) {
      fillCommentColor = "#28396d";
    }
    const commentIcon = document.createElement("span");
    commentIcon.innerHTML = `    <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="${fillCommentColor}"
                          stroke="white"
                          viewBox="0 0 24 24"
                          stroke-width="1"
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
    commentNum.textContent = blog.comments.length;
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

// renderBlogs(blogs);
