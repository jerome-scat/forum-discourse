
import React from 'react';
import { Package, BarChart, Ship, BookOpen, Shirt, Code, ShoppingBag, Flag, Link, Store, Terminal } from 'lucide-react';

const categories = [
  { id: 1, name: "Vendre sur Amazon", count: 86, color: "amber", icon: <Package className="w-4 h-4" /> },
  { id: 2, name: "Comptabilité / Facturation", count: 42, color: "blue", icon: <BarChart className="w-4 h-4" /> },
  { id: 3, name: "Import / Export", count: 38, color: "emerald", icon: <Ship className="w-4 h-4" /> },
  { id: 4, name: "Amazon KDP", count: 54, color: "orange", icon: <BookOpen className="w-4 h-4" /> },
  { id: 5, name: "Amazon Merch On Demand", count: 47, color: "pink", icon: <Shirt className="w-4 h-4" /> },
  { id: 6, name: "WordPress", count: 29, color: "blue", icon: <Code className="w-4 h-4" /> },
  { id: 7, name: "Shopify", count: 64, color: "green", icon: <ShoppingBag className="w-4 h-4" /> },
  { id: 8, name: "Growth Hacking", count: 33, color: "purple", icon: <Flag className="w-4 h-4" /> },
  { id: 9, name: "SEO", count: 59, color: "indigo", icon: <Link className="w-4 h-4" /> },
  { id: 10, name: "Vendre sur Rakuten", count: 18, color: "red", icon: <Store className="w-4 h-4" /> },
  { id: 11, name: "Vendre sur LaRedoute", count: 15, color: "rose", icon: <Store className="w-4 h-4" /> },
  { id: 12, name: "Vendre sur ManoMano", count: 21, color: "cyan", icon: <Store className="w-4 h-4" /> },
  { id: 13, name: "Vendre sur BackMarket", count: 16, color: "teal", icon: <Store className="w-4 h-4" /> },
  { id: 14, name: "Vendre sur Fnac", count: 23, color: "yellow", icon: <Store className="w-4 h-4" /> },
  { id: 15, name: "Vendre sur Cdiscount", count: 27, color: "blue", icon: <Store className="w-4 h-4" /> },
  { id: 16, name: "Amazon MWS-SP API (Développeur)", count: 31, color: "gray", icon: <Terminal className="w-4 h-4" /> },
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
    <a href="#" className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 group">
      <span className="font-medium flex items-center gap-2">
        <span className={`text-${category.color}-600`}>
          {category.icon}
        </span>
        {category.name}
      </span>
      <div className="flex items-center">
        <span className={`text-xs px-2 py-1 rounded-full ${getColorClass(category.color)}`}>
          {category.count}
        </span>
        <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />
      </div>
    </a>
  );
};

const Sidebar = () => {
  return (
    <div className="w-full md:w-64 md:pr-6">
      <div className="mb-6">
        <button className="w-full btn btn-primary flex items-center justify-center">
          Nouvelle discussion
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <h3 className="font-medium text-gray-900 mb-3">Catégories</h3>
        <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
          {categories.map(category => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mt-4">
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
