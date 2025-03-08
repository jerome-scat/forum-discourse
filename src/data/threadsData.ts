
export const categories = [
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

export const availableTags = [
  { id: 1, name: "Amazon FBA", color: "sky" },
  { id: 2, name: "Amazon FBM", color: "rose" },
  { id: 3, name: "Seller Central", color: "emerald" },
  { id: 4, name: "PPC", color: "indigo" },
  { id: 5, name: "Helium10", color: "amber" },
  { id: 6, name: "Retail Arbitrage", color: "purple" },
];

export const allThreads = [
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
