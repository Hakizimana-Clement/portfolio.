console.log("working");
const dropdownContainer = document.querySelector(".dropdown-main-container");
const showDropDownMenu = document.querySelector(".dropdown");

// open menu setting
dropdownContainer.addEventListener("mouseover", () => {
  console.log("working");
  showDropDownMenu.style.display = "block";
  showDropDownMenu.addEventListener("mouseover", () => {
    showDropDownMenu.style.display = "block";
  });
});

// // close menu setting
// dropdownContainer.addEventListener("mouseout", () => {
//   console.log("working");
//   showDropDownMenu.style.display = "none";
// });

showDropDownMenu.addEventListener("mouseout", () => {
  showDropDownMenu.style.display = "none";
});
