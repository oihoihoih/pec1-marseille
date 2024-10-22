import { gsap } from "gsap";

import { ScrollToPlugin, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

// SCROLL TO MAIN
const scrollButton = document.querySelector("#scroll-button");
const main = document.querySelector(".main");

scrollButton.addEventListener("click", () => {
  gsap.to(window, {
    duration: 1,
    scrollTo: main,
    ease: "power2"
  });
});

// MARQUEE ANIMATION
const currentScroll = 0;
let isScrollingDown = true;

const tween = gsap
  .to(".marquee__part", {
    xPercent: -100,
    repeat: -1,
    duration: 8,
    ease: "linear"
  })
  .totalProgress(0.5);

gsap.set(".marquee__inner", { xPercent: -50 });

window.addEventListener("scroll", () => {
  if (window.scrollY > currentScroll) {
    isScrollingDown = true;
  } else {
    isScrollingDown = false;
  }

  gsap.to(tween, {
    timeScale: isScrollingDown ? 1 : -1
  });
});

// INDEX CARDS IMAGES
// document.querySelectorAll(".hero__card--item").forEach((item) => {
//   item.addEventListener("mouseover", function () {
//     const imageName = this.getAttribute("data-image");
//     console.log(imageName);
//
//     // Mostrar imagen que coincida el nombre del archivo con imageName
//     const prueba = document.querySelectorAll(".card__figure").forEach((figure) => {
//       const img = figure.childNodes.item(1);
//
//       if (img && img.tagName === "IMG" && img.src.includes(imageName)) {
//         figure.style.display = "block";
//         figure.style.transition = "all 5s";
//         figure.style.opacity = 1;
//         figure.style.transform = "translateX(300px)";
//       }
//     });
//   });
//
//   // To remove image
//   item.addEventListener("mouseout", function () {
//     document.querySelectorAll(".card__figure").forEach((figure) => {
//       figure.style.display = "none";
//     });
//   });
// });

// INDEX ARDS IMAGES WITH GSAP
const listItems = document.querySelectorAll(".hero__card--item");
const t = gsap.fromTo(
  "card__image",
  { immediateRender: false, rotation: -10, scale: 0.3 },
  { rotation: 10, paused: true }
);

listItems.forEach((item) => {
  const image = item.querySelector(".card__image");

  item.addEventListener("mouseenter", () => {
    gsap.to(image, { autoAlpha: 1, xPercent: 100, scale: 1, rotate: 10 });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(image, { autoAlpha: 0, xPercent: 0, scale: 0.3, rotate: 0 });
  });
});
