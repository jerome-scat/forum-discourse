
import React from 'react';

// Données factices pour les fils de discussion
const threads = [
  {
    id: 1,
    title: "Comment optimiser votre tableau de bord ?",
    author: "Jean Dupont",
    date: "Il y a 2 heures",
    replies: 12,
    views: 89,
    category: "Tutoriels",
    excerpt: "Découvrez les meilleures pratiques pour configurer votre tableau de bord et maximiser votre productivité..."
  },
  {
    id: 2,
    title: "Nouvelle mise à jour v2.5 - Ce qui change",
    author: "Admin",
    date: "Hier",
    replies: 34,
    views: 215,
    category: "Annonces",
    excerpt: "La nouvelle version apporte des fonctionnalités très attendues comme l'intégration avec des outils externes..."
  },
  {
    id: 3,
    title: "Problème de connexion aux données externes",
    author: "Sophie Martin",
    date: "Il y a 3 jours",
    replies: 8,
    views: 67,
    category: "Support",
    excerpt: "Je rencontre un problème lors de la tentative de connexion à mon API externe. Le message d'erreur indique..."
  },
  {
    id: 4,
    title: "Suggestion : Ajouter un mode sombre",
    author: "Pierre Leblanc",
    date: "La semaine dernière",
    replies: 21,
    views: 104,
    category: "Suggestions",
    excerpt: "Il serait vraiment utile d'avoir un mode sombre pour réduire la fatigue oculaire lors de l'utilisation nocturne..."
  },
  {
    id: 5,
    title: "Comment utiliser les nouvelles fonctionnalités de rapport ?",
    author: "Marie Durand",
    date: "Il y a 2 semaines",
    replies: 15,
    views: 122,
    category: "Tutoriels",
    excerpt: "Les nouveaux rapports personnalisés offrent beaucoup de possibilités, voici un guide pas à pas pour créer..."
  }
];

// Composant pour un fil de discussion individuel
const ThreadCard = ({ thread }: { thread: any }) => {
  return (
    <div className="thread-card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">{thread.category}</span>
            <span className="text-gray-500 text-sm">{thread.date}</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">{thread.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{thread.excerpt}</p>
          <div className="flex items-center text-gray-500 text-sm">
            <span className="mr-4">Par {thread.author}</span>
            <span className="mr-4">{thread.replies} réponses</span>
            <span>{thread.views} vues</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant principal pour la liste des fils de discussion
const ThreadList = () => {
  return (
    <div className="my-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Discussions récentes</h2>
        <p className="text-gray-600">Rejoignez les conversations ou démarrez un nouveau sujet</p>
      </div>
      
      <div className="space-y-4">
        {threads.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button className="btn btn-primary">
          Voir plus de discussions
        </button>
      </div>
    </div>
  );
};

export default ThreadList;
