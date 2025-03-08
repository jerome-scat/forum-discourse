
import React from 'react';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ThreadList from '@/components/ThreadList';
import AuthBlockModal from '@/components/AuthBlockModal';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const Index = () => {
  const { isAuthenticated, login, showAuthModal, setShowAuthModal } = useAuth();
  
  // Function to handle contact link click
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Redirect to discourse direct message URL
    window.location.href = 'https://community.cockpitlab.com/new-message?username=Jerome';
  };

  const handleLoginClick = () => {
    login();
  };

  const handleRegisterClick = () => {
    login(); // For now, both login and register just authenticate the user
  };

  const handleCloseModal = () => {
    setShowAuthModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Header />
      
      <div className="container mx-auto px-4 py-6 flex-grow">
        <div className="flex flex-col md:flex-row gap-0">
          <div className="md:w-80 lg:w-96 order-2 md:order-1">
            <Sidebar />
          </div>
          <div className="flex-grow order-1 md:order-2">
            {/* Titre et paragraphe déplacés ici, au-dessus de ThreadList */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Discussions récentes</h2>
              <p className="text-gray-600">
                Rejoignez les conversations ou démarrez un{" "}
                <Link to="/create-thread" className="text-[#edb067] hover:underline">
                  nouveau sujet
                </Link>
              </p>
            </div>
            <ThreadList />
          </div>
        </div>
      </div>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <p className="text-gray-600 text-sm">© 2023 CockpitLab. Tous droits réservés.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Conditions d'utilisation</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Politique de confidentialité</a>
              <a href="#" onClick={handleContactClick} className="text-gray-600 hover:text-gray-900 text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de blocage d'accès */}
      <AuthBlockModal 
        isOpen={!isAuthenticated && showAuthModal}
        onClose={handleCloseModal}
        onLogin={handleLoginClick}
        onRegister={handleRegisterClick}
      />
    </div>
  );
};

export default Index;
