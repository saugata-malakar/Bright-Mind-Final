import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Paperclip, MoreVertical, BrainCircuit, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ── Smart Socratic Response Engine (client-side) ──────────────────────
// This simulates the backend's Agent Orchestrator + Bloom Classifier + Emotion Detector

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  meta?: { agent: string; bloom: string; emotion: string };
}

const MATH_KEYWORDS = ['add', 'subtract', 'multiply', 'divide', 'fraction', 'equation', 'algebra', 'number', 'percent', 'ratio', 'graph', 'slope', 'area', 'volume', 'angle', 'decimal', 'exponent', 'square root', 'calculus', 'geometry', 'triangle', 'circle', 'math', 'solve', 'calculate', '1/2', '1/3', '1/4', 'denominator', 'numerator', 'quadratic', 'polynomial', 'integer', 'negative', 'positive', 'x =', 'y ='];
const SCIENCE_KEYWORDS = ['science', 'biology', 'chemistry', 'physics', 'atom', 'molecule', 'cell', 'energy', 'force', 'gravity', 'photosynthesis', 'dna', 'evolution', 'experiment', 'hypothesis', 'planet', 'solar', 'element', 'reaction', 'ecosystem', 'organism'];
const HUMANITIES_KEYWORDS = ['history', 'war', 'revolution', 'literature', 'essay', 'poem', 'novel', 'character', 'theme', 'democracy', 'civilization', 'culture', 'philosophy', 'government'];
const FRUSTRATION_KEYWORDS = ["i give up", "i can't", "too hard", "don't get it", "this is stupid", "hate this", "impossible", "confused", "help me", "i'm stuck", "don't understand", "makes no sense", "ugh"];

function detectAgent(msg: string): string {
  const lower = msg.toLowerCase();
  if (MATH_KEYWORDS.some(k => lower.includes(k))) return 'Math Tutor';
  if (SCIENCE_KEYWORDS.some(k => lower.includes(k))) return 'Science Tutor';
  if (HUMANITIES_KEYWORDS.some(k => lower.includes(k))) return 'Humanities Tutor';
  return 'Meta-Cognitive Coach';
}

function detectEmotion(msg: string): string {
  const lower = msg.toLowerCase();
  if (FRUSTRATION_KEYWORDS.some(k => lower.includes(k))) return 'frustrated';
  if (['i got it', 'easy', 'i know', 'makes sense', 'of course'].some(k => lower.includes(k))) return 'confident';
  if (['boring', 'whatever', 'who cares', 'pointless'].some(k => lower.includes(k))) return 'bored';
  return 'neutral';
}

function detectBloom(msg: string): string {
  const lower = msg.toLowerCase();
  if (['what is', 'define', 'list', 'name', 'who is', 'when'].some(k => lower.includes(k))) return 'REMEMBER';
  if (['explain', 'describe', 'why', 'how does', 'what does it mean'].some(k => lower.includes(k))) return 'UNDERSTAND';
  if (['how do i', 'solve', 'calculate', 'show me', 'try'].some(k => lower.includes(k))) return 'APPLY';
  if (['compare', 'difference', 'pattern', 'relationship'].some(k => lower.includes(k))) return 'ANALYZE';
  if (['better', 'best', 'agree', 'disagree', 'evaluate'].some(k => lower.includes(k))) return 'EVALUATE';
  if (['design', 'create', 'invent', 'imagine', 'build'].some(k => lower.includes(k))) return 'CREATE';
  return 'UNDERSTAND';
}

