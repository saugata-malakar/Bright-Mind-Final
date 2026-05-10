import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import Layout from '@/components/layout/Layout'
import Dashboard from '@/pages/Dashboard'
import Chat from '@/pages/Chat'
import Diagnosis from '@/pages/Diagnosis'
import KnowledgeBase from '@/pages/KnowledgeBase'
import History from '@/pages/History'
import Settings from '@/pages/Settings'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/diagnosis" element={<Diagnosis />} />
          <Route path="/knowledge" element={<KnowledgeBase />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  )
}

export default App
