const barba = require("@barba/core");
import { enterAnimationToDetail, leaveAnimationToDetail } from "./animations";

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
      // Aquí puedes personalizar qué enlaces Barba debe ignorar.
      // Por ejemplo, puedes ignorar todos y gestionarlo manualmente:
      return true; // Esto desactiva todas las capturas automáticas.
    },
    // debug: true,
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
          window.scrollTo(0, 0);
          gsap.from(data.next.container, {
            duration: 0.5,
            opacity: 0,
            ease: "power2.inOut"
          });
        },

        async afterEnter(data) {
          if (data.next.namespace === "itineraries") {
            start();
          }
        }
      },
      {
        name: "fade",
        leave(data) {
          console.log(this.name);
          return gsap.to(data.current.container, {
            opacity: 0
          });
        },
        enter(data) {
          window.scrollTo(0, 0);
          return gsap.to(data.next.container, {
            opacity: 1
          });
        },
        afterEnter(data) {
          initialize();
        }
      },
      {
        name: "from-itineraries-to-detail",
        // from: {
        //   namespace: ["itineraries"]
        // },
        to: {
          namespace: ["panier", "panier", "vieux-port"]
        },
        once({ next }) {
          // Animación imagen
          gsap.set(".hero-detail__image", {
            opacity: 0,
            yPercent: 201
          });

          gsap.to(".hero-detail__wrapper", { visibility: "visible", duration: 1 });

          gsap.to(".hero-detail__image", {
            opacity: 1,
            yPercent: 0,
            duration: 1,
            ease: "power1.out",
            onComplete: () => enterAnimationToDetail(next.container)
          });
        },
        async leave({ current }) {
          leaveAnimationToDetail(current.container);
        },
        enter({ next }) {
          const header = container.querySelector(".hero-detail__wrapper");
          const image = container.querySelector(".hero-detail__image");
          console.log("enter", this.name, next);

          const tl = gsap.timeline();

          tl.fromTo(
            image,
            { opacity: 0, yPercent: 101, duration: 5 },
            { opacity: 1, yPercent: 0, duration: 5 }
          );
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
