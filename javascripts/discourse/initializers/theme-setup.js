
import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "cockpitlab-theme-setup",
  initialize() {
    withPluginApi("0.8.31", api => {
      // Ajout de la classe principale pour notre thème
      document.documentElement.classList.add("discourse-application");
      
      // Fonction pour insérer nos éléments personnalisés
      const insertCustomElements = () => {
        // Insertion de la barre de navigation supérieure
        const topNav = createTopNavBar();
        const existingTopNav = document.querySelector(".cockpitlab-topnav");
        if (!existingTopNav && document.body) {
          document.body.insertBefore(topNav, document.body.firstChild);
        }
        
        // Insertion du footer personnalisé
        const footer = createFooter();
        const existingFooter = document.querySelector(".cockpitlab-footer");
        if (!existingFooter && document.body) {
          document.body.appendChild(footer);
        }
        
        // Forcer l'application des styles
        applyCustomStyles();
      };
      
      // Insertion immédiate
      api.onPageChange(() => {
        // Attendre que le DOM soit complètement chargé
        setTimeout(() => {
          insertCustomElements();
        }, 500);
      });
      
      // Exécution initiale
      setTimeout(() => {
        insertCustomElements();
      }, 500);
    });
  }
};

// Créer la barre de navigation supérieure
const createTopNavBar = () => {
  const topNav = document.createElement("div");
  topNav.className = "cockpitlab-topnav";
  topNav.innerHTML = `
    <div class="cockpitlab-topnav-container">
      <div class="cockpitlab-topnav-left">
        <a href="https://cockpitlab.io">Accueil</a>
        <a href="https://cockpitlab.io/services">Services</a>
        <a href="https://cockpitlab.io/produits">Produits</a>
      </div>
      <div class="cockpitlab-topnav-right">
        <a href="https://cockpitlab.io/contact">Contact</a>
        <a href="https://cockpitlab.io/a-propos">À propos</a>
      </div>
    </div>
  `;
  return topNav;
};

// Créer le footer
const createFooter = () => {
  const footer = document.createElement("footer");
  footer.className = "cockpitlab-footer";
  footer.innerHTML = `
    <div class="cockpitlab-footer-container">
      <div class="cockpitlab-footer-top">
        <div class="cockpitlab-footer-section">
          <h4>CockpitLab</h4>
          <ul>
            <li><a href="https://cockpitlab.io/a-propos">À propos</a></li>
            <li><a href="https://cockpitlab.io/equipe">Notre équipe</a></li>
            <li><a href="https://cockpitlab.io/carriere">Carrières</a></li>
          </ul>
        </div>
        <div class="cockpitlab-footer-section">
          <h4>Services</h4>
          <ul>
            <li><a href="https://cockpitlab.io/services/conseil">Conseil</a></li>
            <li><a href="https://cockpitlab.io/services/formation">Formation</a></li>
            <li><a href="https://cockpitlab.io/services/developpement">Développement</a></li>
          </ul>
        </div>
        <div class="cockpitlab-footer-section">
          <h4>Ressources</h4>
          <ul>
            <li><a href="https://cockpitlab.io/blog">Blog</a></li>
            <li><a href="https://cockpitlab.io/ressources">Documentation</a></li>
            <li><a href="https://forum.cockpitlab.io">Forum</a></li>
          </ul>
        </div>
        <div class="cockpitlab-footer-section">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:info@cockpitlab.io">info@cockpitlab.io</a></li>
            <li><a href="tel:+33123456789">+33 1 23 45 67 89</a></li>
            <li><a href="https://cockpitlab.io/contact">Formulaire de contact</a></li>
          </ul>
        </div>
      </div>
      <div class="cockpitlab-footer-bottom">
        <img src="https://cockpitlab.io/logo.png" alt="CockpitLab Logo" class="cockpitlab-footer-logo" />
        <div class="cockpitlab-social-links">
          <a href="https://twitter.com/cockpitlab"><i class="fab fa-twitter"></i></a>
          <a href="https://facebook.com/cockpitlab"><i class="fab fa-facebook"></i></a>
          <a href="https://linkedin.com/company/cockpitlab"><i class="fab fa-linkedin"></i></a>
          <a href="https://github.com/cockpitlab"><i class="fab fa-github"></i></a>
        </div>
        <p>&copy; ${new Date().getFullYear()} CockpitLab. Tous droits réservés.</p>
      </div>
    </div>
  `;
  return footer;
};

// Fonction pour forcer l'application des styles CSS
const applyCustomStyles = () => {
  // S'assurer que nos styles sont bien appliqués en priorité
  const injectStyles = () => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Forcer l'application des styles avec !important */
      .cockpitlab-topnav {
        background-color: var(--primary) !important;
        color: white !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 1000 !important;
      }
      
      .cockpitlab-footer {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      
      .btn-primary,
      .btn.btn-primary,
      .btn.btn.btn-primary {
        background-color: var(--primary) !important;
        border-color: var(--primary) !important;
        color: white !important;
      }
      
      .d-header {
        background-color: white !important;
        border-bottom: 3px solid var(--primary) !important;
      }
      
      /* Forcer les variables CSS custom */
      :root {
        --primary: #edb067 !important;
        --primary-hover: #e09d4e !important;
        --text-color: #333333 !important;
        --bg-light: #f8f8f8 !important;
        --border-color: #dddddd !important;
        --footer-bg: #f2f2f2 !important;
        --header-height: 60px !important;
      }
    `;
    document.head.appendChild(styleElement);
  };
  
  injectStyles();
}
