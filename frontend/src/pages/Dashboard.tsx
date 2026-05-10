import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  Stethoscope,
  BookOpen,
  History,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Database,
  Zap,
  Heart,
  Users,
  TrendingUp,
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const quickActions = [
    { 
      icon: MessageSquare, 
      label: 'AI Chat', 
      page: '/chat', 
      gradient: 'from-blue-500 to-blue-600',
      description: 'Talk to Gemma 4'
    },
    { 
      icon: Stethoscope, 
      label: 'Diagnose', 
      page: '/diagnosis', 
      gradient: 'from-green-500 to-green-600',
      description: 'Symptom analysis'
    },
    { 
      icon: BookOpen, 
      label: 'Knowledge', 
      page: '/knowledge', 
      gradient: 'from-purple-500 to-purple-600',
      description: 'Medical database'
    },
    { 
      icon: History, 
      label: 'History', 
      page: '/history', 
      gradient: 'from-orange-500 to-orange-600',
      description: 'Past consultations'
    },
  ];

  const recentCases = [
    {
      id: 1,
      priority: 'emergency',
      title: 'Chest pain - Acute',
      time: '2 hours ago',
      description: 'Male, 45 years, acute chest discomfort with radiating pain',
      icon: '🔴',
      color: 'border-red-200 bg-red-50'
    },
    {
      id: 2,
      priority: 'moderate',
      title: 'Diabetes Follow-up',
      time: '1 day ago',
      description: 'Follow-up consultation for blood sugar management',
      icon: '🟡',
      color: 'border-yellow-200 bg-yellow-50'
    },
    {
      id: 3,
      priority: 'routine',
      title: 'Pediatric Skin Rash',
      time: '2 days ago',
      description: 'Child, 8 years, allergic reaction assessment',
      icon: '🟢',
      color: 'border-green-200 bg-green-50'
    },
  ];

  const stats = [
    { label: 'Cases Today', value: '12', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Patients Helped', value: '156', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Success Rate', value: '94%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Avg Response', value: '2.3s', icon: Zap, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl shadow-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, Dr. Sarah 👋</h1>
              <p className="text-blue-100 text-lg">
                Here's what's happening with your patients today
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
              <Heart className="w-8 h-8 text-white animate-pulse" />
              <div>
                <p className="text-sm text-blue-100">System Status</p>
                <p className="font-bold">All Systems Online</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border-2 border-gray-100 hover:border-blue-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-600" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => navigate(action.page)}
                  className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-blue-300 text-left"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{action.label}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Cases */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Recent Cases
            </h3>
            <div className="space-y-3">
              {recentCases.map((case_) => (
                <div
                  key={case_.id}
                  className={`p-4 border-2 ${case_.color} rounded-xl hover:shadow-md cursor-pointer transition-all`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{case_.icon}</span>
                      <div>
                        <h4 className="font-bold text-gray-900">{case_.title}</h4>
                        <p className="text-xs text-gray-500">{case_.time}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      case_.priority === 'emergency' ? 'bg-red-100 text-red-700' :
                      case_.priority === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {case_.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{case_.description}</p>
                </div>
              ))}
              <button
                onClick={() => navigate('/history')}
                className="w-full mt-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
              >
                View All Cases →
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-green-600" />
              System Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Gemma 4 Model</p>
                    <p className="text-xs text-gray-600">via Ollama</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                  ONLINE
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Medical Database</p>
                    <p className="text-xs text-gray-600">WHO + CDC Data</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                  SYNCED
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Internet</p>
                    <p className="text-xs text-gray-600">Offline Mode Ready</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                  READY
                </span>
              </div>

              <div className="pt-4 border-t-2 border-gray-100 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Sync</span>
                  <span className="text-sm font-bold text-gray-900">5 min ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Uptime</span>
                  <span className="text-sm font-bold text-gray-900">99.9%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className="text-sm font-bold text-green-600">2.3s avg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-red-900 text-lg mb-2">⚕️ Important Medical Disclaimer</h4>
              <p className="text-red-800 leading-relaxed">
                MediGuide AI is a <strong>clinical decision support tool</strong> powered by Gemma 4. 
                It should <strong>not replace professional medical judgment</strong>. Always consult 
                qualified healthcare professionals for critical medical decisions and patient care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
