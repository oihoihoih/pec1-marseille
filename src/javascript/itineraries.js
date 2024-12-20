import { gsap } from "gsap";
const barba = require("@barba/core");

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

    // LINKS TO DETAIL PAGE
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const link = item.getAttribute("href");

      // Remove hover animation
      gsap
        .timeline()
        .to(cardText[index], { yPercent: 100, duration: 0.3 })
        .eventCallback("onComplete", () => {
          setTimeout(() => {
            barba.go(link);
          }, 800);
        });
    });
  });
});
