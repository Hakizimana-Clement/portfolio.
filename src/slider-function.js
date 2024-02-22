console.log("test");
// with group
// const swiper = new Swiper(".slide-content", {
const swiper = new Swiper(".swipper", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  // centerSlide: true,
  centeredSlides: true,
  fade: true,
  grabCursor: true,
  slidesPerGroupSkip: 1,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },

    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
});
