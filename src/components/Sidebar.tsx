
import React from 'react';
import { Gauge, GraduationCap, HelpCircle, Hand, MessagesSquare, Sparkles, Goal, ArrowRight } from 'lucide-react';

const categories = [
  { id: 1, name: "Flight Sim News", count: 27, color: "blue", icon: <Gauge className="w-4 h-4" /> },
  { id: 2, name: "Cockpit Building", count: 81, color: "green", icon: <GraduationCap className="w-4 h-4" /> },
  { id: 3, name: "Support", count: 63, color: "red", icon: <HelpCircle className="w-4 h-4" /> },
  { id: 4, name: "Marketplace", count: 14, color: "amber", icon: <Hand className="w-4 h-4" /> },
  { id: 5, name: "Community", count: 42, color: "purple", icon: <MessagesSquare className="w-4 h-4" /> },
  { id: 6, name: "Suggestions", count: 19, color: "indigo", icon: <Sparkles className="w-4 h-4" /> },
  { id: 7, name: "User Gallery", count: 35, color: "emerald", icon: <Goal className="w-4 h-4" /> },
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
        <div className="space-y-1">
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
