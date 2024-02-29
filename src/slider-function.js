let scrollContainer = document.querySelector(".gallery");
let backBtn = document.querySelector("#backBtn");
let nextBtn = document.querySelector("#nextBtn");

scrollContainer.addEventListener("wheel", (e) => {
  e.preventDefault();
  scrollContainer.scrollLeft += e.deltaY;
  scrollContainer.style.scrollBehavior = "auto";
});

nextBtn.addEventListener("click", () => {
  scrollContainer.style.scrollBehavior = "smooth";
  scrollContainer.scrollLeft += scrollContainer.offsetWidth; // Change scroll distance to width of one card container
});
backBtn.addEventListener("click", () => {
  scrollContainer.style.scrollBehavior = "smooth";
  scrollContainer.scrollLeft -= scrollContainer.offsetWidth; // Change scroll distance to width of one card container
});
// document.addEventListener("DOMContentLoaded", function () {
//   // Initialize Swiper
//   var swiper = new Swiper(".blogs-container__cards", {
//     // Optional parameters
//     slidesPerView: "auto",
//     spaceBetween: 30,
//     loop: true,
//     // Navigation arrows
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//   });
// });

// console.log("test");
// // with group and it's work sometime
// // // const swiper = new Swiper(".slide-content", {
// // const swiper = new Swiper(".swipper", {
// //   slidesPerView: 3,
// //   spaceBetween: 25,
// //   loop: true,
// //   // centerSlide: true,
// //   centeredSlides: true,
// //   fade: true,
// //   grabCursor: true,
// //   slidesPerGroupSkip: 1,
// //   grabCursor: true,
// //   pagination: {
// //     el: ".swiper-pagination",
// //     clickable: true,
// //     dynamicBullets: true,
// //   },
// //   breakpoints: {
// //     0: {
// //       slidesPerView: 1,
// //     },

// //     520: {
// //       slidesPerView: 2,
// //     },
// //     950: {
// //       slidesPerView: 3,
// //     },
// //   },
// // });
