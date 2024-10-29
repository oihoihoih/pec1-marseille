import { gsap } from "gsap";
import barba from "@barba/core";

const toggleButton = document.querySelector(".burguer");
const menuItems = document.querySelectorAll(".nav__overlay--menu-item");
let isOpen = false;

gsap.set(".nav__overlay--menu-item p", { y: 225 });

const timeline = gsap.timeline({ paused: true });

timeline.to(".nav__overlay", {
  duration: 1.5,
  opacity: 1,
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  ease: "power4.inOut"
});

timeline.to(
  ".nav__overlay--menu-item p",
  {
    duration: 1.5,
    y: 0,
    stagger: 0.2,
    ease: "power4.inOut"
  },
  "-=1"
);

toggleButton.addEventListener("click", () => {
  if (isOpen) {
    timeline.reverse();
  } else {
    timeline.play();
  }

  isOpen = !isOpen;
});

menuItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    const url = event.target.attributes.href.value;
    timeline.reverse();

    // TODO: No capta bien al hacer click en la raya naranja
    //
    window.location.href = url;
  });
});
