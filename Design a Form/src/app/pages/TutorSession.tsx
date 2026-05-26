import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Play, BrainCircuit, Sparkles, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ── Video Library ─────────────────────────────────────────────────────
const VIDEO_LIBRARY = [
  // Mathematics
  { id: 1, title: 'Introduction to Fractions', subject: 'Mathematics', duration: '12:34', thumbnail: '🔢', gradient: 'from-blue-500 to-indigo-600', videoUrl: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', views: '2.4M' },
  { id: 2, title: 'Basic Algebra - Solving Equations', subject: 'Mathematics', duration: '14:10', thumbnail: '📐', gradient: 'from-blue-500 to-indigo-600', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', views: '1.8M' },
  { id: 3, title: 'Geometry: Area & Perimeter', subject: 'Mathematics', duration: '10:45', thumbnail: '📏', gradient: 'from-blue-500 to-indigo-600', videoUrl: 'https://www.w3schools.com/html/movie.mp4', views: '3.2M' },
  { id: 4, title: 'Introduction to Calculus', subject: 'Mathematics', duration: '09:20', thumbnail: '📉', gradient: 'from-blue-500 to-indigo-600', videoUrl: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', views: '4.1M' },

  // Biology
  { id: 5, title: 'Photosynthesis Explained', subject: 'Biology', duration: '07:45', thumbnail: '🌱', gradient: 'from-green-500 to-emerald-600', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', views: '8.1M' },
  { id: 6, title: 'DNA & Genetics', subject: 'Biology', duration: '08:50', thumbnail: '🧬', gradient: 'from-green-500 to-emerald-600', videoUrl: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', views: '6.5M' },
  { id: 7, title: 'The Immune System', subject: 'Biology', duration: '09:12', thumbnail: '🛡️', gradient: 'from-green-500 to-emerald-600', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', views: '5.3M' },
  { id: 8, title: 'Cell Structure and Function', subject: 'Biology', duration: '07:44', thumbnail: '🔬', gradient: 'from-green-500 to-emerald-600', videoUrl: 'https://www.w3schools.com/html/movie.mp4', views: '4.8M' },

  // Physics
  { id: 9, title: "Newton's 1st Law of Motion", subject: 'Physics', duration: '06:20', thumbnail: '🚀', gradient: 'from-orange-500 to-red-500', videoUrl: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', views: '5.7M' },
  { id: 10, title: 'What is Gravity?', subject: 'Physics', duration: '04:14', thumbnail: '🍎', gradient: 'from-orange-500 to-red-500', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', views: '2.1M' },
  { id: 11, title: 'Quantum Mechanics Explained', subject: 'Physics', duration: '05:30', thumbnail: '⚛️', gradient: 'from-orange-500 to-red-500', videoUrl: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', views: '3.4M' },
  { id: 12, title: 'Introduction to Electricity', subject: 'Physics', duration: '08:42', thumbnail: '⚡', gradient: 'from-orange-500 to-red-500', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', views: '1.9M' },

  // Chemistry
  { id: 13, title: 'The Periodic Table', subject: 'Chemistry', duration: '11:21', thumbnail: '⚗️', gradient: 'from-cyan-500 to-blue-500', videoUrl: 'https://www.w3schools.com/html/movie.mp4', views: '7.2M' },
  { id: 14, title: 'Atomic Structure', subject: 'Chemistry', duration: '10:12', thumbnail: '🧪', gradient: 'from-cyan-500 to-blue-500', videoUrl: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', views: '4.5M' },
  { id: 15, title: 'Chemical Bonds (Ionic & Covalent)', subject: 'Chemistry', duration: '09:55', thumbnail: '🔗', gradient: 'from-cyan-500 to-blue-500', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', views: '3.8M' },
  { id: 16, title: 'Molarity & Solutions', subject: 'Chemistry', duration: '11:15', thumbnail: '💧', gradient: 'from-cyan-500 to-blue-500', videoUrl: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', views: '5.1M' },

  // History
  { id: 17, title: 'A Day in Ancient Egypt', subject: 'History', duration: '05:26', thumbnail: '🌍', gradient: 'from-amber-500 to-orange-500', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', views: '4.2M' },
  { id: 18, title: 'The Secrets of Roman Architecture', subject: 'History', duration: '04:55', thumbnail: '🏛️', gradient: 'from-amber-500 to-orange-500', videoUrl: 'https://www.w3schools.com/html/movie.mp4', views: '3.4M' },
  { id: 19, title: 'The Great Wall of China', subject: 'History', duration: '05:26', thumbnail: '⚔️', gradient: 'from-amber-500 to-orange-500', videoUrl: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', views: '5.1M' },
  { id: 20, title: 'The Renaissance Explained', subject: 'History', duration: '05:16', thumbnail: '🎨', gradient: 'from-amber-500 to-orange-500', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', views: '2.8M' },
];

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  model?: string;
}

type Tab = 'chat' | 'videos';

export function TutorSession() {
  const [activeTab, setActiveTab] = useState<Tab>('videos');
  const [activeVideo, setActiveVideo] = useState(VIDEO_LIBRARY[0]);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'ai', text: "Hello! I'm BrightMind, your Socratic AI tutor powered by **Gemma 4**. 🎓\n\nI won't just give you answers — I'll guide you to discover them yourself through questions!\n\n**Try asking me anything:**\n- Math, Physics, Chemistry, Biology\n- History, Literature, Geography\n- Study techniques & exam prep\n\nWhat would you like to learn today?", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), model: 'system' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [aiStatus, setAiStatus] = useState<'connected' | 'offline' | 'unknown'>('unknown');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  // Check Ollama status on mount
  useEffect(() => {
    fetch('/health')
      .then(r => r.json())
      .then(data => {
        if (data.ollama?.status === 'connected') setAiStatus('connected');
        else setAiStatus('offline');
      })
      .catch(() => setAiStatus('offline'));
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg: Message = { id: Date.now(), sender: 'user', text: input, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          history: messages.slice(-10).map(m => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await response.json();
      const aiMsg: Message = {
        id: Date.now() + 1,
        sender: 'ai',
        text: data.response || "I couldn't process that. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: data.model || 'gemma',
      };
      setMessages(prev => [...prev, aiMsg]);

      if (data.status === 'ollama_offline') setAiStatus('offline');
      else if (data.status === 'success') setAiStatus('connected');
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: "⚠️ Could not connect to the server. Make sure serve.py is running.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }
    setIsTyping(false);
  };

  const subjects = ['All', ...new Set(VIDEO_LIBRARY.map(v => v.subject))];
  const filtered = subjectFilter === 'All' ? VIDEO_LIBRARY : VIDEO_LIBRARY.filter(v => v.subject === subjectFilter);

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {/* Tabs + AI Status */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 bg-white rounded-xl p-1.5 border border-gray-200 shadow-sm w-fit">
          <button onClick={() => setActiveTab('videos')} className={`px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all ${activeTab === 'videos' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
            <Play className="w-4 h-4" /> Video Lessons
          </button>
          <button onClick={() => setActiveTab('chat')} className={`px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all ${activeTab === 'chat' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
            <Bot className="w-4 h-4" /> AI Tutor Chat
          </button>
        </div>
        {activeTab === 'chat' && (
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${aiStatus === 'connected' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
            <Cpu className="w-3.5 h-3.5" />
            {aiStatus === 'connected' ? 'Gemma 4 Connected' : 'Ollama Offline — Start ollama serve'}
          </div>
        )}
      </div>

      {/* VIDEO TAB */}
      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-black rounded-2xl overflow-hidden shadow-xl aspect-video">
              <video key={activeVideo.videoUrl} controls className="w-full h-full" poster={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop`}>
                <source src={activeVideo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">{activeVideo.title}</h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm text-gray-500">{activeVideo.views} views</span>
                <span className="text-sm text-gray-300">•</span>
                <span className="text-sm text-gray-500">{activeVideo.duration}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r ${activeVideo.gradient} text-white`}>{activeVideo.subject}</span>
              </div>
              <p className="text-gray-600 mt-3 text-sm">Watch this lesson, then switch to the <strong>AI Tutor Chat</strong> tab to ask Gemma 4 any questions!</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {subjects.map(s => (
                <button key={s} onClick={() => setSubjectFilter(s)} className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${subjectFilter === s ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{s}</button>
              ))}
            </div>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {filtered.map(v => (
                <motion.button key={v.id} onClick={() => setActiveVideo(v)} whileHover={{ scale: 1.02 }} className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${activeVideo.id === v.id ? 'border-orange-500 bg-orange-50 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.gradient} flex items-center justify-center text-2xl flex-shrink-0 shadow-md`}>{v.thumbnail}</div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 text-sm truncate">{v.title}</p>
                    <p className="text-xs text-gray-500">{v.subject} · {v.duration}</p>
                  </div>
                  {activeVideo.id === v.id && <Play className="w-4 h-4 text-orange-600 flex-shrink-0" />}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CHAT TAB — Real Gemma 4 via Ollama */}
      {activeTab === 'chat' && (
        <div className="h-[calc(100vh-12rem)] flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="h-14 border-b border-gray-200 flex items-center justify-between px-5 bg-gray-50 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-sm">BrightMind AI Tutor</h2>
                <p className="text-xs text-gray-500">Powered by Gemma 4 · Socratic Method · Real-time AI</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            <AnimatePresence>
              {messages.map(msg => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.sender === 'user' ? 'bg-gray-200' : 'bg-gradient-to-br from-orange-500 to-red-600'}`}>
                    {msg.sender === 'user' ? <User className="w-3.5 h-3.5 text-gray-600" /> : <Sparkles className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <div className={`max-w-[80%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-3.5 rounded-2xl ${msg.sender === 'user' ? 'bg-orange-500 text-white rounded-tr-sm' : 'bg-gray-100 text-gray-900 rounded-tl-sm'}`}>
                      <p className="leading-relaxed whitespace-pre-wrap text-sm">{msg.text}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400">{msg.timestamp}</span>
                      {msg.model && msg.sender === 'ai' && msg.model !== 'system' && (
                        <span className="text-xs px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded-full font-medium flex items-center gap-0.5">
                          <BrainCircuit className="w-2.5 h-2.5" /> {msg.model}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3.5 flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                    </div>
                    <span className="text-xs text-gray-500 ml-2">Gemma 4 is thinking...</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={endRef} />
          </div>

          <div className="p-3 bg-white border-t border-gray-200 flex-shrink-0">
            <div className="flex items-end gap-2 max-w-4xl mx-auto">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Ask Gemma 4 anything — math, science, history, study tips..."
                className="flex-1 resize-none rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 p-3 max-h-24 focus:outline-none text-sm"
                rows={1}
              />
              <button onClick={handleSend} disabled={!input.trim() || isTyping} className="p-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
