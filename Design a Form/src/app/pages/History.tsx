import { useState, useEffect } from 'react';
import { 
  Clock, CheckCircle, AlertCircle, TrendingUp, Search, Calendar, 
  Download, User, BookOpen, GraduationCap, Award, MessageSquare, 
  BarChart3, X, ChevronRight, Star, Heart, Check, Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Concept {
  name: string;
  score: number;
  status: 'mastered' | 'needs-review' | 'at-risk';
}

interface SocraticSession {
  topic: string;
  date: string;
  duration: string;
  messages: number;
  mastery: number;
  status: 'mastered' | 'needs-review' | 'in-progress' | 'at-risk';
  transcript: { sender: 'student' | 'tutor'; text: string }[];
  recommendation: string;
}

interface StudentRecord {
  id: number;
  name: string;
  rollNumber: string;
  initials: string;
  class: string;
  batch: string;
  rank: number;
  overallMastery: number;
  totalTime: string;
  activeSubject: string;
  engagementScore: number;
  status: 'mastered' | 'needs-review' | 'in-progress' | 'at-risk';
  concepts: Concept[];
  sessions: SocraticSession[];
  notes: string;
}

const DEFAULT_STUDENTS: StudentRecord[] = [
  {
    id: 1,
    name: 'Timmy Rogers',
    rollNumber: 'PW-2026-098',
    initials: 'TR',
    class: 'Grade 5 Math',
    batch: 'Foundation A',
    rank: 12,
    overallMastery: 58,
    totalTime: '4.5 hrs',
    activeSubject: 'Mathematics',
    engagementScore: 82,
    status: 'needs-review',
    concepts: [
      { name: 'Adding Fractions (Unlike Denominators)', score: 35, status: 'at-risk' },
      { name: 'Multiplication Tables', score: 85, status: 'mastered' },
      { name: 'Order of Operations (PEMDAS)', score: 55, status: 'needs-review' }
    ],
    sessions: [
      {
        topic: 'Adding Fractions (Unlike Denominators)',
        date: 'Today, 10:30 AM',
        duration: '22 min',
        messages: 14,
        mastery: 35,
        status: 'needs-review',
        transcript: [
          { sender: 'student', text: "I don't know how to add 1/3 and 2/5 together. Do I just add the top and bottom?" },
          { sender: 'tutor', text: "That is a very common guess! But imagine eating 1/3 of a small pizza and 2/5 of a medium pizza. Since the slices are different sizes, we can't just add them directly. How can we make the slices the same size?" },
          { sender: 'student', text: "Oh, do we need to find a common denominator?" },
          { sender: 'tutor', text: "Spot on! Let's find the least common multiple of 3 and 5. What number fits both?" },
          { sender: 'student', text: "It's 15. So we divide the slices into 15 parts?" },
          { sender: 'tutor', text: "Bingo! 1/3 becomes 5/15, and 2/5 becomes 6/15. Now that the sizes are equal, what do we get when we add them?" }
        ],
        recommendation: "Review LCM calculations and practice visual modeling with fractional bars."
      }
    ],
    notes: 'Timmy demonstrates excellent effort but requires remedial assistance with fractions containing prime denominators.'
  },
  {
    id: 2,
    name: 'Sarah Kim',
    rollNumber: 'VD-2026-441',
    initials: 'SK',
    class: 'Grade 5 Math & Science',
    batch: 'Achievers B',
    rank: 3,
    overallMastery: 88,
    totalTime: '8.2 hrs',
    activeSubject: 'Mathematics',
    engagementScore: 95,
    status: 'mastered',
    concepts: [
      { name: 'Solving Linear Equations', score: 92, status: 'mastered' },
      { name: 'Forces & Motion', score: 78, status: 'needs-review' },
      { name: 'Decimal to Fraction Conversion', score: 94, status: 'mastered' }
    ],
    sessions: [
      {
        topic: 'Solving Linear Equations',
        date: 'Today, 9:15 AM',
        duration: '35 min',
        messages: 18,
        mastery: 92,
        status: 'mastered',
        transcript: [
          { sender: 'student', text: "How do I isolate x in 3x + 5 = 20?" },
          { sender: 'tutor', text: "Think of the equation as a balanced scale. If we want x by itself, what's the first thing we should subtract from both sides to keep it balanced?" },
          { sender: 'student', text: "We subtract 5, right? So it becomes 3x = 15." },
          { sender: 'tutor', text: "Exactly! Now, if 3 times x is 15, how do we find what just one x is?" },
          { sender: 'student', text: "Divide both sides by 3. x = 5!" }
        ],
        recommendation: "Ready for advanced multi-step linear equations and introductory systems."
      }
    ],
    notes: 'Excellent critical thinking. Self-driven learner who grasps algebraic abstractions quickly.'
  },
  {
    id: 3,
    name: 'John Davis',
    rollNumber: 'AL-2026-102',
    class: 'Grade 5 Humanities',
    batch: 'Global History A',
    rank: 8,
    overallMastery: 72,
    totalTime: '6.1 hrs',
    activeSubject: 'History',
    engagementScore: 78,
    status: 'in-progress',
    concepts: [
      { name: 'Causes of World War II', score: 60, status: 'needs-review' },
      { name: 'Ancient Civilizations', score: 84, status: 'mastered' }
    ],
    sessions: [
      {
        topic: 'Causes of World War II',
        date: 'Yesterday, 2:15 PM',
        duration: '28 min',
        messages: 22,
        mastery: 60,
        status: 'in-progress',
        transcript: [
          { sender: 'student', text: "Why did the Treaty of Versailles make Germany angry?" },
          { sender: 'tutor', text: "Imagine being forced to take 100% blame for a group fight and pay for all damages, plus give up your favorite possessions. How would you feel?" },
          { sender: 'student', text: "Resentful and ruined. That explains why Germany felt humiliated." }
        ],
        recommendation: "Discuss the rise of totalitarianism and economic hyperinflation next."
      }
    ],
    notes: 'Strong interest in comparative history. Writing skills are clear but need focus on supporting thesis arguments.'
  },
  {
    id: 4,
    name: 'Emily Wu',
    rollNumber: 'PW-2026-115',
    class: 'Grade 5 Science',
    batch: 'Nurture A',
    rank: 1,
    overallMastery: 96,
    totalTime: '9.4 hrs',
    activeSubject: 'Science',
    engagementScore: 98,
    status: 'mastered',
    concepts: [
      { name: 'Photosynthesis Process', score: 95, status: 'mastered' },
      { name: 'Cell Structure & Organelles', score: 97, status: 'mastered' }
    ],
    sessions: [
      {
        topic: 'Photosynthesis Process',
        date: 'Yesterday, 11:00 AM',
        duration: '18 min',
        messages: 12,
        mastery: 95,
        status: 'mastered',
        transcript: [
          { sender: 'student', text: "What role does chlorophyll play?" },
          { sender: 'tutor', text: "It acts like a solar panel inside the leaf! What do solar panels collect?" },
          { sender: 'student', text: "Sunlight! And they convert it to usable energy." }
        ],
        recommendation: "Excellent understanding. Challenge her with cellular respiration comparison."
      }
    ],
    notes: 'Top performing student. Frequently completes extension exercises and asks advanced conceptual questions.'
  },
  {
    id: 5,
    name: 'Carlos Martinez',
    rollNumber: 'AL-2026-809',
    class: 'Grade 5 Math',
    batch: 'Olympiad Prep',
    rank: 22,
    overallMastery: 42,
    totalTime: '3.8 hrs',
    activeSubject: 'Mathematics',
    engagementScore: 65,
    status: 'at-risk',
    concepts: [
      { name: 'Order of Operations (PEMDAS)', score: 28, status: 'at-risk' },
      { name: 'Geometry: Area vs Perimeter', score: 56, status: 'needs-review' }
    ],
    sessions: [
      {
        topic: 'Order of Operations (PEMDAS)',
        date: 'Yesterday, 10:00 AM',
        duration: '42 min',
        messages: 30,
        mastery: 28,
        status: 'at-risk',
        transcript: [
          { sender: 'student', text: "Do I do multiplication or division first in 12 / 3 * 2?" },
          { sender: 'tutor', text: "In PEMDAS, Multiplication and Division hold the exact same priority! We solve them left to right. What's left to right here?" }
        ],
        recommendation: "Requires structured drill sessions on left-to-right precedence rules."
      }
    ],
    notes: 'Carlos needs to slow down during assignments. Tends to rush calculations and mix up operation priorities.'
  }
];

const STATUS_CONFIG = {
  'mastered': { label: 'Mastered', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  'needs-review': { label: 'Needs Review', color: 'text-amber-700 bg-amber-50 border-amber-200' },
  'in-progress': { label: 'In Progress', color: 'text-blue-700 bg-blue-50 border-blue-200' },
  'at-risk': { label: 'At Risk', color: 'text-red-700 bg-red-50 border-red-200' },
};

export function History() {
  const [students, setStudents] = useState<StudentRecord[]>(() => {
    const saved = localStorage.getItem('brightmind_student_data');
    return saved ? JSON.parse(saved) : DEFAULT_STUDENTS;
  });
  const [selectedStudentId, setSelectedStudentId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'sessions' | 'concepts' | 'notes'>('sessions');
  const [noteText, setNoteText] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state with local storage
  useEffect(() => {
    localStorage.setItem('brightmind_student_data', JSON.stringify(students));
  }, [students]);

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];

  // Initialize notes textbox when switching students
  useEffect(() => {
    if (currentStudent) {
      setNoteText(currentStudent.notes);
    }
  }, [selectedStudentId]);

  const handleSaveNotes = () => {
    setStudents(prev => prev.map(s => {
      if (s.id === selectedStudentId) {
        return { ...s, notes: noteText };
      }
      return s;
    }));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleExportReport = (student: StudentRecord) => {
    const conceptText = student.concepts.map(c => `- ${c.name}: ${c.score}% (${c.status.toUpperCase()})`).join('\n');
    const sessionText = student.sessions.map(s => {
      const chat = s.transcript.map(t => `   ${t.sender.toUpperCase()}: ${t.text}`).join('\n');
      return `\n* TOPIC: ${s.topic}\n  DATE: ${s.date}\n  MASTERY: ${s.mastery}%\n  AI RECOMMENDED ACTION:\n  "${s.recommendation}"\n  TRANSCRIPT:\n${chat}`;
    }).join('\n');

    const fileContent = `================================================
BRIGHTMIND STUDENT DIAGNOSTIC FILE (CONFIDENTIAL)
================================================
NAME: ${student.name}
ROLL NUMBER: ${student.rollNumber}
CLASS: ${student.class}
BATCH: ${student.batch}
CLASS RANK: #${student.rank}
OVERALL MASTERY: ${student.overallMastery}%
ENGAGEMENT RATE: ${student.engagementScore}%
TOTAL STUDY TIME: ${student.totalTime}
------------------------------------------------
TOPIC MASTERY MATRIX:
${conceptText}
------------------------------------------------
ACADEMIC TEACHER NOTES:
"${student.notes}"
------------------------------------------------
SOCRATIC SESSION LOGS:
${sessionText}
================================================`;

    const element = document.createElement("a");
    const file = new Blob([fileContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${student.name.replace(/\s+/g, '_')}_academic_file.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.class.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header Branding Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-indigo-600 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <GraduationCap className="w-8 h-8" /> Student Diagnostics & Analytics
          </h1>
          <p className="text-orange-100 text-sm mt-1 font-medium">Official Teacher Workstation · Real-time RAG diagnostics synced with offline Socratic engines</p>
        </div>
        <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl border border-white/20">
          <Award className="w-5 h-5 text-amber-300" />
          <span className="text-sm font-bold uppercase tracking-wider">Allen & PW Roster Synced</span>
        </div>
      </div>

      {/* Main Two-Column Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Student Master List (4/12 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[700px]">
          {/* Header search */}
          <div className="p-4 border-b border-slate-100 space-y-3 bg-slate-50 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search students, roll no..."
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 outline-none text-sm"
              />
            </div>
            {/* Status Quick Filters */}
            <div className="flex gap-1 overflow-x-auto pb-1 max-w-full">
              {['all', 'mastered', 'needs-review', 'at-risk'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all whitespace-nowrap ${
                    statusFilter === status 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {status === 'all' ? 'All' : STATUS_CONFIG[status as keyof typeof STATUS_CONFIG]?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Student List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => {
                const isSelected = student.id === selectedStudentId;
                const statusCfg = STATUS_CONFIG[student.status];
                return (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudentId(student.id)}
                    className={`w-full p-4 flex items-center gap-3 text-left transition-all ${
                      isSelected ? 'bg-indigo-50/50 border-r-4 border-indigo-600' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    {/* Compact initials avatar */}
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm">
                      {student.initials}
                    </div>
                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 text-sm truncate">{student.name}</span>
                        <span className="text-xs font-mono text-slate-400 font-bold">{student.rollNumber}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{student.class} · {student.batch}</p>
                      
                      {/* Compact mastery meter */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              student.overallMastery >= 85 ? 'bg-emerald-500' : student.overallMastery >= 55 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${student.overallMastery}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-600">{student.overallMastery}%</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-300 ${isSelected ? 'text-indigo-500 translate-x-1' : ''} transition-all`} />
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <User className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-sm font-semibold">No students match selection.</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Student Academic File Detail (8/12 cols) */}
        <div className="lg:col-span-8 space-y-6 h-[700px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {currentStudent ? (
              <motion.div
                key={currentStudent.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col h-full overflow-hidden"
              >
                {/* Header summary */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-5 gap-4 flex-shrink-0">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-2xl font-bold text-slate-800">{currentStudent.name}</h2>
                      <span className="text-xs font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full">
                        {currentStudent.batch}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-full flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> Rank #{currentStudent.rank}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 font-mono">Academic Diagnostic File: {currentStudent.rollNumber}</p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleExportReport(currentStudent)}
                      className="flex-1 sm:flex-none px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Export Report
                    </button>
                  </div>
                </div>

                {/* Performance Analytics Gauge Row */}
                <div className="grid grid-cols-3 gap-4 py-5 border-b border-slate-100 bg-slate-50/50 rounded-xl p-4 mt-4 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    {/* SVG Radial Gauge */}
                    <div className="relative w-14 h-14 flex-shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="28" cy="28" r="24" className="stroke-slate-100" strokeWidth="4" fill="transparent" />
                        <circle 
                          cx="28" 
                          cy="28" 
                          r="24" 
                          className="stroke-indigo-600 transition-all duration-700" 
                          strokeWidth="4" 
                          fill="transparent" 
                          strokeDasharray={2 * Math.PI * 24} 
                          strokeDashoffset={2 * Math.PI * 24 * (1 - currentStudent.overallMastery / 100)} 
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-black text-slate-700">
                        {currentStudent.overallMastery}%
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Overall Mastery</span>
                      <span className="text-sm font-extrabold text-slate-700">PW/Allen Standard</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Study Hours</span>
                      <span className="text-sm font-black text-slate-700">{currentStudent.totalTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Engagement</span>
                      <span className="text-sm font-black text-slate-700">{currentStudent.engagementScore}% Ratio</span>
                    </div>
                  </div>
                </div>

                {/* Workspace Navigation Tabs */}
                <div className="flex border-b border-slate-100 mt-4 flex-shrink-0">
                  <button
                    onClick={() => setActiveTab('sessions')}
                    className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                      activeTab === 'sessions' 
                        ? 'border-indigo-600 text-indigo-600' 
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" /> Socratic AI Logs
                  </button>
                  <button
                    onClick={() => setActiveTab('concepts')}
                    className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                      activeTab === 'concepts' 
                        ? 'border-indigo-600 text-indigo-600' 
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" /> Topic Mastery Matrix
                  </button>
                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                      activeTab === 'notes' 
                        ? 'border-indigo-600 text-indigo-600' 
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <User className="w-4 h-4" /> Teacher Notes
                  </button>
                </div>

                {/* Tab Content Box */}
                <div className="flex-1 overflow-y-auto py-5">
                  {/* TAB 1: Socratic Session Logs & Transcript */}
                  {activeTab === 'sessions' && (
                    <div className="space-y-5">
                      {currentStudent.sessions.map((session, sIdx) => (
                        <div key={sIdx} className="space-y-4">
                          {/* Session Info Bar */}
                          <div className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded-lg p-3">
                            <div className="space-y-0.5">
                              <span className="text-sm font-bold text-slate-800 block">{session.topic}</span>
                              <span className="text-xs text-slate-400 font-semibold">{session.date} · {session.duration} · {session.messages} queries</span>
                            </div>
                            <span className="text-sm font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded">
                              Score: {session.mastery}%
                            </span>
                          </div>

                          {/* Recommendation Box */}
                          <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg flex items-start gap-2">
                            <Award className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                              <span className="font-bold text-orange-800">Socratic Diagnostic Recommendation: </span>
                              <span className="text-orange-950 font-medium">{session.recommendation}</span>
                            </div>
                          </div>

                          {/* Transcript Box */}
                          <div className="space-y-3 border border-slate-200 rounded-xl p-4 bg-slate-50/50 max-h-[220px] overflow-y-auto">
                            {session.transcript.map((msg, mIdx) => (
                              <div key={mIdx} className={`flex flex-col ${msg.sender === 'student' ? 'items-end' : 'items-start'}`}>
                                <div className={`p-3 rounded-lg max-w-[85%] text-sm leading-relaxed ${
                                  msg.sender === 'student' 
                                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-sm' 
                                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
                                }`}>
                                  {msg.text}
                                </div>
                                <span className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-wider px-1">
                                  {msg.sender === 'student' ? 'Student' : 'Socratic AI'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB 2: Concepts Mastery Matrix */}
                  {activeTab === 'concepts' && (
                    <div className="space-y-4">
                      {currentStudent.concepts.map((concept, cIdx) => (
                        <div key={cIdx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                          <div className="min-w-0 flex-1 space-y-1.5">
                            <span className="text-sm font-bold text-slate-800 block truncate">{concept.name}</span>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    concept.score >= 80 ? 'bg-emerald-500' : concept.score >= 50 ? 'bg-amber-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${concept.score}%` }}
                                />
                              </div>
                              <span className="text-xs font-bold text-slate-600">{concept.score}%</span>
                            </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border flex-shrink-0 ${
                            concept.status === 'mastered' 
                              ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
                              : concept.status === 'needs-review'
                              ? 'text-amber-700 bg-amber-50 border-amber-200'
                              : 'text-red-700 bg-red-50 border-red-200'
                          }`}>
                            {concept.status.replace('-', ' ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB 3: Teacher Notes & Persisted Feedback */}
                  {activeTab === 'notes' && (
                    <div className="space-y-4 h-full flex flex-col justify-between">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 block">Edit Academic Feedback notes:</label>
                        <textarea
                          value={noteText}
                          onChange={e => setNoteText(e.target.value)}
                          placeholder="Type custom academic feedback for this student. These comments will persist to their diagnostic file..."
                          className="w-full h-40 p-3 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 outline-none text-sm resize-none"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3">
                        <span className="text-xs text-slate-400 font-medium">Notes are persisted locally to localStorage.</span>
                        <button
                          onClick={handleSaveNotes}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:shadow-lg transition-all flex items-center gap-1.5"
                        >
                          {saveSuccess ? (
                            <>
                              <Check className="w-4 h-4" /> Saved!
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" /> Save Feedback
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center text-slate-400 h-full flex flex-col items-center justify-center space-y-2">
                <BookOpen className="w-12 h-12 text-slate-300" />
                <p className="text-base font-semibold">Select a student from the class roster to inspect their file.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
        
      </div>
    </div>
  );
}
