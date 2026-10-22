const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

// Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        if (active) link.classList.add("active");
        else link.classList.remove("active");
      });
    });
  }, { rootMargin: "-25% 0px -60% 0px" });

  sections.forEach((section) => observer.observe(section));
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Placeholder links should not jump to the top of the page.
document.querySelectorAll(".placeholder-link, .project-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.getAttribute("href") === "#") event.preventDefault();
  });
});
