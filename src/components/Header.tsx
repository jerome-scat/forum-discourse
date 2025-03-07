
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header flex items-center justify-between sticky top-0 z-10 bg-white shadow-sm py-4 px-4">
      {/* Logo */}
      <div className="flex-shrink-0">
        <a href="/" className="text-xl font-bold">CockpitLab</a>
      </div>
      
      {/* Barre de recherche - hidden on mobile, visible on md screens and up */}
      <div className="search-container mx-4 flex-grow max-w-md relative hidden md:block">
        <div className="relative">
          <Input 
            type="text" 
            placeholder="Rechercher..." 
            className="search-bar pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>
      
      {/* Desktop buttons - hidden on mobile */}
      <div className="hidden md:flex items-center space-x-4">
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

      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md focus:outline-none"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu - overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-4 md:hidden">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Rechercher..." 
              className="search-bar pl-10 pr-4 py-2 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <Button 
            variant="outline" 
            className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100 w-full"
          >
            Se connecter
          </Button>
          <Button className="rounded-full bg-[#edb067] hover:bg-[#e09d4e] w-full">
            S'inscrire
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
