import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { MessageCircle, Eye, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: "Vendre sur Amazon", count: 86, color: "amber", emoji: "📦" },
  { id: 2, name: "Comptabilité / Facturation", count: 42, color: "blue", emoji: "📊" },
  { id: 3, name: "Import / Export", count: 38, color: "emerald", emoji: "🚢" },
  { id: 4, name: "Amazon KDP", count: 54, color: "orange", emoji: "📚" },
  { id: 5, name: "Amazon Merch On Demand", count: 47, color: "pink", emoji: "👕" },
  { id: 6, name: "WordPress", count: 29, color: "blue", emoji: "🌐" },
  { id: 7, name: "Shopify", count: 64, color: "green", emoji: "🛍️" },
  { id: 8, name: "Growth Hacking", count: 33, color: "purple", emoji: "🚀" },
  { id: 9, name: "SEO", count: 59, color: "indigo", emoji: "🔗" },
];

const availableTags = [
  { id: 1, name: "Amazon FBA", color: "sky" },
  { id: 2, name: "Amazon FBM", color: "rose" },
  { id: 3, name: "Seller Central", color: "emerald" },
  { id: 4, name: "PPC", color: "indigo" },
  { id: 5, name: "Helium10", color: "amber" },
  { id: 6, name: "Retail Arbitrage", color: "purple" },
];

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
    category: { id: 8, name: "Growth Hacking", color: "purple", emoji: "🚀" },
    tags: [availableTags[3], availableTags[4]],  // PPC, Helium10
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
    category: { id: 7, name: "Shopify", color: "green", emoji: "🛍️" },
    tags: [availableTags[5]],  // Retail Arbitrage
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
    category: { id: 1, name: "Vendre sur Amazon", color: "amber", emoji: "📦" },
    tags: [availableTags[0], availableTags[2]],  // Amazon FBA, Seller Central
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
    category: { id: 6, name: "WordPress", color: "blue", emoji: "🌐" },
    tags: [],
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
    category: { id: 2, name: "Comptabilité / Facturation", color: "blue", emoji: "📊" },
    tags: [availableTags[2], availableTags[4]],  // Seller Central, Helium10
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
    category: { id: 4, name: "Amazon KDP", color: "orange", emoji: "📚" },
    tags: [availableTags[0], availableTags[1]],  // Amazon FBA, Amazon FBM
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
    category: { id: 9, name: "SEO", color: "indigo", emoji: "🔗" },
    tags: [],
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
    category: { id: 3, name: "Import / Export", color: "emerald", emoji: "🚢" },
    tags: [availableTags[2], availableTags[3]],  // Seller Central, PPC
    excerpt: "Nous avons ajouté 5 nouveaux templates pour vos rapports mensuels, disponibles dès maintenant...",
    lastActivity: "Il y a 3 semaines",
    participants: [
      { name: "Jean Dupont", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Marie Durand", avatar: "https://i.pravatar.cc/150?img=5" },
      { name: "Thomas Martin", avatar: "https://i.pravatar.cc/150?img=10" }
    ]
  }
];

const getCategoryColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    amber: "bg-amber-100 text-amber-800",
    purple: "bg-purple-100 text-purple-800",
    red: "bg-red-100 text-red-800",
    gray: "bg-gray-100 text-gray-800",
    indigo: "bg-indigo-100 text-indigo-800",
    emerald: "bg-emerald-100 text-emerald-800",
    orange: "bg-orange-100 text-orange-800",
    pink: "bg-pink-100 text-pink-800",
    rose: "bg-rose-100 text-rose-800",
    cyan: "bg-cyan-100 text-cyan-800",
    teal: "bg-teal-100 text-teal-800",
    yellow: "bg-yellow-100 text-yellow-800",
    sky: "bg-sky-100 text-sky-800",
  };
  return colorMap[color] || colorMap.gray;
};

const ThreadCard = ({ thread }: { thread: any }) => {
  return (
    <div className="thread-card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-grow">
          <h3 className="text-lg font-medium text-gray-900 mb-1">{thread.title}</h3>
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-0.5 flex items-center gap-1 text-xs rounded-full ${getCategoryColorClass(thread.category.color)}`}>
              <span>{thread.category.emoji}</span>
              {thread.category.name}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-3">{thread.excerpt}</p>
          <div className="flex items-center text-gray-500 text-sm">
            <div className="flex items-center mr-4">
              <Avatar className="h-6 w-6 mr-2">
                <img src={thread.author.avatar} alt={thread.author.name} />
              </Avatar>
              <span>Par <a href="#" className="text-[#edb067] hover:underline">{thread.author.name}</a> <span className="text-gray-500 opacity-70">• {thread.date.toLowerCase()}</span></span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
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
          
          <div className="flex items-center">
            <MessageCircle size={16} className="text-gray-400 mr-1" />
            <span className="text-sm text-gray-600">{thread.replies}</span>
          </div>
          
          <div className="flex items-center">
            <Eye size={16} className="text-gray-400 mr-1" />
            <span className="text-sm text-gray-600">{thread.views}</span>
          </div>
          
          <div className="hidden md:flex items-center">
            <Clock size={16} className="text-gray-400 mr-1" />
            <span className="text-sm text-gray-600 opacity-70">{thread.lastActivity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ThreadList = () => {
  const [threads, setThreads] = useState(allThreads.slice(0, 5));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMoreThreads = () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
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
