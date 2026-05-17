import { useState, useRef } from 'react';
import { BrainCircuit, Upload, CheckCircle, AlertTriangle, ChevronRight, Play, Target, TrendingUp, BookOpen, FileText, Image, X, Sparkles, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

interface GapResult {
  mastery: number;
  gaps: { concept: string; severity: string; detail: string }[];
  strengths: string[];
  learningPath: { name: string; status: string }[];
  crossLinks: { subject: string; connection: string }[];
  summary?: string;
  bloomLevel?: string;
  recommendations?: string;
}

const MODELS = [
  { id: 'gemma4:9b', name: 'Gemma 4 9B', desc: 'Fast analysis', icon: '⚡' },
  { id: 'gemma4:27b', name: 'Gemma 4 27B', desc: 'Balanced', icon: '🧠' },
  { id: 'gemma4:72b', name: 'Gemma 4 72B', desc: 'Deep reasoning', icon: '🔬' },
];

export function GapAnalyzer() {
  const [step, setStep] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<GapResult | null>(null);
  const [textInput, setTextInput] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; type: string }[]>([]);
  const [analysisStage, setAnalysisStage] = useState('');
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id);
  const [usedModel, setUsedModel] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = Array.from(files).map(f => ({
      name: f.name,
      size: (f.size / 1024).toFixed(1) + ' KB',
      type: f.type.includes('image') ? 'image' : f.type.includes('pdf') ? 'pdf' : 'text',
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => setUploadedFiles(prev => prev.filter((_, i) => i !== index));

  const handleAnalyze = async () => {
    const content = textInput || uploadedFiles.map(f => f.name).join(', ') || 'general assessment';
    setAnalyzing(true);
    setStep(2);
    setError('');

    const stages = [
      '🔍 Scanning uploaded materials...',
      `🧠 Sending to ${MODELS.find(m => m.id === selectedModel)?.name || 'Gemma'}...`,
      '📊 AI is analyzing knowledge gaps...',
      '🎯 Generating learning path...',
    ];
    stages.forEach((s, i) => setTimeout(() => setAnalysisStage(s), i * 800));

    try {
      const resp = await fetch('/api/v1/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: content,
          files: uploadedFiles.map(f => f.name),
          model: selectedModel,
        }),
      });
      const data = await resp.json();

      if (data.status === 'success' && data.analysis) {
        setResults(data.analysis);
        setUsedModel(data.model || selectedModel);
        setStep(3);
      } else if (data.status === 'ollama_offline') {
        setError('Ollama is not running. Start it with: ollama serve');
        setStep(1);
      } else {
        setError(data.error || 'Analysis failed. Try again.');
        setStep(1);
      }
    } catch {
      setError('Could not connect to server. Is serve.py running?');
      setStep(1);
    }
    setAnalyzing(false);
  };

  const handleReset = () => { setStep(1); setResults(null); setTextInput(''); setUploadedFiles([]); setError(''); };

  const statusColors: Record<string, string> = {
    mastered: 'bg-green-100 text-green-700 border-green-200',
    review: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    learn: 'bg-blue-100 text-blue-700 border-blue-200',
    target: 'bg-purple-100 text-purple-700 border-purple-200',
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BrainCircuit className="text-orange-500 w-7 h-7" /> Analyze Student Work
            </h2>
            <p className="text-gray-600 mt-1">Upload homework or describe student work — Gemma 4 analyzes gaps with real AI.</p>
          </div>
          {step === 3 && <button onClick={handleReset} className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">New Analysis</button>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

            {/* Step 1: Upload + Input */}
            {step === 1 && (
              <div className="p-6 space-y-5">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0" /> {error}
                  </div>
                )}

                {/* File Upload */}
                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50/50 transition-all group">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3 group-hover:text-orange-500" />
                  <p className="font-semibold text-gray-700">Drop files here or click to upload</p>
                  <p className="text-sm text-gray-500 mt-1">Images, PDFs, or text files of student work</p>
                  <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf,.txt,.doc,.docx" onChange={handleFileUpload} className="hidden" />
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700">Uploaded ({uploadedFiles.length})</h4>
                    {uploadedFiles.map((f, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center gap-3">
                          {f.type === 'image' ? <Image className="w-5 h-5 text-blue-500" /> : <FileText className="w-5 h-5 text-orange-500" />}
                          <div><p className="text-sm font-medium">{f.name}</p><p className="text-xs text-gray-500">{f.size}</p></div>
                        </div>
                        <button onClick={() => removeFile(i)} className="p-1 hover:bg-gray-200 rounded"><X className="w-4 h-4 text-gray-400" /></button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3"><div className="h-px bg-gray-200 flex-1" /><span className="text-xs text-gray-400 font-medium">OR DESCRIBE</span><div className="h-px bg-gray-200 flex-1" /></div>

                <textarea value={textInput} onChange={e => setTextInput(e.target.value)} rows={4}
                  placeholder="Example: Student solving Newton's laws problems — confuses action-reaction pairs and can't draw free body diagrams correctly..."
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none text-sm" />

                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-gray-500 font-medium mr-1 self-center">Quick:</span>
                  {['Fractions homework', 'Physics - Newton\'s Laws', 'Chemistry - Balancing equations', 'Algebra test', 'Essay on World War II'].map(t => (
                    <button key={t} onClick={() => setTextInput(t)} className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-orange-100 hover:text-orange-700">{t}</button>
                  ))}
                </div>

                {/* Model Selector */}
                <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2"><Cpu className="w-4 h-4" /> Select AI Model</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {MODELS.map(m => (
                      <button key={m.id} onClick={() => setSelectedModel(m.id)}
                        className={`p-3 rounded-lg border text-left transition-all ${selectedModel === m.id ? 'border-purple-500 bg-white shadow-md ring-2 ring-purple-200' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                        <div className="text-lg mb-1">{m.icon}</div>
                        <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                        <p className="text-xs text-gray-500">{m.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={handleAnalyze} disabled={!textInput.trim() && uploadedFiles.length === 0}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg text-lg disabled:opacity-50 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" /> Analyze with {MODELS.find(m => m.id === selectedModel)?.name}
                </button>
              </div>
            )}

            {/* Step 2: Analyzing */}
            {step === 2 && analyzing && (
              <div className="p-12 flex flex-col items-center">
                <div className="relative w-20 h-20 mb-5">
                  <svg className="animate-spin w-full h-full text-orange-200" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <BrainCircuit className="absolute inset-0 m-auto w-7 h-7 text-orange-600 animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">AI Analysis in Progress</h3>
                <p className="text-gray-500 text-sm mt-2">{analysisStage}</p>
                <p className="text-xs text-gray-400 mt-3">Using {MODELS.find(m => m.id === selectedModel)?.name}...</p>
              </div>
            )}

            {/* Step 3: Results */}
            {step === 3 && results && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 space-y-6">
                {/* Model + Summary */}
                <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-semibold text-orange-800">Analyzed by: {usedModel}</span>
                  </div>
                  {results.summary && <p className="text-sm text-gray-700">{results.summary}</p>}
                </div>

                {/* Mastery */}
                <div className="flex items-center justify-between p-5 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Target className="w-6 h-6 text-gray-700" />
                    <div><span className="font-semibold text-gray-900 text-lg">Mastery Score</span><p className="text-xs text-gray-500">AI-assessed understanding level</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${results.mastery}%` }} transition={{ duration: 1 }}
                        className={`h-full rounded-full ${results.mastery > 70 ? 'bg-green-500' : results.mastery > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                    </div>
                    <span className={`text-2xl font-bold ${results.mastery > 70 ? 'text-green-600' : results.mastery > 50 ? 'text-yellow-600' : 'text-red-600'}`}>{results.mastery}%</span>
                  </div>
                </div>

                {/* Gaps */}
                {results.gaps?.length > 0 && (
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-red-700 mb-3 text-lg"><AlertTriangle className="w-5 h-5" /> Knowledge Gaps ({results.gaps.length})</h4>
                    <div className="space-y-3">
                      {results.gaps.map((gap, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 * i }} className="p-4 bg-red-50 rounded-xl border border-red-100">
                          <div className="flex items-start gap-3">
                            <div className={`w-2.5 h-2.5 mt-2 rounded-full flex-shrink-0 ${gap.severity === 'critical' ? 'bg-red-600' : gap.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'}`} />
                            <div>
                              <p className="font-semibold text-gray-900">{gap.concept}</p>
                              <p className="text-sm text-gray-600 mt-1">{gap.detail}</p>
                              <span className="text-xs font-medium text-red-600 mt-2 inline-block px-2 py-0.5 bg-red-100 rounded-full">{gap.severity}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Strengths */}
                {results.strengths?.length > 0 && (
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-green-700 mb-3"><CheckCircle className="w-5 h-5" /> Strengths</h4>
                    <div className="space-y-2">
                      {results.strengths.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm p-2 bg-green-50 rounded-lg"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> {s}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Learning Path */}
                {results.learningPath?.length > 0 && (
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-blue-700 mb-3"><TrendingUp className="w-5 h-5" /> AI-Generated Learning Path</h4>
                    <div className="space-y-2">
                      {results.learningPath.map((s, i) => (
                        <div key={i} className={`p-3 rounded-lg border flex items-center justify-between ${statusColors[s.status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                          <span className="font-medium text-sm">{s.name}</span>
                          <span className="text-xs font-semibold uppercase">{s.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cross-Links */}
                {results.crossLinks?.length > 0 && (
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-purple-700 mb-3"><BookOpen className="w-5 h-5" /> Cross-Disciplinary Connections</h4>
                    {results.crossLinks.map((link, i) => (
                      <div key={i} className="p-4 bg-purple-50 rounded-xl border border-purple-100 mb-2">
                        <span className="text-xs font-bold text-purple-600 uppercase">{link.subject}</span>
                        <p className="text-sm text-gray-700 mt-1">{link.connection}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bloom's Level */}
                {results.bloomLevel && (
                  <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                    <h4 className="flex items-center gap-2 font-semibold text-indigo-700 mb-2"><BrainCircuit className="w-5 h-5" /> Bloom's Taxonomy Level</h4>
                    <div className="flex gap-1 mt-2">
                      {['REMEMBER','UNDERSTAND','APPLY','ANALYZE','EVALUATE','CREATE'].map(level => (
                        <div key={level} className={`flex-1 py-2 text-center text-[10px] font-bold rounded-lg ${results.bloomLevel === level ? 'bg-indigo-600 text-white shadow-md' : 'bg-indigo-100 text-indigo-400'}`}>
                          {level}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-indigo-600 mt-2">Student is currently at the <strong>{results.bloomLevel}</strong> level. Goal: move up to the next level.</p>
                  </div>
                )}

                {/* How to Improve — Recommendations */}
                {results.recommendations && (
                  <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                    <h4 className="flex items-center gap-2 font-bold text-emerald-800 mb-3 text-lg">🎯 How This Student Can Improve</h4>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{results.recommendations}</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Cpu className="w-5 h-5" /> Gemma Models</h3>
            <div className="space-y-3">
              {MODELS.map(m => (
                <div key={m.id} className={`p-3 rounded-lg border ${selectedModel === m.id ? 'border-purple-300 bg-purple-50' : 'border-gray-100 bg-gray-50'}`}>
                  <div className="flex items-center gap-2">
                    <span>{m.icon}</span>
                    <span className="text-sm font-semibold text-gray-900">{m.name}</span>
                    {usedModel === m.id && <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">used</span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-6">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
            {step < 3 ? (
              <p className="text-sm text-gray-500 italic">Upload or describe student work to see AI recommendations.</p>
            ) : (
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 border border-blue-200 font-medium text-sm">
                  Start Remedial Session <Play className="w-4 h-4" />
                </button>
                {results?.gaps?.map((gap, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg border text-sm flex items-center justify-between group cursor-pointer hover:bg-gray-100">
                    <span className="truncate pr-2">{gap.concept}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
