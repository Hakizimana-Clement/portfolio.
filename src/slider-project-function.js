const projectTitle = document.querySelector(
  ".projects-container__tex-subtitle"
);
const projectImg = document.querySelector(".projects-container__image-img");
const projectParagraphs = document.querySelector(
  ".projects-container__tex-description"
);

// const allProjectBtn = document.querySelectorAll(
//   ".projects-container__text-next-btn-container"
// );

// project 1
const project1 = document.querySelector(".project-1");
project1.addEventListener("click", () => {
  console.log("clicked");
  projectTitle.textContent = "Simon Game";

  projectImg.src = "../images/project-1.svg";
  projectParagraphs.textContent =
    "  Lorem ipsum dolor sit amet consectetur adipisicing eli  Lorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elittLorem ipsum dolor sit amet consectetur adipisicing elit... ";

  // one buton
  document.querySelector(".one-num").style.color = "#fff";
  document.querySelector(".one-num-btn").style.backgroundColor = "#fff";
  document.querySelector(".two-num").style.color = "#5161f1";
  });

// project 2
const project2 = document.querySelector(".project-2");
project2.addEventListener("click", () => {
  console.log("clicked");
  projectTitle.textContent = "Dj App ";
  // projectImg.src = "../images/project-3-music-app.jpg";
  projectImg.src = "../images/project-1.svg";
  projectParagraphs.textContent =
    "  Lorem ipsum dolor sit amet consectetur adipisicing eli  Lorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elittLorem ipsum dolor sit amet consectetur adipisicing elit... ";
  // button
  document.querySelector(".no-yet-next").style.background = "#5161f1";
  // text
  // one buton
  document.querySelector(".one-num").style.color = "#fff";
  document.querySelector(".one-num-btn").style.backgroundColor = "#fff";
  document.querySelector(".two-num").style.color = "#5161f1";
});

// project 3
const project3 = document.querySelector(".project-3");
project3.addEventListener("click", () => {
  console.log("clicked project 3");
  projectTitle.textContent = "Book keep app";
  projectImg.src = "../images/project-2-book-app.jpg";
  projectParagraphs.textContent =
    " Lorem ipsum dolor sit amet consectetur adipisicing eli  Lorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem iadipisicing elittLorem ipsum dolor sit amet consectetur adipisicing elit... ";
});

// project 4
const project4 = document.querySelector(".project-4");
project4.addEventListener("click", () => {
  console.log("clicked project 4");
  projectTitle.textContent = "Snake game";

  projectImg.src = "../images/project-4.-snake-game.jpg";
  projectParagraphs.textContent =
    " This snake Lorem ipsum dolor sit amet consectetur adipisicing eli  Lorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem iadipisicing elittLorem ipsum dolor sit amet consectetur adipisicing elit... ";
});
