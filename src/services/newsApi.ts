import { NewsArticle } from '../types/news';

// Mock data for demonstration since NewsAPI requires an API key
const mockArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Revolutionary AI Technology Transforms Healthcare Diagnostics',
    description: 'New artificial intelligence system achieves 95% accuracy in early disease detection, potentially saving millions of lives worldwide.',
    content: 'A groundbreaking AI system developed by researchers has demonstrated unprecedented accuracy in medical diagnostics...',
    url: 'https://example.com/ai-healthcare',
    urlToImage: 'https://images.pexels.com/photos/3825584/pexels-photo-3825584.jpeg?auto=compress&cs=tinysrgb&w=800',
    source: { id: 'tech-news', name: 'Tech News Daily' },
    author: 'Dr. Sarah Johnson',
    publishedAt: '2025-01-08T10:30:00Z',
    category: 'technology',
    sentiment: 'positive',
    summary: [
      'AI system achieves 95% accuracy in disease detection',
      'Technology can identify conditions weeks before traditional methods',
      'Clinical trials show significant reduction in false positives',
      'Expected to be available in hospitals within 18 months'
    ]
  },
  {
    id: '2',
    title: 'Global Climate Summit Reaches Historic Agreement on Carbon Emissions',
    description: 'World leaders commit to ambitious new targets for reducing greenhouse gas emissions by 2030.',
    content: 'In a landmark decision at the Global Climate Summit, 195 countries have agreed to binding targets...',
    url: 'https://example.com/climate-summit',
    urlToImage: 'https://images.pexels.com/photos/1647976/pexels-photo-1647976.jpeg?auto=compress&cs=tinysrgb&w=800',
    source: { id: 'reuters', name: 'Reuters' },
    author: 'Michael Chen',
    publishedAt: '2025-01-08T08:15:00Z',
    category: 'politics',
    sentiment: 'positive',
    summary: [
      '195 countries agree to binding emission reduction targets',
      'New funding mechanism for developing nations established',
      'Target to reduce global emissions by 50% by 2030',
      'Historic breakthrough in international climate cooperation'
    ]
  },
  {
    id: '3',
    title: 'Major Breakthrough in Quantum Computing Achieved by Research Team',
    description: 'Scientists demonstrate stable quantum processor that operates at room temperature, marking a significant leap forward.',
    content: 'A team of quantum physicists has successfully created a quantum processor that maintains coherence...',
    url: 'https://example.com/quantum-computing',
    urlToImage: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
    source: { id: 'science-daily', name: 'Science Daily' },
    author: 'Prof. Anna Martinez',
    publishedAt: '2025-01-08T06:00:00Z',
    category: 'technology',
    sentiment: 'positive',
    summary: [
      'Room temperature quantum processor successfully demonstrated',
      'Breakthrough could accelerate practical quantum computing',
      'Maintains quantum coherence for unprecedented duration',
      'Opens possibilities for widespread quantum applications'
    ]
  },
  {
    id: '4',
    title: 'Olympic Champion Announces Retirement After Successful Career',
    description: 'Three-time gold medalist decides to step away from competitive sports to focus on coaching young athletes.',
    content: 'After a stellar career spanning over a decade, Olympic champion...',
    url: 'https://example.com/olympic-retirement',
    urlToImage: 'https://images.pexels.com/photos/863998/pexels-photo-863998.jpeg?auto=compress&cs=tinysrgb&w=800',
    source: { id: 'sports-news', name: 'Sports Network' },
    author: 'James Rodriguez',
    publishedAt: '2025-01-07T20:45:00Z',
    category: 'sports',
    sentiment: 'neutral',
    summary: [
      'Three-time Olympic gold medalist announces retirement',
      'Plans to establish coaching academy for young athletes',
      'Career highlights include world records and championship titles',
      'Will remain involved in sports through mentorship programs'
    ]
  },
  {
    id: '5',
    title: 'New Study Reveals Benefits of Mediterranean Diet for Brain Health',
    description: 'Comprehensive research shows significant cognitive improvements in adults following Mediterranean dietary patterns.',
    content: 'A large-scale study involving 10,000 participants over five years has demonstrated...',
    url: 'https://example.com/mediterranean-diet',
    urlToImage: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    source: { id: 'health-today', name: 'Health Today' },
    author: 'Dr. Maria Gonzalez',
    publishedAt: '2025-01-07T14:20:00Z',
    category: 'health',
    sentiment: 'positive',
    summary: [
      'Mediterranean diet linked to 40% reduced cognitive decline',
      'Study followed 10,000 participants over five years',
      'Significant improvements in memory and concentration',
      'Diet rich in omega-3s and antioxidants shows protective effects'
    ]
  },
  {
    id: '6',
    title: 'Stock Markets Experience Volatility Amid Economic Uncertainty',
    description: 'Global markets show mixed signals as investors react to changing economic indicators and policy announcements.',
    content: 'Financial markets around the world are experiencing increased volatility...',
    url: 'https://example.com/market-volatility',
    urlToImage: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=800',
    source: { id: 'financial-times', name: 'Financial Times' },
    author: 'Robert Kim',
    publishedAt: '2025-01-07T12:30:00Z',
    category: 'business',
    sentiment: 'negative',
    summary: [
      'Global markets show increased volatility this week',
      'Technology stocks lead decline with 3% average drop',
      'Economic uncertainty drives investor caution',
      'Analysts predict continued turbulence in coming weeks'
    ]
  }
];

export const newsApi = {
  async getTopHeadlines(category?: string): Promise<NewsArticle[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (category && category !== 'all') {
      return mockArticles.filter(article => article.category === category);
    }
    
    return mockArticles;
  },

  async searchNews(query: string): Promise<NewsArticle[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const lowercaseQuery = query.toLowerCase();
    return mockArticles.filter(article => 
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.description.toLowerCase().includes(lowercaseQuery) ||
      article.content.toLowerCase().includes(lowercaseQuery)
    );
  },

  async getNewsByCategory(category: string): Promise<NewsArticle[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockArticles.filter(article => article.category === category);
  }
};