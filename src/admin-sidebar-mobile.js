const sidebarMenuBtn = document.querySelector(".menu");
const sidebarContainer = document.querySelector(".mobile-sidebar-container");

sidebarMenuBtn.addEventListener("click", () => {
  console.log("clicked");
  sidebarContainer.classList.toggle("showSidebar");
});
