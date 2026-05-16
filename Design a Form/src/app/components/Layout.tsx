import { ReactNode, useState } from 'react';
import {
  Home,
  MessageSquare,
  BookOpen,
  History as HistoryIcon,
  Menu,
  X,
  Wifi,
  WifiOff,
  BrainCircuit,
  GraduationCap,
  Bell,
  Search,
  LogOut,
  Settings,
  Info
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isOffline] = useState(false);

  const navigation = [
    { name: 'Dashboard', icon: Home, page: 'dashboard' },
    { name: 'Socratic Tutor', icon: MessageSquare, page: 'tutor' },
    { name: 'Gap Analyzer', icon: BrainCircuit, page: 'analyzer' },
    { name: 'Curriculum Base', icon: BookOpen, page: 'curriculum' },
    { name: 'Student History', icon: HistoryIcon, page: 'history' },
    { name: 'About Us', icon: Info, page: 'about' },
  ];

  const pageTitle = navigation.find((item) => item.page === currentPage)?.name || 'BrightMind';

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col shadow-sm`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
          {sidebarOpen && (
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-sm">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">BrightMind</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;

            return (
              <button
                key={item.name}
                onClick={() => onNavigate(item.page)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-200'
                    : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? '' : 'text-slate-400'}`} />
                {sidebarOpen && <span className="font-medium text-sm">{item.name}</span>}
              </button>
            );
          })}
        </nav>

        {/* Status */}
        {sidebarOpen && (
          <div className="p-4 border-t border-slate-100 space-y-3">
            <div className={`flex items-center gap-2 text-sm ${isOffline ? 'text-red-600' : 'text-emerald-600'}`}>
              {isOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
              <span className="font-medium">{isOffline ? 'Offline Mode' : 'Online'}</span>
              <div className={`w-2 h-2 rounded-full ${isOffline ? 'bg-red-400' : 'bg-emerald-400'} animate-pulse`} />
            </div>
            <p className="text-xs text-slate-400">Gemma 4 · Active</p>

            <button
              onClick={() => { localStorage.clear(); window.location.reload(); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" /> {sidebarOpen && 'Sign Out'}
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-slate-800">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-3">
            {isOffline && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-red-700">Offline</span>
              </div>
            )}
            <button onClick={() => onNavigate('notifications')} className={`p-2 hover:bg-slate-100 rounded-lg transition-colors relative ${currentPage === 'notifications' ? 'bg-slate-100' : ''}`}>
              <Bell className={`w-5 h-5 ${currentPage === 'notifications' ? 'text-orange-500' : 'text-slate-500'}`} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <button onClick={() => onNavigate('settings')} className={`p-2 hover:bg-slate-100 rounded-lg transition-colors ${currentPage === 'settings' ? 'bg-slate-100' : ''}`}>
              <Settings className={`w-5 h-5 ${currentPage === 'settings' ? 'text-orange-500' : 'text-slate-500'}`} />
            </button>
            <div className="w-px h-8 bg-slate-200" />
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-sm font-bold text-white">TD</span>
              </div>
              {sidebarOpen && (
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-slate-800">Teacher Davis</p>
                  <p className="text-xs text-slate-400">Grade 5 · Math</p>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 bg-slate-50">{children}</div>
      </main>
    </div>
  );
}
