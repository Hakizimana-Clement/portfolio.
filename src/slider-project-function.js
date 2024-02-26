const projectTitle = document.querySelector(
  ".projects-container__tex-subtitle"
);

const projectImg = document.querySelector(".projects-container__image-img");
const projectParagraphs = document.querySelector(
  ".projects-container__tex-description"
);

// project 1
const project1 = document.querySelector(".project-1");
project1.addEventListener("click", () => {
  console.log("clicked");
  projectTitle.textContent = "Simon Game";

  projectImg.src = "../images/project-1.svg";
  projectParagraphs.textContent =
    "  Lorem ipsum dolor sit amet consectetur adipisicing eli  Lorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elittLorem ipsum dolor sit amet consectetur adipisicing elit... ";
});

// project 2
const project2 = document.querySelector(".project-2");
project2.addEventListener("click", () => {
  console.log("clicked");
  projectTitle.textContent = "Music App ";
  projectImg.src =
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  projectParagraphs.textContent =
    "  Lorem ipsum dolor sit amet consectetur adipisicing eli  Lorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elittLorem ipsum dolor sit amet consectetur adipisicing elit... ";
  // button
  document.querySelector(".no-yet-next").style.background = "#5161f1";
  // text
  // one buton
  document.querySelector(".one-num").style.color = "#fff";
  document.querySelector(".one-num-btn").style.background = "#fff";

  document.querySelector(".two-num").style.color = "#5161f1";
});

// project 3
const project3 = document.querySelector(".project-3");
project3.addEventListener("click", () => {
  console.log("clicked project 3");
  projectTitle.textContent = "Book keep app";
  projectImg.src =
    "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  projectParagraphs.textContent =
    " Lorem ipsum dolor sit amet consectetur adipisicing eli  Lorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem iadipisicing elittLorem ipsum dolor sit amet consectetur adipisicing elit... ";
});

// project 4
const project4 = document.querySelector(".project-4");
project4.addEventListener("click", () => {
  console.log("clicked project 4");
  projectTitle.textContent = "Snake game";
  projectImg.src =
    "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  projectParagraphs.textContent =
    " This snake Lorem ipsum dolor sit amet consectetur adipisicing eli  Lorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem iadipisicing elittLorem ipsum dolor sit amet consectetur adipisicing elit... ";
});
