
import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "theme-setup",
  initialize() {
    withPluginApi("0.8", (api) => {
      // Attendre que le DOM soit chargé
      api.onPageChange(() => {
        setTimeout(() => {
          // S'assurer que la classe HTML est bien positionnée
          document.documentElement.classList.add("discourse");
          
          // Création et insertion de la barre de navigation supérieure
          if (!document.querySelector(".top-navbar")) {
            const topNavbar = document.createElement("div");
            topNavbar.className = "top-navbar";
            topNavbar.innerHTML = `
              <div class="container">
                <div class="left-nav">
                  <a href="https://cockpitlab.io" target="_blank">Accueil CockpitLab</a>
                  <a href="https://cockpitlab.io/blog" target="_blank">Blog</a>
                </div>
                <div class="right-nav">
                  <a href="https://twitter.com/cockpitlab" target="_blank">Twitter</a>
                  <a href="https://linkedin.com/company/cockpitlab" target="_blank">LinkedIn</a>
                </div>
              </div>
            `;
            
            // Insérer la barre de navigation avant le header
            const header = document.querySelector(".d-header-wrap");
            if (header && header.parentNode) {
              header.parentNode.insertBefore(topNavbar, header);
            }
          }
          
          // Création et insertion du footer personnalisé
          if (!document.querySelector(".custom-footer")) {
            const footer = document.createElement("div");
            footer.className = "custom-footer";
            footer.innerHTML = `
              <div class="container">
                <div class="footer-top">
                  <div class="footer-section">
                    <h4>À propos de CockpitLab</h4>
                    <p>CockpitLab aide les entreprises à optimiser et moderniser leurs processus d'affaires.</p>
                  </div>
                  <div class="footer-section">
                    <h4>Liens rapides</h4>
                    <ul>
                      <li><a href="https://cockpitlab.io/services">Services</a></li>
                      <li><a href="https://cockpitlab.io/products">Produits</a></li>
                      <li><a href="https://cockpitlab.io/contact">Contact</a></li>
                    </ul>
                  </div>
                  <div class="footer-section">
                    <h4>Ressources</h4>
                    <ul>
                      <li><a href="https://cockpitlab.io/blog">Blog</a></li>
                      <li><a href="https://cockpitlab.io/documentation">Documentation</a></li>
                      <li><a href="https://cockpitlab.io/faq">FAQ</a></li>
                    </ul>
                  </div>
                </div>
                <div class="footer-bottom">
                  <img src="https://cockpitlab.io/logo.png" alt="CockpitLab Logo" class="footer-logo" />
                  <div class="social-links">
                    <a href="https://twitter.com/cockpitlab" target="_blank">Twitter</a>
                    <a href="https://linkedin.com/company/cockpitlab" target="_blank">LinkedIn</a>
                    <a href="https://facebook.com/cockpitlab" target="_blank">Facebook</a>
                  </div>
                  <p>&copy; ${new Date().getFullYear()} CockpitLab. Tous droits réservés.</p>
                </div>
              </div>
            `;
            
            // Insérer le footer à la fin de la page
            const body = document.querySelector("body");
            if (body) {
              body.appendChild(footer);
            }
          }
        }, 500); // Délai pour s'assurer que les éléments DOM sont chargés
      });
    });
  }
};
