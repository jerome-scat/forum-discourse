
import React from 'react';

const Navbar = () => {
  // This component should only show in Lovable preview, not in Discourse
  const isLovablePreview = window.location.hostname.includes('lovable');
  
  if (!isLovablePreview) {
    return null;
  }
  
  return (
    <nav className="cockpitlab-topnav">
      <div className="cockpitlab-topnav-container">
        <div className="flex space-x-4">
          <div className="dropdown-container">
            <button className="text-white hover:underline">Réseaux sociaux</button>
            <div className="dropdown-menu hidden absolute bg-white shadow-lg mt-2 py-2 rounded-lg">
              <a href="https://youtube.com" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Youtube</a>
              <a href="https://instagram.com" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Instagram</a>
              <a href="https://linkedin.com" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">LinkedIn</a>
            </div>
          </div>
          <div className="dropdown-container">
            <button className="text-white hover:underline">Liens Utiles</button>
            <div className="dropdown-menu hidden absolute bg-white shadow-lg mt-2 py-2 rounded-lg">
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Amazon Seller Central</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Avask</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">GS1</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Doug's Compta</a>
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="dropdown-container">
            <button className="text-white hover:underline">Formations</button>
            <div className="dropdown-menu hidden absolute bg-white shadow-lg mt-2 py-2 rounded-lg">
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Amazon FBA IMPACT</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Oseille TV</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Liberté Digitale</a>
            </div>
          </div>
          <div className="dropdown-container">
            <button className="text-white hover:underline">Outils</button>
            <div className="dropdown-menu hidden absolute bg-white shadow-lg mt-2 py-2 rounded-lg">
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Helium 10</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Keepa</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">SellerAMP</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">BuyBotPro</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">SellerBoard</a>
            </div>
          </div>
          <a href="https://cockpitlab.com" className="text-white hover:underline">Retour au site principal</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
