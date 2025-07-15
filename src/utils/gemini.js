import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY || API_KEY === 'demo-key') {
  console.warn('⚠️ Gemini API key not found. Get your key from: https://makersuite.google.com/app/apikey');
}

const genAI = API_KEY && API_KEY !== 'demo-key' ? new GoogleGenerativeAI(API_KEY) : null;

export const callGeminiAPI = async (userMessage, eventContext) => {
  // If no API key is configured, use intelligent fallbacks
  if (!genAI) {
    console.log('🔄 Using fallback responses (no Gemini API key configured)');
    return getFallbackResponse(userMessage, eventContext);
  }

  try {
    console.log('🤖 Calling Gemini AI API...');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are CampusGPT, a helpful and friendly campus assistant for students. You help students with campus events, deadlines, club activities, and general campus information.

Current Campus Events Context:
${JSON.stringify(eventContext, null, 2)}

Student Question: "${userMessage}"

Instructions:
- Be conversational and helpful
- Reference specific events from the context when relevant
- If asked about events happening "today", check the dates carefully
- For hackathons, placements, or specific event types, filter from the context
- If no relevant events found, acknowledge this and suggest alternatives
- Keep responses concise but informative
- Use emojis sparingly but appropriately
- Always maintain a friendly, student-focused tone

Provide a helpful response:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log('✅ Gemini AI response received');
    return response.text();
  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    console.log('🔄 Falling back to pattern matching...');
    return getFallbackResponse(userMessage, eventContext);
  }
};

// Helper functions
const isToday = (timestamp) => {
  if (!timestamp) return false;
  const today = new Date();
  let eventDate;
  
  if (timestamp.toDate) {
    eventDate = timestamp.toDate();
  } else {
    eventDate = new Date(timestamp);
  }
  
  return eventDate.toDateString() === today.toDateString();
};

const formatEventDate = (timestamp) => {
  if (!timestamp) return 'TBA';
  let date;
  if (timestamp.toDate) {
    date = timestamp.toDate();
  } else {
    date = new Date(timestamp);
  }
  return date.toLocaleDateString();
};

const getFallbackResponse = (userMessage, eventContext) => {
  const fallbackResponses = {
    today: `Here's what's happening today based on the events I know about:
${eventContext.filter(e => isToday(e.date)).map(e => `📅 ${e.title} at ${e.location || 'TBA'}`).join('\n') || '📭 No events scheduled for today.'}`,
    
    hackathon: eventContext.filter(e => e.title.toLowerCase().includes('hackathon')).length > 0 
      ? `🚀 Upcoming hackathons:\n${eventContext.filter(e => e.title.toLowerCase().includes('hackathon')).map(e => `• ${e.title} on ${formatEventDate(e.date)}`).join('\n')}`
      : '🔍 I don\'t see any hackathons scheduled in the current events list. Check back later or ask your coding club!',
      
    placement: eventContext.filter(e => e.title.toLowerCase().includes('placement')).length > 0
      ? `💼 Placement-related events:\n${eventContext.filter(e => e.title.toLowerCase().includes('placement')).map(e => `• ${e.title} on ${formatEventDate(e.date)}`).join('\n')}`
      : '💼 No placement drives scheduled right now. Stay updated with the career services!',
      
    default: `Hi! I'm CampusGPT, your campus assistant. I can help you with:

📅 Campus Events (${eventContext.length} events in my knowledge)
🎯 Club Activities
📚 Academic Deadlines
🏢 Placement Information

Try asking me:
• "What's happening today?"
• "When is the next hackathon?"
• "Show me placement events"
• "What events are this week?"

I'm here to help make your campus life easier! 🎓`
  };

  const lowerMessage = userMessage.toLowerCase();
  if (lowerMessage.includes('today') || lowerMessage.includes('happening')) {
    return fallbackResponses.today;
  } else if (lowerMessage.includes('hackathon')) {
    return fallbackResponses.hackathon;
  } else if (lowerMessage.includes('placement')) {
    return fallbackResponses.placement;
  } else {
    return fallbackResponses.default;
  }
}; 