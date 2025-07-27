export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  source: {
    id: string;
    name: string;
  };
  author: string;
  publishedAt: string;
  category: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  summary: string[];
  isBookmarked?: boolean;
}

export interface NewsCategory {
  id: string;
  name: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface UserPreferences {
  categories: string[];
  sources: string[];
  darkMode: boolean;
  voiceEnabled: boolean;
}