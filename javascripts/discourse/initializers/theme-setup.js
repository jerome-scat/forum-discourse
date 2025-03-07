
import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "discourse-theme-components",
  initialize() {
    withPluginApi("0.8.31", (api) => {
      // Make sure the custom elements are added after the page loads
      api.onPageChange(() => {
        // Add custom footer to the page
        const footerHTML = `
          <div class="custom-footer">
            <div class="container">
              <div class="footer-links">
                <a href="/about">À propos</a>
                <a href="/faq">FAQ</a>
                <a href="/tos">Conditions d'utilisation</a>
                <a href="/privacy">Politique de confidentialité</a>
                <a href="/contact">Contact</a>
              </div>
              <div class="footer-copyright">
                © ${new Date().getFullYear()} CockpitLab. Tous droits réservés.
              </div>
            </div>
          </div>
        `;

        // Check if footer already exists to avoid duplicates
        const existingFooter = document.querySelector('.custom-footer');
        if (!existingFooter) {
          const footerContainer = document.createElement('div');
          footerContainer.className = 'custom-footer-container';
          footerContainer.innerHTML = footerHTML;
          
          const outlet = document.querySelector('#main-outlet');
          if (outlet) {
            outlet.after(footerContainer);
          }
        }

        // Add top navbar if it doesn't exist
        const existingTopBar = document.querySelector('.top-navbar');
        if (!existingTopBar) {
          const topBarHTML = `
            <div class="top-navbar">
              <div class="container">
                <div class="top-navbar-content">
                  Bienvenue sur le forum CockpitLab
                </div>
              </div>
            </div>
          `;
          
          const topBarContainer = document.createElement('div');
          topBarContainer.innerHTML = topBarHTML;
          
          const header = document.querySelector('.d-header-wrap');
          if (header) {
            header.before(topBarContainer.firstElementChild);
          }
        }
      });
    });
  }
};
