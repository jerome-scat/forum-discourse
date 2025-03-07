
import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "discourse-cockpitlab-theme",
  initialize() {
    withPluginApi("0.8.31", (api) => {
      // Function to add our custom elements
      const addCustomElements = () => {
        // Add custom top navbar
        const topNavHTML = `
          <div class="top-navbar">
            <div class="container">
              <div class="left-links">
                <a href="https://www.cockpitlab.com" target="_blank">CockpitLab.com</a>
                <a href="https://www.cockpitlab.com/services" target="_blank">Services</a>
                <a href="https://www.cockpitlab.com/blog" target="_blank">Blog</a>
              </div>
              <div class="right-links">
                <a href="https://www.cockpitlab.com/contact" target="_blank">Contact</a>
              </div>
            </div>
          </div>
        `;

        // Add custom footer
        const footerHTML = `
          <div class="custom-footer">
            <div class="container">
              <div class="footer-top">
                <div class="footer-section">
                  <h4>CockpitLab</h4>
                  <ul>
                    <li><a href="https://www.cockpitlab.com/about" target="_blank">À propos</a></li>
                    <li><a href="https://www.cockpitlab.com/services" target="_blank">Services</a></li>
                    <li><a href="https://www.cockpitlab.com/blog" target="_blank">Blog</a></li>
                  </ul>
                </div>
                <div class="footer-section">
                  <h4>Support</h4>
                  <ul>
                    <li><a href="https://forum.cockpitlab.io/c/support" target="_blank">Centre d'aide</a></li>
                    <li><a href="https://www.cockpitlab.com/contact" target="_blank">Contact</a></li>
                  </ul>
                </div>
                <div class="footer-section">
                  <h4>Légal</h4>
                  <ul>
                    <li><a href="https://www.cockpitlab.com/privacy" target="_blank">Confidentialité</a></li>
                    <li><a href="https://www.cockpitlab.com/terms" target="_blank">Conditions d'utilisation</a></li>
                  </ul>
                </div>
              </div>
              <div class="footer-bottom">
                <img src="https://www.cockpitlab.com/wp-content/uploads/2022/07/cockpitlab-logo.png" alt="CockpitLab Logo" class="footer-logo" />
                <div class="social-links">
                  <a href="https://twitter.com/cockpitlab" target="_blank"><i class="fab fa-twitter"></i></a>
                  <a href="https://www.linkedin.com/company/cockpitlab" target="_blank"><i class="fab fa-linkedin"></i></a>
                </div>
                <p>© ${new Date().getFullYear()} CockpitLab. Tous droits réservés.</p>
              </div>
            </div>
          </div>
        `;

        // Safely check if we need to add elements
        if (!document.querySelector('.top-navbar')) {
          // Try different insertion points for the top navbar
          const header = document.querySelector('header.d-header');
          const topNavbarContainer = document.createElement('div');
          topNavbarContainer.className = 'custom-header-container';
          topNavbarContainer.innerHTML = topNavHTML;
          
          if (header && header.parentNode) {
            header.parentNode.insertBefore(topNavbarContainer, header);
          } else {
            document.body.insertBefore(topNavbarContainer, document.body.firstChild);
          }
        }

        // Create and insert the footer at the end of main outlet
        if (!document.querySelector('.custom-footer')) {
          const footerContainer = document.createElement('div');
          footerContainer.className = 'custom-footer-container';
          footerContainer.innerHTML = footerHTML;
          
          // Try multiple insertion points for the footer
          const mainOutlet = document.querySelector('#main-outlet');
          if (mainOutlet) {
            mainOutlet.parentNode.insertBefore(footerContainer, mainOutlet.nextSibling);
          } else {
            const footer = document.querySelector('footer');
            if (footer) {
              footer.parentNode.insertBefore(footerContainer, footer);
            } else {
              document.body.appendChild(footerContainer);
            }
          }
        }
      };

      // Add custom elements on page change and on DOM content loaded
      api.onPageChange(() => {
        // Delay to ensure DOM is fully loaded
        setTimeout(addCustomElements, 500);
      });

      // Also add on initial page load with multiple attempts
      // This helps ensure it loads even if the DOM changes after initial load
      setTimeout(addCustomElements, 500);
      setTimeout(addCustomElements, 1000);
      setTimeout(addCustomElements, 2000);
    });
  }
};
