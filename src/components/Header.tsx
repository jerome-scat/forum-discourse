
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="header flex items-center justify-between">
      {/* Logo */}
      <div className="flex-shrink-0">
        <a href="/" className="text-xl font-bold">CockpitLab</a>
      </div>
      
      {/* Barre de recherche */}
      <div className="search-container mx-4 flex-grow max-w-md relative">
        <div className="relative">
          <Input 
            type="text" 
            placeholder="Rechercher..." 
            className="search-bar pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>
      
      {/* Boutons d'action */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Se connecter
        </Button>
        <Button className="rounded-full bg-[#edb067] hover:bg-[#e09d4e]">
          S'inscrire
        </Button>
      </div>
    </header>
  );
};

export default Header;
