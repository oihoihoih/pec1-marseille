import { gsap } from "gsap";
import barba from "@barba/core";

// ITINERARIES CARD ENTER ANIMATION
gsap.fromTo(
  ".card-list__content",
  {
    opacity: 0,
    yPercent: 50
  },
  {
    opacity: 1,
    yPercent: 0,
    duration: 0.4,
    ease: "power2",
    stagger: 0.1
  }
);

// ITINERARIES ANIMATIONS
const card = document.querySelectorAll(".card-list__content");
const cardText = document.querySelectorAll(".card-list__content--text");

card.forEach((item, index) => {
  item.addEventListener("mouseenter", () => {
    gsap.fromTo(
      cardText[index],
      {
        opacity: 1,
        yPercent: 100
      },
      {
        opacity: 1,
        yPercent: 0,
        duration: 0.3,
        ease: "circ.inOut"
      }
    );

    item.addEventListener("mouseleave", () => {
      gsap.to(cardText[index], {
        yPercent: 100,
        duration: 0.3
      });
    });
  });
});
