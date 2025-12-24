document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const nav = document.querySelector(".nav");

  // SAFETY CHECK (important)
  if (!nav || !navToggle) return;

  const navLinks = nav.querySelectorAll("a");
  const burgerLines = document.querySelectorAll(".hamburger-line");

  const menuTl = gsap.timeline({
    paused: true,
    defaults: {
      ease: "power2.out",
      duration: 0.35,
    },
  });

  menuTl
    .to(nav, {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
    })
    .to(
      navLinks,
      {
        opacity: 1,
        y: 0,
        stagger: 0.06,
      },
      "-=0.2",
    )
    .to(burgerLines[0], { rotate: 45, y: 6 }, 0)
    .to(burgerLines[1], { opacity: 0 }, 0)
    .to(burgerLines[2], { rotate: -45, y: -6 }, 0);

  navToggle.addEventListener("change", () => {
    navToggle.checked ? menuTl.play() : menuTl.reverse();
  });
});

navLinks.forEach((link) => {
  const underline = link.querySelector("::after"); // conceptual

  link.addEventListener("touchstart", () => {
    gsap.to(link, {
      x: 3,
      opacity: 0.85,
      duration: 0.18,
      ease: "power2.out",
    });

    gsap.to(link, {
      "--underline": 1,
    });
  });

  link.addEventListener("touchend", () => {
    gsap.to(link, {
      x: 0,
      opacity: 1,
      duration: 0.2,
      ease: "power2.inOut",
    });
  });

  link.addEventListener("touchcancel", () => {
    gsap.to(link, {
      x: 0,
      opacity: 1,
      duration: 0.2,
      ease: "power2.inOut",
    });
  });
});
