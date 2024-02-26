console.log("working");
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  centeredSlides: false,
  slidesPerGroupSkip: 1,
  grabCursor: true,
  keyboard: {
    enabled: true,
  },
  breakpoints: {
    769: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// var swiper = new Swiper(".slide-content", {
//   // var swiper = new Swiper(".mySwiper", {
//   slidesPerView: 1,
//   centeredSlides: false,
//   slidesPerGroupSkip: 1,
//   grabCursor: true,
//   keyboard: {
//     enabled: true,
//   },
//   breakpoints: {
//     769: {
//       slidesPerView: 2,
//       slidesPerGroup: 2,
//     },
//   },
//   scrollbar: {
//     el: ".swiper-scrollbar",
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
// });

// // with group
// // const swiper = new Swiper(".swipper", {
// const swiper = new Swiper(".slide-content", {
//   slidesPerView: 3,
//   spaceBetween: 25,
//   loop: true,
//   // centerSlide: true,
//   centeredSlides: true,
//   fade: true,
//   grabCursor: true,
//   slidesPerGroupSkip: 1,
//   grabCursor: true,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//     dynamicBullets: true,
//   },
//   breakpoints: {
//     0: {
//       slidesPerView: 1,
//     },

//     520: {
//       slidesPerView: 2,
//     },
//     950: {
//       slidesPerView: 3,
//     },
//   },
// });
