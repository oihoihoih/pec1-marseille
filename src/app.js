import { gsap } from "gsap";

import { ScrollToPlugin, ScrollTrigger, TextPlugin } from "gsap/all";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

// SCROLL TO MAIN
const scrollButton = document.querySelector("#scroll-button");
const main = document.querySelector(".main");
if (scrollButton) {
  scrollButton.addEventListener("click", () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: main,
      ease: "power2"
    });
  });
}

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

// INDEX ARDS IMAGES WITH GSAP
const listItems = document.querySelectorAll(".hero__card--item");

listItems.forEach((item) => {
  const image = item.querySelector(".card__image");

  item.addEventListener("mouseenter", () => {
    gsap.to(image, { autoAlpha: 1, xPercent: 100, scale: 1, rotate: 10 });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(image, { autoAlpha: 0, xPercent: 0, scale: 0.3, rotate: 0 });
  });
});

// ITINERARIES ANIMATIONS
gsap
  .timeline()
  .from(".prueba", { xPercent: -100, duration: 0.3 })
  .from(".section__text", { xPercent: -100, duration: 0.3 }, "-=.15");

// Hover in itineraries cards
const cardFront = document.querySelectorAll(".card-list__front");
const cardBack = document.querySelectorAll(".card-list__back");
const cardImage = document.querySelectorAll(".card-list__front--img");
const container = document.querySelector(".card-list__container");
let cardTl;

cardImage.forEach((image, index) => {
  image.addEventListener("mouseenter", () => {
    cardTl = gsap
      .timeline()
      .to(cardFront[index], { display: "none", duration: 0.3 })
      .fromTo(
        cardBack[index],
        { display: "none", yPercent: -100, opacity: 1 },
        { display: "flex", yPercent: 0, opacity: 1 }
      );
  });
});
