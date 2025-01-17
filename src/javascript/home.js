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

// Para cargar el vídeo correcto según el tamaño de la pantalla

document.addEventListener("DOMContentLoaded", () => {
  const screenWidth = window.innerWidth;
  const video = document.getElementById("responsive-video");
  const sourceWebm = document.getElementById("video-source-webm");
  const sourceMp4 = document.getElementById("video-source-mp4");

  let videoWebm = "";
  let videoMp4 = "";

  if (screenWidth <= 478) {
    // Dispositivos móviles
    videoWebm = new URL("../assets/marseille-intro_430px.webm", import.meta.url).toString();
    videoMp4 = new URL("../assets/marseille-intro_430px.mp4", import.meta.url).toString();
  } else if (screenWidth <= 1024) {
    // Tablets
    videoWebm = new URL("../assets/marseille-intro_1024px.webm", import.meta.url).toString();
    videoMp4 = new URL("../assets/marseille-intro_1024px.mp4", import.meta.url).toString();
  } else {
    // Escritorio
    videoWebm = new URL("../assets/marseille_intro.webm", import.meta.url).toString();
    videoMp4 = new URL("../assets/marseille_intro.mp4", import.meta.url).toString();
  }

  sourceWebm.src = videoWebm;
  sourceMp4.src = videoMp4;

  video.load();
});
