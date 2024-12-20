// const barba = require("@barba/core");
// import { enterAnimationToDetail, leaveAnimationToDetail, fadeEnterAnimation } from "./animations";
//
// const toggleButton = document.querySelector(".burger");
// let isOpen = false;
// const timeline = gsap.timeline({ paused: true });
//
// document.addEventListener("DOMContentLoaded", (event) => {
//   gsap.set(".nav__overlay--menu-item a", { y: 225 });
//
//   timeline
//     .to(".nav__overlay", {
//       duration: 1.5,
//       opacity: 1,
//       clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//       ease: "power4.inOut"
//     })
//     .to(
//       ".nav__overlay--menu-item a",
//       {
//         duration: 1.3,
//         y: 0,
//         stagger: 0.2,
//         ease: "power4.inOut"
//       },
//       "-=1"
//     );
//
//   toggleButton.addEventListener("click", () => {
//     if (isOpen) {
//       timeline.reverse();
//       toggleButton.setAttribute("aria-expanded", "false");
//     } else {
//       timeline.play();
//       toggleButton.setAttribute("aria-expanded", "true");
//     }
//
//     isOpen = !isOpen;
//   });
// });
//
// barba.init({
//   debug: true,
//   sync: true,
//   // prevent: ({ href }) => {
//   //   return true;
//   // },
//   transitions: [
//     {
//       name: "from-itineraries-to-detail",
//       to: {
//         namespace: ["panier", "corniche", "vieux-port"]
//       },
//       once({ next }) {
//         console.log("from itinerarires once");
//         return enterAnimationToDetail(next.container);
//       },
//       leave({ current }) {
//         console.log("from itinerarires leave");
//
//         return leaveAnimationToDetail(current.container);
//       },
//       enter({ next }) {
//         console.log("from itinerarires enter");
//         return enterAnimationToDetail(next.container);
//       }
//     },
//     {
//       name: "fade",
//       once({ next }) {
//         return fadeEnterAnimation(next.container);
//       },
//       leave({ current }) {
//         console.log("fade leave", current);
//         return fadeEnterAnimation(next.container);
//       },
//       enter({ next }) {
//         console.log("fade enter", data);
//         window.scrollTo(0, 0);
//         return gsap.to(next.container, {
//           opacity: 1
//         });
//       }
//       // afterEnter(data) {
//       //   console.log("fade", data);
//       //   initialize(data);
//       // }
//     },
//     {
//       name: "navigation",
//       once({ next }) {
//         return fadeEnterAnimation(next.container);
//       },
//       beforeLeave() {
//         console.log("before leave");
//         toggleButton.classList.remove("active");
//         if (isOpen) {
//           timeline.reverse();
//           isOpen = false;
//         }
//       },
//       async leave({ current }) {
//         console.log("leave", current);
//         const done = this.async();
//         timeline.reverse();
//         await delay(1000);
//         done();
//       },
//
//       async enter({ next }) {
//         console.log("enter", next);
//         window.scrollTo(0, 0);
//         return fadeEnterAnimation(next.container);
//       },
//       afterEnter({ next }) {
//         return fadeEnterAnimation(next.container);
//       }
//     }
//   ]
// });
//
// function delay(n) {
//   n = n || 2000;
//   return new Promise((done) => {
//     setTimeout(() => {
//       done();
//     }, n);
//   });
// }
const barba = require("@barba/core");

import { enterAnimationToDetail, fadeEnterAnimation, leaveAnimationToDetail } from "./animations";

document.addEventListener("DOMContentLoaded", (event) => {
  const toggleButton = document.querySelector(".burger");
  const logo = document.querySelector(".nav__logo");
  let isOpen = false;
  const timeline = gsap.timeline({ paused: true });

  gsap.set(".nav__overlay--menu-item a", { y: 225 });

  timeline
    .to(".nav__overlay", {
      duration: 1.5,
      opacity: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power4.inOut"
    })
    .to(
      ".nav__overlay--menu-item a",
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
    debug: true,
    prevent: ({ href }) => {
      return true;
    },
    transitions: [
      {
        name: "navigation",
        once({ next }) {
          console.log("once", next);
          timeline.reverse();
          fadeEnterAnimation(next.container);
        },
        beforeLeave() {
          console.log("before leave");
          toggleButton.classList.remove("active");
          if (isOpen) {
            timeline.reverse();
            isOpen = false;
          }
        },
        async leave({ current }) {
          console.log("leave", current);
          const done = this.async();
          timeline.reverse();
          await delay(1000);
          done();
        },

        async enter({ next }) {
          console.log("enter", next);
          window.scrollTo(0, 0);
          gsap.from(next.container, {
            duration: 0.5,
            opacity: 0,
            ease: "power2.inOut"
          });
        }
      },
      {
        name: "fade",
        to: {
          namespace: "home"
        },
        once({ next }) {
          console.log("once");
          fadeEnterAnimation(next.container);
        },
        leave({ current }) {
          return gsap.to(current.container, {
            opacity: 0
          });
        },
        enter({ next }) {
          fadeEnterAnimation(next.container);
        }
      },
      {
        name: "from-itineraries-to-detail",
        to: {
          namespace: ["panier", "corniche", "vieux-port"]
        },
        once({ next }) {
          return enterAnimationToDetail(next.container);
        },
        leave({ current }) {
          return leaveAnimationToDetail(current.container);
        },
        enter({ next }) {
          return enterAnimationToDetail(next.container);
        }
        // afterEnter(data) {
        //   initialize();
        // }
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
