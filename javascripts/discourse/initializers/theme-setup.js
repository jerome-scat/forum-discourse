
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
 * Executes all required tasks to clean up the interface
 */
function cleanupInterface() {
  removeFooter();
}

/**
 * Sets up event handlers and executes initial tasks
 * @param {Object} api - Discourse plugin API
 */
function setupInitialTasks(api) {
  // Setup page change handler
  api.onPageChange(() => {
    cleanupInterface();
  });
  
  // Execute initially
  setTimeout(cleanupInterface, 500);
}
