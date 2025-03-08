
import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { MessageCircle, Eye, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';
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
    tags: [{ id: 4, name: "PPC", color: "indigo" }, { id: 5, name: "Helium10", color: "amber" }],
    excerpt: "Découvrez les meilleures pratiques pour configurer votre tableau de bord et maximiser votre productivité...",
    lastActivity: "Il y a 30 minutes",
    participants: [
      { name: "Marie Curie", avatar: "https://i.pravatar.cc/150?img=5" },
      { name: "Pierre Martin", avatar: "https://i.pravatar.cc/150?img=8" },
      { name: "Sophie Leblanc", avatar: "https://i.pravatar.cc/150?img=9" }
    ],
    upvotes: 7,
    downvotes: 0
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
    tags: [{ id: 6, name: "Retail Arbitrage", color: "purple" }],
    excerpt: "La nouvelle version apporte des fonctionnalités très attendues comme l'intégration avec des outils externes...",
    lastActivity: "Il y a 2 heures",
    participants: [
      { name: "Julien Dubois", avatar: "https://i.pravatar.cc/150?img=12" },
      { name: "Emilie Blanc", avatar: "https://i.pravatar.cc/150?img=13" },
      { name: "Thomas Noir", avatar: "https://i.pravatar.cc/150?img=14" },
      { name: "Claire Rouge", avatar: "https://i.pravatar.cc/150?img=15" }
    ],
    upvotes: 12,
    downvotes: 2
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
    tags: [{ id: 1, name: "Amazon FBA", color: "sky" }, { id: 3, name: "Seller Central", color: "emerald" }],
    excerpt: "Je rencontre un problème lors de la tentative de connexion à mon API externe. Le message d'erreur indique...",
    lastActivity: "Hier",
    participants: [
      { name: "Admin", avatar: "https://i.pravatar.cc/150?img=2" },
      { name: "Pierre Blanc", avatar: "https://i.pravatar.cc/150?img=16" }
    ],
    upvotes: 4,
    downvotes: 1
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
    ],
    upvotes: 19,
    downvotes: 0
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
    tags: [{ id: 3, name: "Seller Central", color: "emerald" }, { id: 5, name: "Helium10", color: "amber" }],
    excerpt: "Les nouveaux rapports personnalisés offrent beaucoup de possibilités, voici un guide pas à pas pour créer...",
    lastActivity: "Il y a 4 jours",
    participants: [
      { name: "Jean Dupont", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Admin", avatar: "https://i.pravatar.cc/150?img=2" }
    ],
    upvotes: 6,
    downvotes: 0
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
    tags: [{ id: 1, name: "Amazon FBA", color: "sky" }, { id: 2, name: "Amazon FBM", color: "rose" }],
    excerpt: "Après un mois d'utilisation intensive, voici mes impressions et quelques astuces que j'ai découvertes...",
    lastActivity: "Il y a 1 semaine",
    participants: [
      { name: "Jean Dupont", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Sophie Leblanc", avatar: "https://i.pravatar.cc/150?img=9" }
    ],
    upvotes: 22,
    downvotes: 3
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
    ],
    upvotes: 3,
    downvotes: 1
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
    tags: [{ id: 3, name: "Seller Central", color: "emerald" }, { id: 4, name: "PPC", color: "indigo" }],
    excerpt: "Nous avons ajouté 5 nouveaux templates pour vos rapports mensuels, disponibles dès maintenant...",
    lastActivity: "Il y a 3 semaines",
    participants: [
      { name: "Jean Dupont", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Marie Durand", avatar: "https://i.pravatar.cc/150?img=5" },
      { name: "Thomas Martin", avatar: "https://i.pravatar.cc/150?img=10" }
    ],
    upvotes: 15,
    downvotes: 0
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
  const [upvotes, setUpvotes] = useState(thread.upvotes || 0);
  const [downvotes, setDownvotes] = useState(thread.downvotes || 0);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const handleUpvote = () => {
    if (userVote === 'up') {
      setUpvotes(prev => prev - 1);
      setUserVote(null);
    } else {
      setUpvotes(prev => prev + 1);
      if (userVote === 'down') {
        setDownvotes(prev => prev - 1);
      }
      setUserVote('up');
    }
  };

  const handleDownvote = () => {
    if (userVote === 'down') {
      setDownvotes(prev => prev - 1);
      setUserVote(null);
    } else {
      setDownvotes(prev => prev + 1);
      if (userVote === 'up') {
        setUpvotes(prev => prev - 1);
      }
      setUserVote('down');
    }
  };

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
            
            <div className="flex items-center space-x-3 ml-2">
              <button 
                onClick={handleUpvote}
                className={`flex items-center gap-1 ${userVote === 'up' ? 'text-[#edb067]' : 'text-gray-500 hover:text-[#edb067]'} transition-colors`}
                aria-label="J'aime"
              >
                <ThumbsUp size={16} />
                <span>{upvotes}</span>
              </button>
              
              <button 
                onClick={handleDownvote}
                className={`flex items-center gap-1 ${userVote === 'down' ? 'text-red-500' : 'text-gray-500 hover:text-red-500'} transition-colors`}
                aria-label="Je n'aime pas"
              >
                <ThumbsDown size={16} />
                <span>{downvotes}</span>
              </button>
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

      {/* Contenu SEO avec H2 et paragraphes */}
      <div className="mt-12 space-y-8 prose max-w-none">
        <h2 className="text-2xl font-semibold text-gray-900">Guide complet pour vendre sur Amazon en 2023</h2>
        <div className="text-gray-700">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed molestie augue sit amet leo consequat posuere.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900">Les meilleures pratiques SEO pour votre boutique en ligne</h2>
        <div className="text-gray-700">
          <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta. Curabitur aliquet quam id dui posuere blandit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Nulla porttitor accumsan tincidunt. Sed porttitor lectus nibh. Donec sollicitudin molestie malesuada.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900">Optimiser vos performances sur les marketplaces internationales</h2>
        <div className="text-gray-700">
          <p>
            Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla quis lorem ut libero malesuada feugiat. Nulla quis lorem ut libero malesuada feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla quis lorem ut libero malesuada feugiat. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Sed porttitor lectus nibh.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900">Stratégies de pricing et rentabilité sur Amazon</h2>
        <div className="text-gray-700">
          <p>
            Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id dui posuere blandit. Nulla quis lorem ut libero malesuada feugiat. Nulla quis lorem ut libero malesuada feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900">Service client et satisfaction des acheteurs</h2>
        <div className="text-gray-700">
          <p>
            Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id dui posuere blandit. Nulla quis lorem ut libero malesuada feugiat. Donec sollicitudin molestie malesuada. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Cras ultricies ligula sed magna dictum porta. Donec sollicitudin molestie malesuada. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla quis lorem ut libero malesuada feugiat. Nulla quis lorem ut libero malesuada feugiat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThreadList;
