import { NewsArticle, ChatMessage } from '../types/news';

export const aiService = {
  async generateSummary(article: NewsArticle): Promise<string[]> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return existing summary or generate a mock one
    return article.summary || [
      'Key point extracted from the article content',
      'Important detail highlighted by AI analysis',
      'Significant implication or consequence identified',
      'Additional context or background information'
    ];
  },

  async analyzeSentiment(text: string): Promise<'positive' | 'neutral' | 'negative'> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simple sentiment analysis simulation
    const positiveWords = ['breakthrough', 'success', 'achievement', 'positive', 'growth', 'improvement'];
    const negativeWords = ['crisis', 'problem', 'decline', 'concern', 'volatility', 'uncertainty'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  },

  async answerQuestion(question: string, articles: NewsArticle[]): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('latest') || lowerQuestion.includes('recent')) {
      const latest = articles.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )[0];
      
      return `The latest news is about "${latest.title}". ${latest.description}`;
    }
    
    if (lowerQuestion.includes('technology') || lowerQuestion.includes('tech')) {
      const techArticles = articles.filter(a => a.category === 'technology');
      if (techArticles.length > 0) {
        return `Here are the latest technology updates: ${techArticles.map(a => a.title).join(', ')}. The most significant development is in AI and quantum computing.`;
      }
    }
    
    if (lowerQuestion.includes('health')) {
      const healthArticles = articles.filter(a => a.category === 'health');
      if (healthArticles.length > 0) {
        return `Recent health news includes: ${healthArticles[0].title}. ${healthArticles[0].summary[0]}`;
      }
    }
    
    return `Based on current news articles, I can help you with information about technology, health, politics, sports, and business. What specific topic would you like to know about?`;
  }
};