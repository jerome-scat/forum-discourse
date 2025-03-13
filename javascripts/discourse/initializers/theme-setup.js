
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
 * Applies custom styles to ensure UI elements are properly displayed
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
    
    /* Super agressive styling for Nouvelle discussion button visibility */
    .btn.bg-\\[\\#edb067\\],
    .btn.bg-\\[\\#F97316\\],
    [class*="w-full"] button,
    [class*="md\\:w-80"] button,
    button[class*="bg-[#edb067]"],
    button[class*="bg-[#F97316]"],
    .w-full.md\\:w-80.lg\\:w-96 .mb-6 button {
      display: flex !important;
      visibility: visible !important;
      opacity: 1 !important;
      position: relative !important;
      pointer-events: auto !important;
      z-index: 9999 !important;
      background-color: #F97316 !important;
      color: white !important;
    }
    
    /* Make sure the button shows up no matter what */
    #main-outlet button[class*="bg-"],
    .cooked button[class*="bg-"],
    #ember-application button[class*="bg-"],
    .ember-application button[class*="bg-"],
    .w-full.md\\:w-80.lg\\:w-96 .mb-6 {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
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
 * Function to specifically ensure the "Nouvelle discussion" button is visible
 * This uses multiple selectors and approaches to maximize visibility
 */
function ensureButtonVisibility() {
  // Try many different selectors to catch the button
  const selectors = [
    '.bg-\\[\\#edb067\\]',
    '.bg-\\[\\#F97316\\]',
    '[class*="w-full"] button',
    '[class*="md\\:w-80"] button',
    '[class*="lg\\:w-96"] button',
    '.w-full.md\\:w-80.lg\\:w-96 .mb-6 button',
    'button[class*="bg-[#edb067]"]',
    'button[class*="bg-[#F97316]"]'
  ];
  
  // Check each selector
  selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    
    if (elements.length > 0) {
      elements.forEach(button => {
        if (button instanceof HTMLElement) {
          // Force extreme visibility styles
          button.style.display = 'flex';
          button.style.visibility = 'visible';
          button.style.opacity = '1';
          button.style.zIndex = '9999';
          button.style.position = 'relative';
          button.style.backgroundColor = '#F97316';
          button.style.color = 'white';
          button.style.pointerEvents = 'auto';
          
          // Ensure the button container is also visible
          const parent = button.parentElement;
          if (parent) {
            parent.style.display = 'block';
            parent.style.visibility = 'visible';
            parent.style.opacity = '1';
          }
        }
      });
    }
  });
  
  // Create a MutationObserver to ensure the button stays visible even when the DOM changes
  const observer = new MutationObserver(mutations => {
    // Re-run visibility check when DOM changes
    setTimeout(() => ensureButtonVisibility(), 200);
  });
  
  // Start observing DOM changes
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Schedule periodic visibility checks
  setInterval(() => ensureButtonVisibility(), 2000);
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
  
  // Execute initially with multiple delays to catch all scenarios
  setTimeout(() => {
    cleanupInterface();
    ensureButtonVisibility();
  }, 500);
  
  setTimeout(() => {
    ensureButtonVisibility();
  }, 1000);
  
  setTimeout(() => {
    ensureButtonVisibility();
  }, 2000);
}
