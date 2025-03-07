
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
        <div className="relative dropdown-container">
          <button 
            className="flex items-center text-white/80 hover:text-white"
            onMouseEnter={() => setHelpOpen(true)}
          >
            Aide <ChevronDown size={16} className="ml-1" />
          </button>
          
          <div 
            className={`absolute top-full left-0 mt-2 bg-white text-black rounded-lg shadow-lg py-2 min-w-40 z-50 dropdown-menu ${!helpOpen ? 'hidden' : ''}`}
            onMouseEnter={() => setHelpOpen(true)}
            onMouseLeave={() => setHelpOpen(false)}
          >
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Centre d'aide</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">FAQ</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Contact</a>
          </div>
        </div>
        
        {/* Menu Nouveautés */}
        <div className="relative dropdown-container">
          <button 
            className="flex items-center text-white/80 hover:text-white"
            onMouseEnter={() => setNewsOpen(true)}
          >
            Nouveautés <ChevronDown size={16} className="ml-1" />
          </button>
          
          <div 
            className={`absolute top-full left-0 mt-2 bg-white text-black rounded-lg shadow-lg py-2 min-w-40 z-50 dropdown-menu ${!newsOpen ? 'hidden' : ''}`}
            onMouseEnter={() => setNewsOpen(true)}
            onMouseLeave={() => setNewsOpen(false)}
          >
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Dernières mises à jour</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Roadmap</a>
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
      
      <div>
        <a href="#" className="text-white/80 hover:text-white text-sm">
          Retour au site principal
        </a>
      </div>
    </div>
  );
};

export default Navbar;
