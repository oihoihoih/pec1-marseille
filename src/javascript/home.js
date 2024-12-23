import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(TextPlugin);

// SCROLL TO MARQUEE
const scrollButton = document.querySelector("#scroll-button");
const marquee = document.querySelector(".marquee");

if (scrollButton) {
  scrollButton.addEventListener("click", () => {
    const offset = 120;

    gsap.to(window, {
      duration: 0.5,
      scrollTo: { y: marquee, offsetY: offset },
      ease: "power2"
    });
  });
}

// MARQUEE ANIMATION
const tween = gsap
  .to(".marquee__part", {
    xPercent: -100,
    repeat: -1,
    duration: 8,
    ease: "linear"
  })
  .totalProgress(0.5);

// INDEX CARDS IMAGES WITH GSAP
const listItems = document.querySelectorAll(".home__card--item");

// Showing images on hover only in big screens
function handleHoverAnimations() {
  listItems.forEach((item) => {
    const image = item.querySelector(".card__image");

    item.removeEventListener("mouseenter", handleMouseEnter);
    item.removeEventListener("mouseleave", handleMouseLeave);

    if (window.innerWidth > 768) {
      item.addEventListener("mouseenter", handleMouseEnter);
      item.addEventListener("mouseleave", handleMouseLeave);
    } else {
      gsap.set(image, { autoAlpha: 0 });
    }

    // On mouse enter
    function handleMouseEnter() {
      gsap.to(image, { autoAlpha: 1, xPercent: 100, scale: 1, rotate: 10, zIndex: 500 });
    }

    // On mouse leave
    function handleMouseLeave() {
      gsap.to(image, { autoAlpha: 0, xPercent: 0, scale: 0.3, rotate: 0 });
    }
  });
}

// Ejecutamos la función al cargar la página
handleHoverAnimations();

// Agregamos un event listener para detectar cambios de tamaño de pantalla
window.addEventListener("resize", handleHoverAnimations);
