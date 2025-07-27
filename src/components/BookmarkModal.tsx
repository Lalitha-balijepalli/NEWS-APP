import React from 'react';
import { X, Bookmark } from 'lucide-react';
import { NewsArticle } from '../types/news';
import { NewsCard } from './NewsCard';

interface BookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: NewsArticle[];
  onBookmarkToggle: (articleId: string) => void;
}

export function BookmarkModal({ 
  isOpen, 
  onClose, 
  bookmarkedArticles, 
  onBookmarkToggle 
}: BookmarkModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl h-96 
                     flex flex-col border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Bookmark className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Bookmarked Articles
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {bookmarkedArticles.length} articles saved
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                     dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800
                     rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {bookmarkedArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Bookmark className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No bookmarks yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Start bookmarking articles to read them later
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {bookmarkedArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onBookmarkToggle={onBookmarkToggle}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}