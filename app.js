
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuButton = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";

      menuButton.setAttribute("aria-expanded", String(!isOpen));
      navMenu.classList.toggle("active", !isOpen);
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Open menu" : "Close menu"
      );
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navMenu.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) {
        navMenu.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Automatically update the footer year
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Contact form: front-end validation only
  const contactForm = document.querySelector("[data-contact-form]");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) {
        return;
      }

      const status = contactForm.querySelector(".form-status");

      if (status) {
        status.className = "form-status is-error";
        status.textContent =
          "Your message has not been sent. This form needs to be connected to an email service or backend.";
      }
    });
  }

  // Highlight the current navigation link
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    const linkPage = new URL(link.href).pathname.split("/").pop();

    if (linkPage.toLowerCase() === currentPage.toLowerCase()) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
});
