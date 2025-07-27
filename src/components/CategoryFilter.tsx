import React from 'react';
import { 
  Globe, 
  Cpu, 
  Users, 
  Activity, 
  TrendingUp, 
  Trophy,
  Briefcase
} from 'lucide-react';

const categories = [
  { id: 'all', name: 'All News', icon: Globe },
  { id: 'technology', name: 'Technology', icon: Cpu },
  { id: 'politics', name: 'Politics', icon: Users },
  { id: 'health', name: 'Health', icon: Activity },
  { id: 'business', name: 'Business', icon: Briefcase },
  { id: 'sports', name: 'Sports', icon: Trophy },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 py-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap
                         transition-all duration-200 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}