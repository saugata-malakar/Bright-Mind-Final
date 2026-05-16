import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { Dashboard } from './pages/Dashboard';
import { TutorSession } from './pages/TutorSession';
import { GapAnalyzer } from './pages/GapAnalyzer';
import { CurriculumBase } from './pages/CurriculumBase';
import { History } from './pages/History';
import { WelcomeModal } from './components/WelcomeModal';
import { Settings } from './pages/Settings';
import { Notifications } from './pages/Notifications';
import { About } from './pages/About';

type AppView = 'landing' | 'auth' | 'app';

export default function App() {
  const [view, setView] = useState<AppView>('landing');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check if user is already "logged in"
    const isLoggedIn = localStorage.getItem('brightmind-logged-in');
    if (isLoggedIn) {
      setView('app');
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('brightmind-logged-in', 'true');
    const hasSeenWelcome = localStorage.getItem('brightmind-welcome-seen');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
    setView('app');
  };

  const handleCloseWelcome = () => {
    localStorage.setItem('brightmind-welcome-seen', 'true');
    setShowWelcome(false);
  };

  // Landing Page
  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('auth')} />;
  }

  // Auth Page
  if (view === 'auth') {
    return <AuthPage onLogin={handleLogin} onBack={() => setView('landing')} />;
  }

  // Main App (after login)
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'tutor':
        return <TutorSession />;
      case 'analyzer':
        return <GapAnalyzer />;
      case 'curriculum':
        return <CurriculumBase />;
      case 'history':
        return <History />;
      case 'about':
        return <About />;
      case 'settings':
        return <Settings />;
      case 'notifications':
        return <Notifications />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="size-full">
      <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderPage()}
      </Layout>
      {showWelcome && <WelcomeModal onClose={handleCloseWelcome} />}
    </div>
  );
}