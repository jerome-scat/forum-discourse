
import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "custom-topnav",
  initialize() {
    withPluginApi("0.8.31", (api) => {
      api.onPageChange(() => {
        // Ensure our code only runs once the DOM is fully loaded
        if (document.readyState === "complete" || document.readyState === "interactive") {
          createTopNav();
        } else {
          document.addEventListener("DOMContentLoaded", createTopNav);
        }
      });

      function createTopNav() {
        // Remove existing top nav if it exists
        const existingTopNav = document.querySelector(".cockpitlab-topnav");
        if (existingTopNav) {
          existingTopNav.remove();
        }

        // Create top navigation
        const topNav = document.createElement("div");
        topNav.className = "cockpitlab-topnav";

        const container = document.createElement("div");
        container.className = "cockpitlab-topnav-container";

        // Left side - Logo
        const logoLink = document.createElement("a");
        logoLink.href = "/";
        logoLink.textContent = "CockpitLab";
        
        // Center - Links
        const navLinks = document.createElement("div");
        navLinks.className = "cockpitlab-topnav-links";
        
        // Home link
        const homeLink = document.createElement("a");
        homeLink.href = "/";
        homeLink.textContent = "Accueil";
        navLinks.appendChild(homeLink);
        
        // Categories link
        const categoriesLink = document.createElement("a");
        categoriesLink.href = "/categories";
        categoriesLink.textContent = "Catégories";
        navLinks.appendChild(categoriesLink);
        
        // Useful Links dropdown
        const usefulLinksDropdown = document.createElement("div");
        usefulLinksDropdown.className = "cockpitlab-dropdown";
        
        const usefulLinksBtn = document.createElement("button");
        usefulLinksBtn.className = "cockpitlab-dropdown-button";
        usefulLinksBtn.textContent = "Liens Utiles";
        usefulLinksDropdown.appendChild(usefulLinksBtn);
        
        const usefulLinksContent = document.createElement("div");
        usefulLinksContent.className = "cockpitlab-dropdown-content";
        
        // Add links to dropdown
        const links = [
          { text: "Documentation", url: "/docs" },
          { text: "FAQ", url: "/faq" },
          { text: "Support", url: "/support" }
        ];
        
        links.forEach(link => {
          const a = document.createElement("a");
          a.href = link.url;
          a.textContent = link.text;
          usefulLinksContent.appendChild(a);
        });
        
        usefulLinksDropdown.appendChild(usefulLinksContent);
        navLinks.appendChild(usefulLinksDropdown);
        
        // Right side - User links or login
        const userArea = document.createElement("div");
        
        // Mobile menu button
        const mobileMenuBtn = document.createElement("button");
        mobileMenuBtn.className = "cockpitlab-mobile-menu-btn";
        mobileMenuBtn.innerHTML = "☰";
        mobileMenuBtn.addEventListener("click", () => {
          navLinks.classList.toggle("open");
        });
        
        // Assemble the navigation
        container.appendChild(logoLink);
        container.appendChild(navLinks);
        container.appendChild(userArea);
        container.appendChild(mobileMenuBtn);
        topNav.appendChild(container);
        
        // Insert at the beginning of the body
        const body = document.querySelector("body");
        body.insertBefore(topNav, body.firstChild);
      }
    });
  }
};
