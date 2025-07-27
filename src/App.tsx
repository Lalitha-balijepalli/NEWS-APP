import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { NewsCard } from './components/NewsCard';
import { LoadingCard } from './components/LoadingCard';
import { ChatBot } from './components/ChatBot';
import { BookmarkModal } from './components/BookmarkModal';
import { NewsArticle, UserPreferences } from './types/news';
import { newsApi } from './services/newsApi';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showChat, setShowChat] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<string[]>('bookmarked-articles', []);
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('user-preferences', {
    categories: ['all'],
    sources: [],
    darkMode: false,
    voiceEnabled: true
  });

  // Apply dark mode
  useEffect(() => {
    if (preferences.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences.darkMode]);

  // Load articles
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        let fetchedArticles: NewsArticle[];
        
        if (searchQuery.trim()) {
          fetchedArticles = await newsApi.searchNews(searchQuery);
        } else {
          fetchedArticles = await newsApi.getTopHeadlines(selectedCategory);
        }
        
        // Add bookmark status
        const articlesWithBookmarks = fetchedArticles.map(article => ({
          ...article,
          isBookmarked: bookmarkedIds.includes(article.id)
        }));
        
        setArticles(articlesWithBookmarks);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [selectedCategory, searchQuery, bookmarkedIds]);

  const handleToggleDarkMode = () => {
    setPreferences(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const handleBookmarkToggle = (articleId: string) => {
    setBookmarkedIds(prev => {
      const isBookmarked = prev.includes(articleId);
      if (isBookmarked) {
        return prev.filter(id => id !== articleId);
      } else {
        return [...prev, articleId];
      }
    });
  };

  const bookmarkedArticles = useMemo(() => {
    return articles.filter(article => bookmarkedIds.includes(article.id));
  }, [articles, bookmarkedIds]);

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    
    const query = searchQuery.toLowerCase();
    return articles.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.description.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query)
    );
  }, [articles, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        darkMode={preferences.darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onShowBookmarks={() => setShowBookmarks(true)}
        onShowChat={() => setShowChat(true)}
      />
      
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {searchQuery 
              ? `Search results for "${searchQuery}"` 
              : selectedCategory === 'all' 
                ? 'Latest News' 
                : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News`
            }
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {loading 
              ? 'Loading latest articles...' 
              : `${filteredArticles.length} articles found`
            }
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }, (_, i) => <LoadingCard key={i} />)
            : filteredArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onBookmarkToggle={handleBookmarkToggle}
                />
              ))
          }
        </div>
        
        {!loading && filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No articles found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery 
                ? 'Try adjusting your search terms or browse different categories.' 
                : 'No articles available in this category at the moment.'
              }
            </p>
          </div>
        )}
      </main>
      
      <ChatBot
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        articles={articles}
      />
      
      <BookmarkModal
        isOpen={showBookmarks}
        onClose={() => setShowBookmarks(false)}
        bookmarkedArticles={bookmarkedArticles}
        onBookmarkToggle={handleBookmarkToggle}
      />
    </div>
  );
}

export default App;