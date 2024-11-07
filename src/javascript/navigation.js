import { gsap } from "gsap";
import barba from "@barba/core";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const toggleButton = document.querySelector(".burger");
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
  transitions: [
    {
      beforeLeave() {
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
        if (namespace === "itineraries") {
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

// Navigation scroll

const navBar = document.querySelector(".nav");

const up = gsap.timeline({ paused: true });
const down = gsap.timeline({ paused: true });

up.to(navBar, {
  yPercent: -100,
  duration: 0.3,
  ease: "power2.inOut"
});

ScrollTrigger.create({
  trigger: document.body,
  start: "top top",
  end: "bottom bottom",
  toggleClass: { className: ".nav__bg" },
  onUpdate: (self) => {
    if (self.direction === 1) {
      up.play();
    } else {
      // Scroll hacia arriba
      up.reverse();
    }
  },
  markers: true
});

function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}
