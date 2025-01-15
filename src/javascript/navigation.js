// import { gsap } from "gsap";
const barba = require("@barba/core");
import { enterAnimationToDetail, fadeEnterAnimation, leaveAnimationToDetail } from "./animations";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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
    prevent: ({ href }) => {
      return true;
    },
    transitions: [
      {
        name: "navigation",
        once({ next }) {
          timeline.reverse();
          fadeEnterAnimation(next.container);
        },
        beforeLeave() {
          toggleButton.classList.remove("active");
          if (isOpen) {
            timeline.reverse();
            isOpen = false;
          }
        },
        async leave({ current }) {
          const done = this.async();
          timeline.reverse();
          await delay(1000);
          done();
        },

        async enter({ next }) {
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
          enterAnimationToDetail(next.container);
        },
        leave({ current }) {
          leaveAnimationToDetail(current.container);
        },
        enter({ next }) {
          enterAnimationToDetail(next.container);
        },
        afterEnter({ next }) {
          enterAnimationToDetail(next.container);
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
