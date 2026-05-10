import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, BookOpen, AlertCircle, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content:
        "Hello! I'm MediGuide AI, powered by Gemma 4. I'm here to help with symptom analysis, treatment recommendations, and medical questions. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (Replace with actual Ollama API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: `Based on your query: "${input}"

**Analysis:**
I understand you're asking about medical information. Let me provide a comprehensive response:

**Key Points:**
• This appears to be a common medical concern
• Multiple factors could be involved
• Professional evaluation is recommended

**Recommendations:**
1. Monitor symptoms closely
2. Keep a symptom diary
3. Stay hydrated and rest
4. Consult with a healthcare provider if symptoms persist

**When to Seek Immediate Care:**
⚠️ Severe or worsening symptoms
⚠️ Difficulty breathing
⚠️ Chest pain or pressure
⚠️ Confusion or altered consciousness

*Note: This is AI-generated guidance. Always consult qualified healthcare professionals for medical decisions.*`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto h-screen flex flex-col p-4">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-lg p-6 border-b-2 border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MediGuide AI Chat</h1>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm text-gray-600">Powered by Gemma 4 • Online</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">AI Assistant</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mx-4 mt-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900">
              <strong>Clinical Decision Support:</strong> MediGuide AI provides medical guidance based on Gemma 4. 
              Always use professional medical judgment for patient care decisions.
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white mx-4 shadow-inner">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-fade-in`}
            >
              {/* Avatar */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                message.role === 'user' 
                  ? 'bg-gradient-to-br from-green-500 to-green-600' 
                  : 'bg-gradient-to-br from-blue-500 to-blue-600'
              }`}>
                {message.role === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Message Content */}
              <div className={`flex-1 max-w-3xl ${message.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-700">
                    {message.role === 'user' ? 'You' : 'MediGuide AI'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                
                <div className={`rounded-2xl p-4 shadow-md ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 border border-gray-200'
                }`}>
                  <div className="prose prose-sm max-w-none">
                    {message.content.split('\n').map((line, i) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return (
                          <p key={i} className={`font-bold mb-2 ${message.role === 'user' ? 'text-white' : 'text-gray-900'}`}>
                            {line.replace(/\*\*/g, '')}
                          </p>
                        );
                      }
                      if (line.startsWith('•') || line.match(/^\d+\./)) {
                        return (
                          <p key={i} className={`ml-4 mb-1 ${message.role === 'user' ? 'text-white' : 'text-gray-800'}`}>
                            {line}
                          </p>
                        );
                      }
                      if (line.startsWith('⚠️')) {
                        return (
                          <p key={i} className={`mb-1 ${message.role === 'user' ? 'text-white' : 'text-red-600 font-medium'}`}>
                            {line}
                          </p>
                        );
                      }
                      return line ? (
                        <p key={i} className={`mb-2 ${message.role === 'user' ? 'text-white' : 'text-gray-800'}`}>
                          {line}
                        </p>
                      ) : null;
                    })}
                  </div>
                  
                  {message.role === 'assistant' && (
                    <div className="mt-3 pt-3 border-t border-gray-200 flex gap-2">
                      <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                        <BookOpen className="w-3 h-3" />
                        View Guidelines
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        Copy Response
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 shadow-md border border-gray-200">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                  <span className="text-sm text-gray-700 font-medium">AI is analyzing your query...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-b-2xl shadow-lg p-6 border-t-2 border-gray-100">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Describe symptoms, ask medical questions, or request guidance..."
              rows={3}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none text-gray-900 placeholder-gray-400"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
            <span>💡 Press Enter to send, Shift+Enter for new line</span>
            <span className="ml-auto">Connected to Ollama • Gemma 4 Model</span>
          </p>
        </div>
      </div>
    </div>
  );
}
