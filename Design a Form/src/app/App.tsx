import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Chat } from './pages/Chat';
import { SymptomChecker } from './pages/SymptomChecker';
import { DrugChecker } from './pages/DrugChecker';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { History } from './pages/History';
import { WelcomeModal } from './components/WelcomeModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('mediguide-welcome-seen');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  const handleCloseWelcome = () => {
    localStorage.setItem('mediguide-welcome-seen', 'true');
    setShowWelcome(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'chat':
        return <Chat />;
      case 'symptoms':
        return <SymptomChecker />;
      case 'drugs':
        return <DrugChecker />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'history':
        return <History />;
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