const menuIcon = document.querySelector(".menu-bar-icon-test");
const closeMenuBtn = document.querySelector(".hideSidebar");
const sidebar = document.querySelector(".sidebar");
const navLinks = document.querySelectorAll(".mobile-nav___link");

// toggle function
const toggleSidebar = () => {
  sidebar.style.display = sidebar.style.display === "flex" ? "none" : "flex";
};

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.style.display = "none";
  });
});
// mobile icon
menuIcon.addEventListener("click", toggleSidebar);
// close menu
closeMenuBtn.addEventListener("click", toggleSidebar);
