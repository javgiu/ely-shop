const navToggle = document.querySelector("#nav-toggle");
const mobileMenu = document.querySelector(".nav-menu-mobile");
const menuLinks = document.querySelectorAll(".nav-menu-mobile a, .nav-menu-desktop a");

// Toggle mobile menu
navToggle.addEventListener("click", () => {
    const isActive = navToggle.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    navToggle.setAttribute("aria-expanded", isActive);
});

// Close mobile menu when a link is clicked
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");

        // Optional: Scroll to the section smoothly
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = 80; // Adjust if header height changes
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
    });
});

//Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
    const isClickingInsideMenu = mobileMenu.contains(e.target);
    const isClickingOnToggle = navToggle.contains(e.target);

    if (!isClickingInsideMenu && !isClickingOnToggle && mobileMenu) {
        navToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
    }
});