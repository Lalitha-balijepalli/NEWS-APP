import React from 'react';

export function LoadingCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden 
                   border border-gray-200 dark:border-gray-700 animate-pulse">
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
      
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-16 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="w-20 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="w-full h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="w-3/4 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="w-2/3 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="w-16 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}