
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
        insertTopNavBar();
        
        // Insertion du footer personnalisé
        insertFooter();
        
        // Forcer l'application des styles
        applyCustomStyles();

        // Ajouter des écouteurs d'événements pour la version mobile
        setupMobileInteractions();
      };
      
      // Insertion de la barre de navigation
      const insertTopNavBar = () => {
        // Vérifier si la barre de navigation existe déjà
        const existingTopNav = document.querySelector(".cockpitlab-topnav");
        if (existingTopNav) {
          return; // Éviter les doublons
        }
        
        const topNav = createTopNavElement();
        
        // Insérer la barre de navigation au début du body
        if (document.body) {
          document.body.insertBefore(topNav, document.body.firstChild);
        }
      };
      
      // Insertion du footer
      const insertFooter = () => {
        // Vérifier si le footer existe déjà
        const existingFooter = document.querySelector(".cockpitlab-footer");
        if (existingFooter) {
          return; // Éviter les doublons
        }
        
        const footer = createFooterElement();
        
        // Insérer le footer à la fin du corps de la page
        if (document.body) {
          document.body.appendChild(footer);
        }
      };
      
      // Configurer les interactions pour mobile
      const setupMobileInteractions = () => {
        const mobileMenuBtn = document.querySelector('.cockpitlab-mobile-menu-btn');
        const topNavLinks = document.querySelector('.cockpitlab-topnav-links');
        
        if (mobileMenuBtn && topNavLinks) {
          mobileMenuBtn.addEventListener('click', () => {
            topNavLinks.classList.toggle('open');
          });
        }
      };
      
      // Créer l'élément de la barre de navigation
      const createTopNavElement = () => {
        const topNav = document.createElement("div");
        topNav.className = "cockpitlab-topnav";
        
        const topNavContainer = document.createElement("div");
        topNavContainer.className = "cockpitlab-topnav-container";
        
        // Bouton pour menu mobile
        const mobileBtn = document.createElement("button");
        mobileBtn.className = "cockpitlab-mobile-menu-btn";
        mobileBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        mobileBtn.style.display = "none";
        mobileBtn.style.background = "transparent";
        mobileBtn.style.border = "none";
        mobileBtn.style.color = "white";
        mobileBtn.style.cursor = "pointer";
        
        // Liens de la barre de navigation
        const linksContainer = document.createElement("div");
        linksContainer.className = "cockpitlab-topnav-links";
        
        // Réseaux sociaux dropdown
        const socialDropdown = createDropdown("Réseaux sociaux", [
          { text: "Youtube", url: "https://www.youtube.com/@cockpitLAB/" },
          { text: "Instagram", url: "https://www.instagram.com/cockpitlab" },
          { text: "LinkedIn", url: "https://www.linkedin.com/in/jerome-scat/" }
        ]);
        
        // Liens utiles dropdown
        const linksDropdown = createDropdown("Liens Utiles", [
          { text: "Amazon Seller Central", url: "https://sellercentral.amazon.fr/signin?ref_=sdfr_soa_hp_sc-login_pn&initialSessionID=259-0651271-9296123&ld=SEFRSOAAdGog-Categories_11244339272_131696343785_kwd-1889789604_e_586977954360_c_sig-Cj0KCQiA8q--BhDiARIsAP9tKI31a5JrV84tSQdqWcizO8A3lw_5XnYGE3Iav2RqefS0WgUGpFzNsacaAqYOEALw_wcB_asret_" },
          { text: "Avask", url: "https://avask.com/fr/" },
          { text: "GS1", url: "https://www.gs1.org/" },
          { text: "Doug's Compta", url: "https://link.cockpitlab.io/dougs1" }
        ]);
        
        // Formations dropdown
        const formationsDropdown = createDropdown("Formations", [
          { text: "Amazon FBA IMPACT", url: "https://link.cockpitlab.io/amazon-fba-udemy" },
          { text: "Oseille TV", url: "https://link.cockpitlab.io/oseilletv" },
          { text: "Liberté Digitale", url: "https://link.cockpitlab.io/libertedigital" }
        ]);
        
        // Outils dropdown
        const outilsDropdown = createDropdown("Outils", [
          { text: "Helium 10", url: "https://cc.helium10.com/?crsh_reqid=10748678&aid=3543&pg=1&coupon=COCKPITLAB20&PURL-067214&lang=fr" },
          { text: "Keepa", url: "https://link.cockpitlab.io/keepa" },
          { text: "SellerAMP", url: "https://link.cockpitlab.io/sellerAMP" },
          { text: "BuyBotPro", url: "https://link.cockpitlab.io/buybotpro" },
          { text: "SellerBoard", url: "https://link.cockpitlab.io/sellerboard" }
        ]);
        
        // Lien de retour au site
        const siteLink = document.createElement("a");
        siteLink.href = "https://cockpitlab.io";
        siteLink.textContent = "Retour au site principal";
        
        // Ajouter les dropdowns à la barre de navigation
        linksContainer.appendChild(socialDropdown);
        linksContainer.appendChild(linksDropdown);
        linksContainer.appendChild(formationsDropdown);
        linksContainer.appendChild(outilsDropdown);
        
        // Assembler la structure
        topNavContainer.appendChild(mobileBtn);
        topNavContainer.appendChild(linksContainer);
        topNavContainer.appendChild(siteLink);
        topNav.appendChild(topNavContainer);
        
        return topNav;
      };
      
      // Fonction pour créer un dropdown menu
      const createDropdown = (title, items) => {
        const dropdown = document.createElement("div");
        dropdown.className = "cockpitlab-dropdown";
        
        const dropdownBtn = document.createElement("button");
        dropdownBtn.className = "cockpitlab-dropdown-btn";
        dropdownBtn.textContent = title;
        dropdownBtn.innerHTML = `${title} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
        dropdownBtn.style.background = "transparent";
        dropdownBtn.style.border = "none";
        dropdownBtn.style.color = "white";
        dropdownBtn.style.cursor = "pointer";
        dropdownBtn.style.display = "flex";
        dropdownBtn.style.alignItems = "center";
        dropdownBtn.style.gap = "5px";
        
        const dropdownContent = document.createElement("div");
        dropdownContent.className = "cockpitlab-dropdown-content";
        
        // Ajouter chaque lien au dropdown
        items.forEach(item => {
          const link = document.createElement("a");
          link.href = item.url;
          link.textContent = item.text;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          dropdownContent.appendChild(link);
        });
        
        dropdown.appendChild(dropdownBtn);
        dropdown.appendChild(dropdownContent);
        
        return dropdown;
      };
      
      // Créer l'élément du footer
      const createFooterElement = () => {
        const footer = document.createElement("div");
        footer.className = "cockpitlab-footer";
        footer.innerHTML = `
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
                <li><a href="https://cockpitlab.io/contact">Formulaire de contact</a></li>
              </ul>
            </div>
          </div>
          <div class="cockpitlab-footer-bottom">
            <div class="cockpitlab-social-links">
              <a href="https://twitter.com/cockpitlab"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a>
              <a href="https://facebook.com/cockpitlab"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
              <a href="https://linkedin.com/company/cockpitlab"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
            </div>
            <p>&copy; ${new Date().getFullYear()} CockpitLab. Tous droits réservés.</p>
          </div>
        `;
        
        return footer;
      };
      
      // Appliquer des styles personnalisés directement pour contourner les restrictions de Discourse
      const applyCustomStyles = () => {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
          /* Force l'application des styles pour la barre de navigation et le footer */
          .cockpitlab-topnav, .cockpitlab-dropdown-content, .cockpitlab-footer {
            visibility: visible !important;
            opacity: 1 !important;
            display: block !important;
          }
          
          /* Correction du z-index pour les dropdowns */
          .cockpitlab-dropdown-content {
            z-index: 1200 !important;
          }
          
          /* Ajuster l'en-tête Discourse pour s'adapter à notre barre de navigation */
          .d-header {
            top: 35px !important;
          }
          
          /* Ajuster le corps principal pour notre barre de navigation */
          #main-outlet {
            padding-top: 30px !important;
          }
          
          /* Styles pour mobile */
          @media (max-width: 768px) {
            .cockpitlab-mobile-menu-btn {
              display: block !important;
            }
            
            .cockpitlab-topnav-links {
              display: none !important;
            }
            
            .cockpitlab-topnav-links.open {
              display: flex !important;
              flex-direction: column !important;
              position: absolute !important;
              top: 100% !important;
              left: 0 !important;
              right: 0 !important;
              background-color: var(--primary) !important;
              padding: 10px !important;
            }
          }
        `;
        document.head.appendChild(styleElement);
      };
      
      // Insertion immédiate
      api.onPageChange(() => {
        // Attendre que le DOM soit complètement chargé
        setTimeout(() => {
          insertCustomElements();
        }, 500);
      });
      
      // Exécution initiale après un court délai pour s'assurer que Discourse est chargé
      setTimeout(() => {
        insertCustomElements();
      }, 500);
    });
  }
};
