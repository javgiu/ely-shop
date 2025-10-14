export function initSmoothScroll() {
  const navToggle = document.querySelector("#nav-toggle");
  const mobileMenu = document.querySelector(".nav-menu-mobile");
  const menuLinks = document.querySelectorAll(
    ".nav-menu-mobile a, .nav-menu-desktop a"
  );

  const header = document.querySelector("header");
  const headerHeight = header ? header.offsetHeight : 80;

  // Close mobile menu when a link is clicked
  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (navToggle && mobileMenu) {
        navToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      }

      // Smooth scroll
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = headerHeight; // Adjust if header height changes
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}
