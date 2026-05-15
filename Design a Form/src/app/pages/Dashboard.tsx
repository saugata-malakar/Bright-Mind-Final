import { ArrowRight, BookOpen, MessageSquare, BrainCircuit, Users, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    { label: 'Active Students', value: '45', change: '+3 this week', icon: Users, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
    { label: 'Tutoring Sessions', value: '128', change: '+12 today', icon: MessageSquare, color: 'from-green-500 to-emerald-600', bg: 'bg-green-50' },
    { label: 'Gaps Identified', value: '34', change: '8 critical', icon: BrainCircuit, color: 'from-orange-500 to-red-500', bg: 'bg-orange-50' },
    { label: 'Avg. Mastery', value: '72%', change: '+5% vs last month', icon: TrendingUp, color: 'from-purple-500 to-indigo-600', bg: 'bg-purple-50' },
  ];

  const students = [
    { name: 'Timmy R.', subject: 'Fractions', mastery: 35, status: 'at-risk', lastActive: '10 min ago' },
    { name: 'Sarah K.', subject: 'Algebra', mastery: 88, status: 'excelling', lastActive: '1 hour ago' },
    { name: 'John D.', subject: 'Geometry', mastery: 52, status: 'improving', lastActive: '2 hours ago' },
    { name: 'Emily W.', subject: 'Photosynthesis', mastery: 91, status: 'excelling', lastActive: '30 min ago' },
    { name: 'Carlos M.', subject: 'Linear Equations', mastery: 44, status: 'at-risk', lastActive: '45 min ago' },
  ];

  const recentActivity = [
    { id: 1, type: 'alert', icon: AlertTriangle, message: 'Timmy is struggling with Fractions — 3 failed attempts in a row', time: '10 mins ago', color: 'border-l-red-500 bg-red-50' },
    { id: 2, type: 'success', icon: CheckCircle, message: 'Sarah mastered the Basic Algebra module! 🎉', time: '1 hour ago', color: 'border-l-green-500 bg-green-50' },
    { id: 3, type: 'info', icon: Clock, message: 'Carlos has 5 concepts due for spaced repetition review today', time: '2 hours ago', color: 'border-l-blue-500 bg-blue-50' },
    { id: 4, type: 'success', icon: CheckCircle, message: 'New offline curriculum package synced successfully', time: '3 hours ago', color: 'border-l-green-500 bg-green-50' },
  ];

  const statusBadge = (status: string) => {
    switch (status) {
      case 'at-risk': return 'bg-red-100 text-red-700';
      case 'excelling': return 'bg-green-100 text-green-700';
      case 'improving': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg">
        <h2 className="text-2xl font-bold">Welcome back, Mr. Davis 👋</h2>
        <p className="text-blue-100 mt-2">2 students need attention today. Your class mastery is trending up!</p>
        <div className="flex gap-3 mt-5">
          <button onClick={() => onNavigate('tutor')} className="px-5 py-2.5 bg-white text-blue-700 font-semibold rounded-xl hover:shadow-lg transition-all text-sm">
            Start Tutoring Session
          </button>
          <button onClick={() => onNavigate('analyzer')} className="px-5 py-2.5 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all text-sm border border-white/30">
            Analyze Student Work
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                  <Icon className={`w-5 h-5 bg-gradient-to-r ${stat.color} bg-clip-text`} style={{ color: stat.color.includes('blue') ? '#3b82f6' : stat.color.includes('green') ? '#10b981' : stat.color.includes('orange') ? '#f97316' : '#8b5cf6' }} />
                </div>
                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Student Table */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Student Progress</h3>
            <button onClick={() => onNavigate('history')} className="text-sm text-blue-600 font-medium hover:underline">View All</button>
          </div>
          <div className="divide-y divide-gray-100">
            {students.map((student, i) => (
              <motion.div
                key={student.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * i }}
                className="px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{student.name}</p>
                    <p className="text-xs text-gray-500">{student.subject} · {student.lastActive}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${student.mastery > 70 ? 'bg-green-500' : student.mastery > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${student.mastery}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 text-right mt-0.5">{student.mastery}%</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusBadge(student.status)}`}>
                    {student.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-4 space-y-3">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className={`p-3.5 rounded-xl border-l-4 ${activity.color}`}>
                  <div className="flex items-start gap-2.5">
                    <Icon className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm leading-snug">{activity.message}</p>
                      <span className="text-xs text-gray-500 mt-1 block">{activity.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button onClick={() => onNavigate('tutor')} className="flex items-center justify-between p-5 rounded-xl border border-gray-200 bg-white hover:border-blue-500 hover:shadow-md transition-all group text-left">
          <div>
            <MessageSquare className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="font-semibold text-gray-900">Socratic Tutor</h4>
            <p className="text-sm text-gray-500 mt-1">AI-guided learning</p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
        </button>
        <button onClick={() => onNavigate('analyzer')} className="flex items-center justify-between p-5 rounded-xl border border-gray-200 bg-white hover:border-orange-500 hover:shadow-md transition-all group text-left">
          <div>
            <BrainCircuit className="w-6 h-6 text-orange-600 mb-2" />
            <h4 className="font-semibold text-gray-900">Gap Analyzer</h4>
            <p className="text-sm text-gray-500 mt-1">Find knowledge gaps</p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
        </button>
        <button onClick={() => onNavigate('curriculum')} className="flex items-center justify-between p-5 rounded-xl border border-gray-200 bg-white hover:border-green-500 hover:shadow-md transition-all group text-left">
          <div>
            <BookOpen className="w-6 h-6 text-green-600 mb-2" />
            <h4 className="font-semibold text-gray-900">Curriculum Base</h4>
            <p className="text-sm text-gray-500 mt-1">Browse offline resources</p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
        </button>
      </div>
    </div>
  );
}
