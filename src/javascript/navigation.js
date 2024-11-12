const barba = require("@barba/core");
const barbaCss = require("@barba/css");
// import barba from "@barba/core";
// import { gsap } from "gsap/dist/gsap";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

document.addEventListener("DOMContentLoaded", (event) => {
  // gsap.registerPlugin(ScrollTrigger);
  const toggleButton = document.querySelector(".burger");
  let isOpen = false;
  const timeline = gsap.timeline({ paused: true });

  gsap.set(".nav__overlay--menu-item p", { y: 225 });

  timeline
    .to(".nav__overlay", {
      duration: 1.5,
      opacity: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power4.inOut"
    })
    .to(
      ".nav__overlay--menu-item p",
      {
        duration: 1.3,
        y: 0,
        stagger: 0.2,
        ease: "power4.inOut"
      },
      "-=1"
    );

  toggleButton.addEventListener("click", () => {
    if (isOpen) {
      timeline.reverse();
      toggleButton.setAttribute("aria-expanded", "false");
    } else {
      timeline.play();
      toggleButton.setAttribute("aria-expanded", "true");
    }

    isOpen = !isOpen;
  });

  barba.init({
    sync: true,
    // debug: true,
    transitions: [
      {
        beforeLeave() {
          console.log("beforeLeave");
          toggleButton.classList.remove("active");
          if (isOpen) {
            timeline.reverse();
            isOpen = false;
          }
        },
        async leave(data) {
          const done = this.async();
          timeline.reverse();
          await delay(1000);
          done();
        },

        async enter(data) {
          gsap.from(data.next.container, {
            duration: 0.5,
            opacity: 0,
            ease: "power2.inOut"
          });
        },

        async afterEnter(data) {
          console.log("afterEnter", data);
          if (data.next.namespace === "itineraries") {
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
          }
        }
      }
    ]
  });
});

function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}
