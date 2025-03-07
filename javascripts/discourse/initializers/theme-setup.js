
import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "theme-setup",
  initialize() {
    withPluginApi("0.8.31", api => {
      api.onPageChange(() => {
        // Vérifier si le footer personnalisé existe déjà
        if (!document.querySelector('.custom-footer')) {
          // Créer le footer
          const footer = document.createElement('footer');
          footer.className = 'custom-footer';
          
          // Créer le contenu du footer
          footer.innerHTML = `
            <div class="container">
              <div class="footer-links">
                <a href="/tos">Conditions d'utilisation</a>
                <a href="/privacy">Politique de confidentialité</a>
                <a href="/new-message?username=Jerome">Contact</a>
              </div>
              <div class="footer-copyright">
                © ${new Date().getFullYear()} CockpitLab. Tous droits réservés.
              </div>
            </div>
          `;
          
          // Ajouter le footer à la fin du contenu principal
          const mainOutlet = document.querySelector('#main-outlet');
          if (mainOutlet) {
            mainOutlet.appendChild(footer);
          }
        }
      });
    });
  }
};
