
import React from 'react';

const categories = [
  { id: 1, name: "Annonces", count: 12, color: "blue" },
  { id: 2, name: "Tutoriels", count: 45, color: "green" },
  { id: 3, name: "Questions", count: 78, color: "amber" },
  { id: 4, name: "Suggestions", count: 34, color: "purple" },
  { id: 5, name: "Support", count: 23, color: "red" },
  { id: 6, name: "Discussion générale", count: 56, color: "gray" },
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
    };
    return colorMap[color] || colorMap.gray;
  };

  return (
    <a href="#" className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50">
      <span className="font-medium">{category.name}</span>
      <span className={`text-xs px-2 py-1 rounded-full ${getColorClass(category.color)}`}>
        {category.count}
      </span>
    </a>
  );
};

const Sidebar = () => {
  return (
    <div className="w-64 pr-6">
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
        <div className="space-y-2 text-sm text-gray-600">
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
