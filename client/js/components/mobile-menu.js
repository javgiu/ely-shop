export function initMobileMenu() {
  const navToggle = document.querySelector("#nav-toggle");
  const mobileMenu = document.querySelector(".nav-menu-mobile");

  if (!navToggle || !mobileMenu) return;

  // Toggle mobile menu
  navToggle.addEventListener("click", () => {
    const isActive = navToggle.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    navToggle.setAttribute("aria-expanded", isActive);
  });

  //Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    const isClickingInsideMenu = mobileMenu.contains(e.target);
    const isClickingOnToggle = navToggle.contains(e.target);

    if (
      !isClickingInsideMenu &&
      !isClickingOnToggle &&
      mobileMenu.classList.contains("active")
    ) {
      navToggle.classList.remove("active");
      mobileMenu.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}
