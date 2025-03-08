
import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [linksOpen, setLinksOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="navbar flex items-center justify-between">
      {/* Desktop menu */}
      <div className="hidden md:flex items-center space-x-6">
        {/* Menu Liens Utiles */}
        <div className="relative dropdown-container">
          <button 
            className="flex items-center text-white/80 hover:text-white"
            onMouseEnter={() => setLinksOpen(true)}
          >
            Liens Utiles <ChevronDown size={16} className="ml-1" />
          </button>
          
          <div 
            className={`absolute top-full left-0 mt-2 bg-white text-black rounded-lg shadow-lg py-2 min-w-40 z-50 dropdown-menu ${!linksOpen ? 'hidden' : ''}`}
            onMouseEnter={() => setLinksOpen(true)}
            onMouseLeave={() => setLinksOpen(false)}
          >
            <a 
              href="https://sellercentral.amazon.fr/signin?ref_=sdfr_soa_hp_sc-login_pn&initialSessionID=259-0651271-9296123&ld=SEFRSOAAdGog-Categories_11244339272_131696343785_kwd-1889789604_e_586977954360_c_sig-Cj0KCQiA8q--BhDiARIsAP9tKI31a5JrV84tSQdqWcizO8A3lw_5XnYGE3Iav2RqefS0WgUGpFzNsacaAqYOEALw_wcB_asret_" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Amazon Seller Central
            </a>
            <a 
              href="https://cc.helium10.com/?crsh_reqid=10748678&aid=3543&pg=1&coupon=COCKPITLAB20&PURL-067214&lang=fr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Helium 10
            </a>
          </div>
        </div>
        
        {/* Menu Réseaux sociaux */}
        <div className="relative dropdown-container">
          <button 
            className="flex items-center text-white/80 hover:text-white"
            onMouseEnter={() => setSocialOpen(true)}
          >
            Réseaux sociaux <ChevronDown size={16} className="ml-1" />
          </button>
          
          <div 
            className={`absolute top-full left-0 mt-2 bg-white text-black rounded-lg shadow-lg py-2 min-w-40 z-50 dropdown-menu ${!socialOpen ? 'hidden' : ''}`}
            onMouseEnter={() => setSocialOpen(true)}
            onMouseLeave={() => setSocialOpen(false)}
          >
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Twitter</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">LinkedIn</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Instagram</a>
          </div>
        </div>
      </div>
      
      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="text-white">
          {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Site link - shown on both mobile and desktop */}
      <div>
        <a href="#" className="text-white/80 hover:text-white text-sm">
          Retour au site principal
        </a>
      </div>
      
      {/* Mobile dropdown menu */}
      {mobileNavOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 z-50 p-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <div className="text-white/80 font-medium">Liens Utiles</div>
            <a 
              href="https://sellercentral.amazon.fr/signin?ref_=sdfr_soa_hp_sc-login_pn&initialSessionID=259-0651271-9296123&ld=SEFRSOAAdGog-Categories_11244339272_131696343785_kwd-1889789604_e_586977954360_c_sig-Cj0KCQiA8q--BhDiARIsAP9tKI31a5JrV84tSQdqWcizO8A3lw_5XnYGE3Iav2RqefS0WgUGpFzNsacaAqYOEALw_wcB_asret_" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/60 hover:text-white pl-2"
            >
              Amazon Seller Central
            </a>
            <a 
              href="https://cc.helium10.com/?crsh_reqid=10748678&aid=3543&pg=1&coupon=COCKPITLAB20&PURL-067214&lang=fr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/60 hover:text-white pl-2"
            >
              Helium 10
            </a>
            
            <div className="text-white/80 font-medium mt-4">Réseaux sociaux</div>
            <a href="#" className="text-white/60 hover:text-white pl-2">Twitter</a>
            <a href="#" className="text-white/60 hover:text-white pl-2">LinkedIn</a>
            <a href="#" className="text-white/60 hover:text-white pl-2">Instagram</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
