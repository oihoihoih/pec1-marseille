import { gsap } from "gsap";
import { gsap } from "gsap/dist/gsap";
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
      const link = item.getAttribute("data-link");

      // Remove hover animation
      gsap
        .timeline()
        .to(cardText[index], { yPercent: 100, duration: 0.3 })
        .eventCallback("onComplete", () => {
          // Go to link
          if (link) {
            barba.go(link);
            toDetailTransition(index);
            //window.location.href = link;
          }
        });
    });
  });
});

function toDetailTransition(index) {
  const leaveAnimation = (container, index) => {
    const cards = [...container.querySelectorAll(".card-list__content")];
    const getIndex = index;

    console.log(cards, getIndex);

    const tl = gsap.timeline({
      defaults: {
        ease: "expo.inOut",
        duration: 2
      }
    });

    // tl.to();

    return tl;
  };
  const enterAnimation = (container) => {
    console.log(container);
  };

  barba.init({
    transitions: [
      {
        name: "detail-from-itineraries",
        from: {
          namespace: ["itineraries"]
        },
        // to: {
        //   namespace: ["panier"]
        // },
        leave({ current }) {
          return leaveAnimation(current.container, index);
        },
        enter({ next }) {
          // create your amazing enter animation here
          return enterAnimation(next.container);
        }
      }
    ]
  });
}
