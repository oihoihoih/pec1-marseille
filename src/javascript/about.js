// import { gsap } from "gsap";

function scrollAnimation(selector) {
  let elements = document.querySelectorAll(selector);
  elements = Array.from(elements);
  elements.forEach((element) => {
    addObserver(element);
  });
}

function addObserver(element) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animation");
        observer.unobserve(entry.target);
      }
    });
  });
  observer.observe(element);
}

scrollAnimation(".vintage-divider");

// Code source: https://css-tricks.com/scroll-triggered-animation-vanilla-javascript/
