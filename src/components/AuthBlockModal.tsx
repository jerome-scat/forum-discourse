
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

interface AuthBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

const AuthBlockModal = ({ isOpen, onClose, onLogin, onRegister }: AuthBlockModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => {/* Prevent closing by clicking outside or pressing escape */}}>
      <DialogContent className="sm:max-w-md close-button-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Accès limité</DialogTitle>
          <DialogDescription className="text-center pt-4">
            Pour continuer à explorer le contenu, veuillez vous connecter ou vous inscrire.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto rounded-full border-gray-300 text-gray-700 hover:bg-gray-100"
            onClick={onLogin}
          >
            Se connecter
          </Button>
          
          <Button 
            className="w-full sm:w-auto rounded-full bg-[#edb067] hover:bg-[#e09d4e]"
            onClick={onRegister}
          >
            S'inscrire
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          En vous inscrivant, vous bénéficiez d'un accès illimité à tous nos contenus et fonctionnalités.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default AuthBlockModal;
