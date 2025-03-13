
import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "cockpitlab-theme-setup",
  initialize() {
    withPluginApi("0.8.31", api => {
      // Ajout de la classe principale pour notre thème
      document.documentElement.classList.add("discourse-application");
      
      // Setup mobile interactions if needed (only for Lovable preview)
      const setupMobileInteractions = () => {
        const mobileMenuBtn = document.querySelector('.cockpitlab-mobile-menu-btn');
        const topNavLinks = document.querySelector('.cockpitlab-topnav-links');
        
        if (mobileMenuBtn && topNavLinks) {
          mobileMenuBtn.addEventListener('click', () => {
            topNavLinks.classList.toggle('open');
          });
        }
      };
      
      // Remove any existing footer elements
      const removeFooter = () => {
        const existingFooter = document.querySelector(".cockpitlab-footer");
        if (existingFooter) {
          existingFooter.remove();
        }
      };
      
      // Apply custom styles to ensure footer is hidden
      const applyCustomStyles = () => {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
          /* Hide footer elements */
          .cockpitlab-footer,
          .cockpitlab-footer-top,
          .cockpitlab-footer-section,
          .cockpitlab-footer-bottom,
          .cockpitlab-social-links {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            height: 0 !important;
            width: 0 !important;
            overflow: hidden !important;
            position: absolute !important;
            pointer-events: none !important;
          }
        `;
        document.head.appendChild(styleElement);
      };
      
      // Execution
      api.onPageChange(() => {
        // Remove footer if it exists
        removeFooter();
        // Apply styles to hide footer
        applyCustomStyles();
      });
      
      // Execute initially
      setTimeout(() => {
        removeFooter();
        applyCustomStyles();
      }, 500);
    });
  }
};
