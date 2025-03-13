
import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "cockpitlab-theme-setup",
  initialize() {
    withPluginApi("0.8.31", api => {
      // Add main class for our theme
      addMainThemeClass();
      
      // Setup event handlers and execute initial tasks
      setupInitialTasks(api);
    });
  }
};

/**
 * Adds the main theme class to the document
 */
function addMainThemeClass() {
  document.documentElement.classList.add("discourse-application");
}

/**
 * Sets up mobile menu interactions for preview mode
 */
function setupMobileInteractions() {
  const mobileMenuBtn = document.querySelector('.cockpitlab-mobile-menu-btn');
  const topNavLinks = document.querySelector('.cockpitlab-topnav-links');
  
  if (mobileMenuBtn && topNavLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      topNavLinks.classList.toggle('open');
    });
  }
}

/**
 * Removes any existing footer elements
 */
function removeFooter() {
  const existingFooter = document.querySelector(".cockpitlab-footer");
  if (existingFooter) {
    existingFooter.remove();
  }
}

/**
 * Applies custom styles to ensure footer is hidden
 */
function applyCustomStyles() {
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
    
    /* Ensure Nouvelle discussion button is visible */
    .btn.bg-\\[\\#edb067\\],
    [class*="w-full"] button,
    [class*="md\\:w-80"] button {
      display: flex !important;
      visibility: visible !important;
      opacity: 1 !important;
      position: relative !important;
      pointer-events: auto !important;
      z-index: 10 !important;
    }
  `;
  document.head.appendChild(styleElement);
}

/**
 * Executes all required tasks to clean up the interface
 */
function cleanupInterface() {
  removeFooter();
  applyCustomStyles();
}

/**
 * Sets up event handlers and executes initial tasks
 * @param {Object} api - Discourse plugin API
 */
function setupInitialTasks(api) {
  // Setup page change handler
  api.onPageChange(() => {
    cleanupInterface();
    // Ensure the button is always visible after page changes
    setTimeout(() => {
      ensureButtonVisibility();
    }, 300);
  });
  
  // Execute initially with a slight delay to ensure DOM is loaded
  setTimeout(() => {
    cleanupInterface();
    ensureButtonVisibility();
  }, 500);
}

/**
 * Function to specifically ensure the "Nouvelle discussion" button is visible
 */
function ensureButtonVisibility() {
  const newThreadButtons = document.querySelectorAll('.bg-\\[\\#edb067\\], [class*="w-full md:w-80"] button');
  
  if (newThreadButtons.length > 0) {
    newThreadButtons.forEach(button => {
      if (button instanceof HTMLElement) {
        button.style.display = 'flex';
        button.style.visibility = 'visible';
        button.style.opacity = '1';
      }
    });
  }
}