function generateSocraticResponse(msg: string): { text: string; agent: string; bloom: string; emotion: string } {
  const agent = detectAgent(msg);
  const emotion = detectEmotion(msg);
  const bloom = detectBloom(msg);
  const lower = msg.toLowerCase();

  // Frustrated student — be extra encouraging
  if (emotion === 'frustrated') {
    return {
      text: "I can see this is challenging, and that's completely okay — it means you're pushing your brain to grow! 💪\n\nLet's take a step back and try a different approach. Instead of tackling the whole problem, let's focus on just ONE small piece.\n\nCan you tell me which specific part feels the most confusing? I'll break it down into the tiniest possible step.",
      agent, bloom, emotion
    };
  }

  // MATH — Fractions
  if (lower.includes('fraction') || lower.includes('1/2') || lower.includes('1/3') || lower.includes('denominator') || lower.includes('numerator')) {
    if (lower.includes('add') || lower.includes('plus') || (lower.includes('1/2') && lower.includes('1/3'))) {
      return {
        text: "Great question about adding fractions! Let me guide you through this step by step. 🍕\n\n**Think of it like pizza slices:**\nIf one pizza is cut into 2 slices and another into 3 slices, the slices are *different sizes*. You can't just count them together!\n\n**Key Insight:** We need to make the slices the *same size* first.\n\n🤔 **Your turn:** If you need both pizzas cut into same-sized slices, what's the smallest number of equal slices that works for BOTH 2 and 3?\n\n*Hint: Think about a number that both 2 and 3 divide into evenly.*",
        agent, bloom, emotion
      };
    }
    return {
      text: "Let's explore fractions together! 🎯\n\nA fraction has two parts:\n- **Numerator** (top) = how many pieces you HAVE\n- **Denominator** (bottom) = how many TOTAL pieces\n\n🤔 **Quick check:** If I eat 3 slices out of 8, what fraction did I eat?\n\nTry writing it out!",
      agent, bloom, emotion
    };
  }

  // MATH — Algebra / Equations
  if (lower.includes('algebra') || lower.includes('equation') || lower.includes('variable') || lower.includes('solve') || lower.includes('x =') || lower.includes('x+') || lower.includes('2x')) {
    return {
      text: "Let's think about algebra like a balance scale! ⚖️\n\nImagine a scale that's perfectly balanced. The equation sign (=) is the center point.\n\n**The golden rule:** Whatever you do to ONE side, you MUST do to the OTHER side to keep it balanced.\n\n🤔 **Try this:** If `x + 5 = 12`, what would you do to both sides to get `x` alone?\n\n*Hint: What's the opposite of adding 5?*",
      agent, bloom, emotion
    };
  }

  // MATH — General
  if (agent === 'Math Tutor') {
    return {
      text: "Interesting math question! Let's work through this together. 🔢\n\nBefore we dive in, I want to understand where you're at:\n\n1. **What do you already know** about this topic?\n2. **What specifically** is tripping you up?\n\nOnce I know your starting point, I can guide you with the perfect next step. There's no wrong answer here — I just want to meet you where you are! 🎯",
      agent, bloom, emotion
    };
  }

  // SCIENCE
  if (agent === 'Science Tutor') {
    if (lower.includes('photosynthesis')) {
      return {
        text: "Let's think about photosynthesis like a recipe! 🌱\n\n**Ingredients needed:**\n- ☀️ Sunlight (energy)\n- 💧 Water (from roots)\n- 💨 Carbon dioxide (from air)\n\n**What gets made:**\n- 🍬 Glucose (food/sugar)\n- 🫧 Oxygen (what we breathe!)\n\n🤔 **Think about this:** Why do you think plants are green? What's the special ingredient in their leaves that captures sunlight?\n\n*Hint: It starts with 'chloro-'...*",
        agent, bloom, emotion
      };
    }
    return {
      text: "Great science question! Let's use the scientific method 🔬\n\n**Step 1: Observe** — What do you already notice about this topic?\n**Step 2: Hypothesize** — What do you THINK might be happening and why?\n\nTell me your hypothesis first, and then we'll test it together! There are no wrong guesses in science — only experiments waiting to happen. 🧪",
      agent, bloom, emotion
    };
  }

  // HUMANITIES
  if (agent === 'Humanities Tutor') {
    return {
      text: "That's a fascinating topic! Let's think critically about it. 📚\n\nBefore I share my perspective, I want to hear yours:\n\n1. **What do you already know** about this?\n2. **Why do you think** it matters?\n3. **Can you think of** a modern-day parallel?\n\nHistory isn't just about memorizing dates — it's about understanding the *why* behind human decisions. What patterns do you see? 🤔",
      agent, bloom, emotion
    };
  }

  // META-COGNITIVE (default)
  return {
    text: "That's a great question! Before we dive in, let me help you figure out the best way to approach it. 🧠\n\n**The Feynman Technique:** Try explaining what you know so far in your own words, as if you were teaching a 5-year-old.\n\nWherever you get stuck explaining — that's EXACTLY where your gap is!\n\n🤔 **Try it now:** What do you already know about this topic? Even a rough idea is perfect.",
    agent, bloom, emotion
  };
}

// ── Component ─────────────────────────────────────────────────────────

export function TutorSession() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I'm CogniCore, your Socratic AI tutor. 🎓\n\nI won't just give you answers — I'll guide you to discover them yourself!\n\n**Try asking me about:**\n- Math (fractions, algebra, geometry)\n- Science (photosynthesis, forces, atoms)\n- History & Literature\n- Or even study tips!\n\nWhat would you like to learn today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    // Simulate thinking time (realistic delay)
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const result = generateSocraticResponse(currentInput);
      const aiMsg: Message = {
        id: Date.now() + 1,
        sender: 'ai',
        text: result.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        meta: { agent: result.agent, bloom: result.bloom, emotion: result.emotion },
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, delay);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-gray-50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Socratic AI Tutor</h2>
            <p className="text-xs text-gray-500">Multi-Agent · Bloom Adaptive · Emotion Aware</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.sender === 'user' ? 'bg-gray-200' : 'bg-blue-100'}`}>
                {msg.sender === 'user' ? <User className="w-4 h-4 text-gray-600" /> : <Bot className="w-4 h-4 text-blue-600" />}
              </div>
              <div className={`max-w-[75%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-gray-100 text-gray-900 rounded-tl-sm'}`}>
                  <p className="leading-relaxed whitespace-pre-wrap text-[15px]">{msg.text}</p>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs text-gray-400">{msg.timestamp}</span>
                  {msg.meta && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium">{msg.meta.agent}</span>
                      <span className="text-xs px-2 py-0.5 bg-orange-50 text-orange-600 rounded-full font-medium flex items-center gap-1">
                        <BrainCircuit className="w-3 h-3" /> {msg.meta.bloom}
                      </span>
                      {msg.meta.emotion !== 'neutral' && (
                        <span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full font-medium flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> {msg.meta.emotion}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-4 flex items-center gap-1.5">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
        <div className="flex items-end gap-2 max-w-4xl mx-auto">
          <button className="p-3 text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 rounded-xl">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about fractions, photosynthesis, history..."
              className="w-full resize-none rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 max-h-32 focus:outline-none text-[15px]"
              rows={1}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
