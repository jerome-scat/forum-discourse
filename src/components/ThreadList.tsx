
import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { MessageCircle, Eye, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Données factices pour les fils de discussion
const allThreads = [
  {
    id: 1,
    title: "Comment optimiser votre tableau de bord ?",
    author: {
      name: "Jean Dupont",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    date: "Il y a 2 heures",
    replies: 12,
    views: 89,
    category: "Tutoriels",
    excerpt: "Découvrez les meilleures pratiques pour configurer votre tableau de bord et maximiser votre productivité...",
    lastActivity: "Il y a 30 minutes",
    participants: [
      { name: "Marie Curie", avatar: "https://i.pravatar.cc/150?img=5" },
      { name: "Pierre Martin", avatar: "https://i.pravatar.cc/150?img=8" },
      { name: "Sophie Leblanc", avatar: "https://i.pravatar.cc/150?img=9" }
    ]
  },
  {
    id: 2,
    title: "Nouvelle mise à jour v2.5 - Ce qui change",
    author: {
      name: "Admin",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    date: "Hier",
    replies: 34,
    views: 215,
    category: "Annonces",
    excerpt: "La nouvelle version apporte des fonctionnalités très attendues comme l'intégration avec des outils externes...",
    lastActivity: "Il y a 2 heures",
    participants: [
      { name: "Julien Dubois", avatar: "https://i.pravatar.cc/150?img=12" },
      { name: "Emilie Blanc", avatar: "https://i.pravatar.cc/150?img=13" },
      { name: "Thomas Noir", avatar: "https://i.pravatar.cc/150?img=14" },
      { name: "Claire Rouge", avatar: "https://i.pravatar.cc/150?img=15" }
    ]
  },
  {
    id: 3,
    title: "Problème de connexion aux données externes",
    author: {
      name: "Sophie Martin",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    date: "Il y a 3 jours",
    replies: 8,
    views: 67,
    category: "Support",
    excerpt: "Je rencontre un problème lors de la tentative de connexion à mon API externe. Le message d'erreur indique...",
    lastActivity: "Hier",
    participants: [
      { name: "Admin", avatar: "https://i.pravatar.cc/150?img=2" },
      { name: "Pierre Blanc", avatar: "https://i.pravatar.cc/150?img=16" }
    ]
  },
  {
    id: 4,
    title: "Suggestion : Ajouter un mode sombre",
    author: {
      name: "Pierre Leblanc",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    date: "La semaine dernière",
    replies: 21,
    views: 104,
    category: "Suggestions",
    excerpt: "Il serait vraiment utile d'avoir un mode sombre pour réduire la fatigue oculaire lors de l'utilisation nocturne...",
    lastActivity: "Il y a 2 jours",
    participants: [
      { name: "Admin", avatar: "https://i.pravatar.cc/150?img=2" },
      { name: "Marie Curie", avatar: "https://i.pravatar.cc/150?img=5" },
      { name: "Jean Dupont", avatar: "https://i.pravatar.cc/150?img=1" }
    ]
  },
  {
    id: 5,
    title: "Comment utiliser les nouvelles fonctionnalités de rapport ?",
    author: {
      name: "Marie Durand",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    date: "Il y a 2 semaines",
    replies: 15,
    views: 122,
    category: "Tutoriels",
    excerpt: "Les nouveaux rapports personnalisés offrent beaucoup de possibilités, voici un guide pas à pas pour créer...",
    lastActivity: "Il y a 4 jours",
    participants: [
      { name: "Jean Dupont", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Admin", avatar: "https://i.pravatar.cc/150?img=2" }
    ]
  },
  {
    id: 6,
    title: "Retour d'expérience après 1 mois d'utilisation",
    author: {
      name: "Thomas Martin",
      avatar: "https://i.pravatar.cc/150?img=10"
    },
    date: "Il y a 3 semaines",
    replies: 28,
    views: 143,
    category: "Retours d'expérience",
    excerpt: "Après un mois d'utilisation intensive, voici mes impressions et quelques astuces que j'ai découvertes...",
    lastActivity: "Il y a 1 semaine",
    participants: [
      { name: "Jean Dupont", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Sophie Leblanc", avatar: "https://i.pravatar.cc/150?img=9" }
    ]
  },
  {
    id: 7,
    title: "Problème avec l'exportation PDF",
    author: {
      name: "Claire Dubois",
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    date: "Il y a 1 mois",
    replies: 7,
    views: 53,
    category: "Support",
    excerpt: "L'exportation en PDF de mes rapports ne fonctionne pas correctement, les graphiques sont déformés...",
    lastActivity: "Il y a 2 semaines",
    participants: [
      { name: "Admin", avatar: "https://i.pravatar.cc/150?img=2" },
      { name: "Pierre Martin", avatar: "https://i.pravatar.cc/150?img=8" }
    ]
  },
  {
    id: 8,
    title: "Nouveaux templates disponibles",
    author: {
      name: "Admin",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    date: "Il y a 2 mois",
    replies: 19,
    views: 98,
    category: "Annonces",
    excerpt: "Nous avons ajouté 5 nouveaux templates pour vos rapports mensuels, disponibles dès maintenant...",
    lastActivity: "Il y a 3 semaines",
    participants: [
      { name: "Jean Dupont", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Marie Durand", avatar: "https://i.pravatar.cc/150?img=5" },
      { name: "Thomas Martin", avatar: "https://i.pravatar.cc/150?img=10" }
    ]
  }
];

// Composant pour un fil de discussion individuel
const ThreadCard = ({ thread }: { thread: any }) => {
  return (
    <div className="thread-card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-grow">
          <h3 className="text-lg font-medium text-gray-900 mb-1">{thread.title}</h3>
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">{thread.category}</span>
            <span className="text-gray-500 text-sm opacity-70">Discussion créée {thread.date.toLowerCase()}</span>
          </div>
          <p className="text-gray-600 text-sm mb-3">{thread.excerpt}</p>
          <div className="flex items-center text-gray-500 text-sm">
            <div className="flex items-center mr-4">
              <Avatar className="h-6 w-6 mr-2">
                <img src={thread.author.avatar} alt={thread.author.name} />
              </Avatar>
              <span>Par <a href="#" className="text-[#edb067] hover:underline">{thread.author.name}</a></span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          {/* Participants */}
          <div className="hidden md:flex items-center">
            <div className="flex -space-x-2">
              {thread.participants.slice(0, 3).map((participant: any, index: number) => (
                <Avatar key={index} className="h-8 w-8 border-2 border-white">
                  <img src={participant.avatar} alt={participant.name} />
                </Avatar>
              ))}
              {thread.participants.length > 3 && (
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-xs text-gray-600 border-2 border-white">
                  +{thread.participants.length - 3}
                </div>
              )}
            </div>
          </div>
          
          {/* Réponses */}
          <div className="flex items-center">
            <MessageCircle size={16} className="text-gray-400 mr-1" />
            <span className="text-sm text-gray-600">{thread.replies}</span>
          </div>
          
          {/* Vues */}
          <div className="flex items-center">
            <Eye size={16} className="text-gray-400 mr-1" />
            <span className="text-sm text-gray-600">{thread.views}</span>
          </div>
          
          {/* Activité */}
          <div className="hidden md:flex items-center">
            <Clock size={16} className="text-gray-400 mr-1" />
            <span className="text-sm text-gray-600 opacity-70">{thread.lastActivity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant principal pour la liste des fils de discussion
const ThreadList = () => {
  const [threads, setThreads] = useState(allThreads.slice(0, 5));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMoreThreads = () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    // Simuler un délai de chargement
    setTimeout(() => {
      const currentSize = threads.length;
      const nextThreads = allThreads.slice(currentSize, currentSize + 3);
      
      if (nextThreads.length > 0) {
        setThreads(prevThreads => [...prevThreads, ...nextThreads]);
      }
      
      if (currentSize + nextThreads.length >= allThreads.length) {
        setHasMore(false);
      }
      
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreThreads();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, loading, threads]);

  return (
    <div className="my-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Discussions récentes</h2>
        <p className="text-gray-600">
          Rejoignez les conversations ou démarrez un{" "}
          <Link to="/create-thread" className="text-[#edb067] hover:underline">
            nouveau sujet
          </Link>
        </p>
      </div>
      
      <div className="space-y-4">
        {threads.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
      
      {hasMore && (
        <div 
          ref={loaderRef} 
          className="mt-8 text-center py-4"
        >
          {loading ? (
            <div className="flex justify-center items-center space-x-2">
              <div className="w-2 h-2 bg-[#edb067] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#edb067] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-[#edb067] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          ) : (
            <span className="text-gray-500">Faites défiler pour voir plus</span>
          )}
        </div>
      )}
      
      {!hasMore && (
        <div className="mt-8 text-center">
          <span className="text-gray-500">Toutes les discussions ont été chargées</span>
        </div>
      )}
    </div>
  );
};

export default ThreadList;
