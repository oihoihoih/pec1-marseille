import { gsap } from "gsap";
import { gsap } from "gsap/dist/gsap";

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
function start() {
  // Función vacía para probar si se ejecuta correctamente
  // console.log("prueba función");
}

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

// LINKS TO DETAIL PAGE

document.querySelectorAll(".card-list__content").forEach((cardItem) => {
  cardItem.addEventListener("click", (event) => {
    event.preventDefault();
    const link = cardItem.getAttribute("data-link");

    if (link) {
      window.location.href = link;
    }
  });
});
