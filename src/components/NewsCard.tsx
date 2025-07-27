import React, { useState } from 'react';
import { 
  Calendar, 
  User, 
  ExternalLink, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  BookmarkCheck,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { NewsArticle } from '../types/news';
import { useSpeech } from '../hooks/useSpeech';

interface NewsCardProps {
  article: NewsArticle;
  onBookmarkToggle: (articleId: string) => void;
}

export function NewsCard({ article, onBookmarkToggle }: NewsCardProps) {
  const [showFullSummary, setShowFullSummary] = useState(false);
  const { speak, stop, isSpeaking } = useSpeech();

  const handleVoiceToggle = () => {
    if (isSpeaking) {
      stop();
    } else {
      const textToSpeak = `${article.title}. ${article.description}. ${article.summary.join('. ')}`;
      speak(textToSpeak);
    }
  };

  const getSentimentIcon = () => {
    switch (article.sentiment) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getSentimentColor = () => {
    switch (article.sentiment) {
      case 'positive':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'negative':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md 
                       transition-all duration-300 overflow-hidden group
                       border border-gray-200 dark:border-gray-700">
      {article.urlToImage && (
        <div className="relative overflow-hidden">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 
                         group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 
                           bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full uppercase tracking-wide">
              {article.category}
            </span>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor()}`}>
              {getSentimentIcon()}
              <span className="capitalize">{article.sentiment}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleVoiceToggle}
              className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 
                       dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 
                       rounded-lg transition-colors duration-200"
              title={isSpeaking ? 'Stop reading' : 'Read aloud'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            
            <button
              onClick={() => onBookmarkToggle(article.id)}
              className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 
                       dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 
                       rounded-lg transition-colors duration-200"
              title={article.isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
            >
              {article.isBookmarked ? 
                <BookmarkCheck className="w-4 h-4 text-blue-600" /> : 
                <Bookmark className="w-4 h-4" />
              }
            </button>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 
                       group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {article.title}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {article.description}
        </p>
        
        {article.summary && article.summary.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              AI Summary
            </h3>
            <ul className="space-y-1">
              {(showFullSummary ? article.summary : article.summary.slice(0, 2)).map((point, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {point}
                </li>
              ))}
            </ul>
            {article.summary.length > 2 && (
              <button
                onClick={() => setShowFullSummary(!showFullSummary)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2"
              >
                {showFullSummary ? 'Show less' : `Show ${article.summary.length - 2} more points`}
              </button>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
            {article.author && (
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
            )}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {article.source.name}
            </span>
          </div>
          
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 
                     hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium
                     transition-colors duration-200"
          >
            <span>Read more</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
}