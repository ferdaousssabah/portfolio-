/* =================================
   FERDAOUSS - PORTFOLIO JAVASCRIPT
================================= */

// MOBILE MENU

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {

  if (!menuToggle || !navLinks) return;

  navLinks.classList.remove("open");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");

  const icon = menuToggle.querySelector("i");

  if (icon) {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }

}

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    const icon = menuToggle.querySelector("i");

    if (icon) {

      icon.classList.toggle("fa-bars", !isOpen);
      icon.classList.toggle("fa-xmark", isOpen);

    }

  });

  // Close menu after clicking a link

  navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", closeMenu);

  });

  // Close with Escape

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeMenu();
    }

  });

  // Close when returning to desktop

  window.addEventListener("resize", () => {

    if (window.innerWidth > 780) {
      closeMenu();
    }

  });

}


// SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(".reveal");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reduceMotion) {

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(element => {

    revealObserver.observe(element);

  });

} else {

  revealElements.forEach(element => {

    element.classList.add("show");

  });

}


// ACTIVE NAVIGATION

const pageSections = document.querySelectorAll(
  "main section[id]"
);

const navItems = document.querySelectorAll(
  ".nav-links a"
);

if (
  "IntersectionObserver" in window &&
  pageSections.length &&
  navItems.length
) {

  const sectionObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const currentId = entry.target.id;

        navItems.forEach(link => {

          const isActive =
            link.getAttribute("href") === `#${currentId}`;

          link.classList.toggle("active", isActive);

        });

      });

    },
    {
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0
    }
  );

  pageSections.forEach(section => {

    sectionObserver.observe(section);

  });

}


// CONTACT FORM

const contactForm = document.getElementById("contactForm");

const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {

  contactForm.addEventListener("submit", event => {

    event.preventDefault();

    const name = document
      .getElementById("name")
      .value.trim();

    const email = document
      .getElementById("email")
      .value.trim();

    const message = document
      .getElementById("msg")
      .value.trim();


    if (!name || !email || !message) {

      formStatus.textContent =
        "Please complete all fields before sending.";

      return;

    }


    const subject = encodeURIComponent(
      `Portfolio message from ${name}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`
    );


    const mailtoLink =
      `mailto:ferdaousssabah7@gmail.com?subject=${subject}&body=${body}`;


    formStatus.textContent =
      "Your email app will open with your message ready. Please press Send there.";

    window.location.href = mailtoLink;

  });

}


// AUTOMATIC YEAR

const yearElement = document.getElementById("year");

if (yearElement) {

  yearElement.textContent = new Date().getFullYear();

}