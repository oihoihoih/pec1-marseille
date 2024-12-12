import { gsap } from "gsap";
// import { gsap } from "gsap/dist/gsap";

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
        // TODO: Verificar cómo es cardText[index] y si necesito [index]
        .to(cardText[index], { yPercent: 100, duration: 0.3 })
        .eventCallback("onComplete", () => {
          barba.go(link);
        });
    });
  });
});

// barba.init({
//   // debug: true,
//   transitions: [
//     {
//       name: "from-itineraries-to-detail",
//       from: {
//         namespace: "itineraries"
//       },
//       once({ next }) {
//         console.log("onceonceonce", next);
//         return pruebaOnce(next.container);
//       },
//       leave({ current }) {
//         console.log("leaveleaveleave");
//         return leavePrueba(current.container);
//       },
//       enter({ next }) {
//         console.log("enterenterenter");
//         return pruebaOnce(next.container);
//       }
//     }
//   ]
// });
// Leave animation
// const leaveAnimation = (container) => {
//   console.log("leave animation", container);
//   // Elements to hide
//   const cards = [...container.querySelectorAll(".card-list__content")];
//   const header = container.querySelector(".header");
//   const sectionDivider = container.querySelector(".section-divider");
//
//   const tl = gsap.timeline({
//     defaults: {
//       ease: "expo.inOut",
//       duration: 1
//     }
//   });
//
//   tl.to(cards, {
//     yPercent: 50,
//     autoAlpha: 0,
//     stagger: 0.1
//   }).to(
//     [header, sectionDivider],
//     {
//       autoAlpha: 0,
//       duration: 1
//     },
//     0
//   );
//
//   return tl;
// };

// Enter animation
// const enterAnimation = (container) => {
//   console.log("enter animation", container);
//   const header = container.querySelector(".hero-detail__wrapper");
//   const title = container.querySelector(".hero-detail__title");
//   const divider = container.querySelector(".section__divider");
//   const itinerary = container.querySelector(".itinerary__wrapper");
//
//   window.scrollTo(0, 0);
//
//   const tl = gsap.timeline({
//     defaults: {
//       ease: "expo.inOut",
//       duration: 2
//     }
//   });
//
//   tl.to(header, {
//     opacity: 1
//   });
//
//   return tl;
// };
