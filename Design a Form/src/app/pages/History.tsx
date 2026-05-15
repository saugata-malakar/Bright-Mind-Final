import { useState } from 'react';
import { Clock, CheckCircle, AlertCircle, TrendingUp, Search, Filter, Calendar, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

interface Session {
  id: number;
  student: string;
  initials: string;
  subject: string;
  topic: string;
  status: 'mastered' | 'needs-review' | 'in-progress' | 'at-risk';
  mastery: number;
  duration: string;
  date: string;
  messages: number;
  agent: string;
}

const SESSIONS: Session[] = [
  { id: 1, student: 'Timmy Rogers', initials: 'TR', subject: 'Math', topic: 'Adding Fractions (Unlike Denominators)', status: 'needs-review', mastery: 35, duration: '22 min', date: 'Today, 10:30 AM', messages: 14, agent: 'Math Tutor' },
  { id: 2, student: 'Sarah Kim', initials: 'SK', subject: 'Math', topic: 'Solving Linear Equations', status: 'mastered', mastery: 92, duration: '35 min', date: 'Today, 9:15 AM', messages: 18, agent: 'Math Tutor' },
  { id: 3, student: 'John Davis', initials: 'JD', subject: 'History', topic: 'Causes of World War II', status: 'in-progress', mastery: 60, duration: '28 min', date: 'Yesterday, 2:15 PM', messages: 22, agent: 'Humanities Tutor' },
  { id: 4, student: 'Emily Wu', initials: 'EW', subject: 'Science', topic: 'Photosynthesis Process', status: 'mastered', mastery: 95, duration: '18 min', date: 'Yesterday, 11:00 AM', messages: 12, agent: 'Science Tutor' },
  { id: 5, student: 'Carlos Martinez', initials: 'CM', subject: 'Math', topic: 'Order of Operations (PEMDAS)', status: 'at-risk', mastery: 28, duration: '42 min', date: 'Yesterday, 10:00 AM', messages: 30, agent: 'Math Tutor' },
  { id: 6, student: 'Aisha Patel', initials: 'AP', subject: 'Science', topic: 'The Water Cycle', status: 'mastered', mastery: 88, duration: '20 min', date: 'May 14, 3:30 PM', messages: 10, agent: 'Science Tutor' },
  { id: 7, student: 'Liam O\'Brien', initials: 'LO', subject: 'Math', topic: 'Geometry: Area vs Perimeter', status: 'needs-review', mastery: 50, duration: '30 min', date: 'May 14, 1:00 PM', messages: 16, agent: 'Math Tutor' },
  { id: 8, student: 'Fatima Hassan', initials: 'FH', subject: 'Humanities', topic: 'Essay Writing: Thesis Statements', status: 'in-progress', mastery: 65, duration: '25 min', date: 'May 14, 10:30 AM', messages: 20, agent: 'Humanities Tutor' },
  { id: 9, student: 'David Chen', initials: 'DC', subject: 'Science', topic: 'Cell Structure & Organelles', status: 'mastered', mastery: 90, duration: '22 min', date: 'May 13, 2:00 PM', messages: 15, agent: 'Science Tutor' },
  { id: 10, student: 'Maria Santos', initials: 'MS', subject: 'Math', topic: 'Decimal to Fraction Conversion', status: 'needs-review', mastery: 45, duration: '28 min', date: 'May 13, 11:30 AM', messages: 19, agent: 'Math Tutor' },
  { id: 11, student: 'Timmy Rogers', initials: 'TR', subject: 'Math', topic: 'Multiplication Tables', status: 'mastered', mastery: 85, duration: '15 min', date: 'May 12, 10:00 AM', messages: 8, agent: 'Math Tutor' },
  { id: 12, student: 'Sarah Kim', initials: 'SK', subject: 'Science', topic: 'Forces & Motion', status: 'in-progress', mastery: 70, duration: '32 min', date: 'May 12, 9:00 AM', messages: 24, agent: 'Science Tutor' },
];

const STATUS_CONFIG = {
  'mastered': { label: 'Mastered', icon: CheckCircle, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  'needs-review': { label: 'Needs Review', icon: AlertCircle, color: 'text-amber-700 bg-amber-50 border-amber-200' },
  'in-progress': { label: 'In Progress', icon: Clock, color: 'text-blue-700 bg-blue-50 border-blue-200' },
  'at-risk': { label: 'At Risk', icon: AlertCircle, color: 'text-red-700 bg-red-50 border-red-200' },
};

export function History() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = SESSIONS.filter((s) => {
    const matchesSearch = searchQuery === '' ||
      s.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const summaryStats = {
    total: SESSIONS.length,
    mastered: SESSIONS.filter(s => s.status === 'mastered').length,
    atRisk: SESSIONS.filter(s => s.status === 'at-risk').length,
    avgMastery: Math.round(SESSIONS.reduce((sum, s) => sum + s.mastery, 0) / SESSIONS.length),
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Sessions</p>
          <p className="text-2xl font-bold text-slate-800">{summaryStats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Mastered</p>
          <p className="text-2xl font-bold text-emerald-600">{summaryStats.mastered}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">At Risk</p>
          <p className="text-2xl font-bold text-red-600">{summaryStats.atRisk}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Avg. Mastery</p>
          <p className="text-2xl font-bold text-blue-600">{summaryStats.avgMastery}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search students, topics, subjects..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'mastered', 'needs-review', 'in-progress', 'at-risk'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                statusFilter === status
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {status === 'all' ? 'All' : STATUS_CONFIG[status as keyof typeof STATUS_CONFIG]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Session List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Session History
          </h2>
          <p className="text-sm text-slate-400">{filtered.length} sessions</p>
        </div>

        <div className="divide-y divide-slate-100">
          {filtered.map((session, i) => {
            const statusCfg = STATUS_CONFIG[session.status];
            const StatusIcon = statusCfg.icon;
            return (
              <motion.div
                key={session.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="p-5 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-xs font-bold text-white">{session.initials}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-800 text-sm">{session.student}</p>
                        <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">{session.agent}</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-0.5 truncate">{session.topic}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-xs text-slate-400">{session.date}</span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs text-slate-400">{session.duration}</span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs text-slate-400">{session.messages} messages</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    {/* Mastery bar */}
                    <div className="hidden sm:block w-24">
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${session.mastery > 70 ? 'bg-emerald-500' : session.mastery > 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${session.mastery}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-500 text-right mt-0.5">{session.mastery}%</p>
                    </div>
                    {/* Status badge */}
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 ${statusCfg.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusCfg.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
