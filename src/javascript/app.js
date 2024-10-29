import { gsap } from "gsap";
import barba from "@barba/core";

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

// INDEX CARDS IMAGES WITH GSAP
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
