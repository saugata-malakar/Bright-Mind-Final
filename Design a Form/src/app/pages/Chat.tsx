import { useState } from 'react';
import { Send, Loader2, BookOpen, AlertCircle } from 'lucide-react';
import { Card, Button, Textarea, Badge, Alert } from '../components/ui-components';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content:
        "Hello! I'm MediGuide AI, your medical assistant. I'm here to help with symptom analysis, treatment recommendations, and medical questions. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: `Based on the symptoms you described, here's my analysis:

**Possible Conditions:**
1. Upper Respiratory Infection (70% likelihood)
   - Common cold or flu-like illness
   - Typically viral in nature

2. Influenza (20% likelihood)
   - Seasonal flu
   - May require antiviral treatment

3. COVID-19 (10% likelihood)
   - Requires testing for confirmation
   - Follow local health guidelines

**Recommended Actions:**
• Monitor temperature every 4 hours
• Ensure adequate rest and hydration
• Consider acetaminophen for fever (if no contraindications)
• Recommend rapid flu/COVID testing

**Warning Signs (Seek Immediate Care):**
⚠️ Difficulty breathing or shortness of breath
⚠️ Persistent chest pain or pressure
⚠️ Confusion or inability to stay awake
⚠️ Bluish lips or face

Remember: This is a clinical decision support tool. Always use your professional judgment and consider the full clinical picture.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col">
      {/* Disclaimer */}
      <Alert variant="info" className="mb-4">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 mt-0.5" />
          <div className="text-sm">
            MediGuide AI provides clinical decision support. Always use professional medical judgment for patient
            care.
          </div>
        </div>
      </Alert>

      {/* Chat Container */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl ${
                  message.role === 'user'
                    ? 'bg-[var(--medical-blue)] text-white'
                    : 'bg-gray-100 text-gray-900'
                } rounded-lg p-4`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {message.role === 'assistant' && (
                    <div className="w-6 h-6 bg-[var(--medical-blue)] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                  )}
                  <span className="text-sm font-semibold">
                    {message.role === 'user' ? 'You' : 'MediGuide AI'}
                  </span>
                  <span className={`text-xs ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className="prose prose-sm max-w-none">
                  {message.content.split('\n').map((line, i) => (
                    <p key={i} className={message.role === 'user' ? 'text-white' : 'text-gray-900'}>
                      {line}
                    </p>
                  ))}
                </div>
                {message.role === 'assistant' && (
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="ghost" className="text-xs">
                      <BookOpen className="w-3 h-3" />
                      View Guidelines
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[var(--medical-blue)]" />
                  <span className="text-sm text-gray-600">AI is analyzing...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe the symptoms, ask a question, or request medical guidance..."
              rows={3}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="self-end"
            >
              <Send className="w-4 h-4" />
              Send
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </Card>
    </div>
  );
}
