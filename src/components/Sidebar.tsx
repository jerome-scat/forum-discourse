import React from 'react';
import { Tag as TagIcon } from 'lucide-react';

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
  { id: 10, name: "Vendre sur Rakuten", count: 18, color: "red", emoji: "🏪" },
  { id: 11, name: "Vendre sur LaRedoute", count: 15, color: "rose", emoji: "🛒" },
  { id: 12, name: "Vendre sur ManoMano", count: 21, color: "cyan", emoji: "🔨" },
  { id: 13, name: "Vendre sur BackMarket", count: 16, color: "teal", emoji: "♻️" },
  { id: 14, name: "Vendre sur Fnac", count: 23, color: "yellow", emoji: "📀" },
  { id: 15, name: "Vendre sur Cdiscount", count: 27, color: "blue", emoji: "💼" },
  { id: 16, name: "Amazon MWS-SP API (Développeur)", count: 31, color: "gray", emoji: "💻" },
];

const tags = [
  { id: 1, name: "Amazon FBA", count: 48 },
  { id: 2, name: "Amazon FBM", count: 32 },
  { id: 3, name: "Seller Central", count: 65 },
  { id: 4, name: "PPC", count: 27 },
  { id: 5, name: "Helium10", count: 19 },
  { id: 6, name: "Retail Arbitrage", count: 12 },
];

const CategoryItem = ({ category }: { category: any }) => {
  const getColorClass = (color: string) => {
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
    };
    return colorMap[color] || colorMap.gray;
  };

  return (
    <a href="#" className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-gray-50">
      <span className="text-xs font-medium flex items-center gap-2">
        <span className="text-lg">{category.emoji}</span>
        {category.name}
      </span>
      <span className={`text-xs px-2 py-0.5 rounded-full ${getColorClass(category.color)}`}>
        {category.count}
      </span>
    </a>
  );
};

const TagItem = ({ tag }: { tag: any }) => {
  const getTagSize = (count: number) => {
    if (count > 50) return 'text-lg font-medium';
    if (count > 30) return 'text-base font-medium';
    if (count > 20) return 'text-sm';
    return 'text-xs';
  };

  return (
    <a href="#" className={`inline-block px-2 py-1 m-1 hover:text-[#edb067] transition-colors ${getTagSize(tag.count)}`}>
      {tag.name}
    </a>
  );
};

const Sidebar = () => {
  return (
    <div className="w-full md:w-80 lg:w-96 md:pr-6">
      <div className="mb-6">
        <button className="w-full btn btn-primary flex items-center justify-center">
          Nouvelle discussion
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-4">
        <h3 className="font-medium text-gray-900 mb-3">Catégories</h3>
        <div className="space-y-1 max-h-[40vh] overflow-y-auto pr-1">
          {categories.map(category => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-4">
        <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
          <TagIcon size={16} />
          Tags
        </h3>
        <div className="flex flex-wrap justify-center text-gray-700">
          {tags.map(tag => (
            <TagItem key={tag.id} tag={tag} />
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <h3 className="font-medium text-gray-900 mb-3">Statistiques</h3>
        <div className="grid grid-cols-2 md:block gap-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Membres:</span>
            <span className="font-medium">2,459</span>
          </div>
          <div className="flex justify-between">
            <span>Discussions:</span>
            <span className="font-medium">4,278</span>
          </div>
          <div className="flex justify-between">
            <span>Messages:</span>
            <span className="font-medium">18,652</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
