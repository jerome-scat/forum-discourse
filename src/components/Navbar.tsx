
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [helpOpen, setHelpOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);

  return (
    <div className="navbar flex items-center justify-between">
      <div className="flex items-center space-x-6">
        {/* Menu Aide */}
        <div className="relative"
          onMouseEnter={() => setHelpOpen(true)}
          onMouseLeave={() => setHelpOpen(false)}
        >
          <button 
            className="flex items-center text-white/80 hover:text-white"
          >
            Aide <ChevronDown size={16} className="ml-1" />
          </button>
          
          {helpOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white text-black rounded-lg shadow-lg py-2 min-w-40 z-50">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Centre d'aide</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">FAQ</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Contact</a>
            </div>
          )}
        </div>
        
        {/* Menu Nouveautés */}
        <div className="relative"
          onMouseEnter={() => setNewsOpen(true)}
          onMouseLeave={() => setNewsOpen(false)}
        >
          <button 
            className="flex items-center text-white/80 hover:text-white"
          >
            Nouveautés <ChevronDown size={16} className="ml-1" />
          </button>
          
          {newsOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white text-black rounded-lg shadow-lg py-2 min-w-40 z-50">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Dernières mises à jour</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Roadmap</a>
            </div>
          )}
        </div>
        
        {/* Menu Réseaux sociaux */}
        <div className="relative"
          onMouseEnter={() => setSocialOpen(true)}
          onMouseLeave={() => setSocialOpen(false)}
        >
          <button 
            className="flex items-center text-white/80 hover:text-white"
          >
            Réseaux sociaux <ChevronDown size={16} className="ml-1" />
          </button>
          
          {socialOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white text-black rounded-lg shadow-lg py-2 min-w-40 z-50">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Twitter</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">LinkedIn</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Instagram</a>
            </div>
          )}
        </div>
      </div>
      
      <div>
        <a href="#" className="text-white/80 hover:text-white text-sm">
          Retour au site principal
        </a>
      </div>
    </div>
  );
};

export default Navbar;
