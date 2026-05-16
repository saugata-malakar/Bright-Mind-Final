import { Building2, Users, Globe, Target, Shield, Heart } from 'lucide-react';

export function About() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 via-red-600 to-rose-700 rounded-2xl p-10 text-white shadow-lg text-center">
        <h1 className="text-4xl font-extrabold mb-4">About BrightMind</h1>
        <p className="text-xl text-orange-100 max-w-2xl mx-auto">
          We are on a mission to democratize education globally, providing world-class, adaptive AI tutoring to every student, everywhere — even without an internet connection.
        </p>
      </div>

      {/* Values */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Our Mission</h3>
          <p className="text-gray-600 text-sm">To bridge the educational divide by making personalized Socratic tutoring accessible offline to remote communities.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Global Impact</h3>
          <p className="text-gray-600 text-sm">Deployed in rural schools and refugee camps, reaching thousands of students who lack reliable internet access.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy First</h3>
          <p className="text-gray-600 text-sm">Offline-first architecture ensures that student data never leaves the local device, guaranteeing 100% privacy.</p>
        </div>
      </div>

      {/* Story */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Building2 className="w-6 h-6 text-orange-500" />
          Our Story
        </h2>
        <div className="prose max-w-none text-gray-600 space-y-4">
          <p>
            Founded during the Gemma 4 Good Hackathon, BrightMind started with a simple observation: the world's most advanced AI models are typically locked behind cloud APIs, making them inaccessible to the students who need them most.
          </p>
          <p>
            By leveraging Google's Gemma 4 and Ollama's local execution capabilities, we built an educational platform that brings hyper-adaptive, Socratic-style tutoring directly to low-end devices in rural classrooms.
          </p>
          <p>
            Today, BrightMind is a commercial-ready platform empowering teachers with real-time analytics and empowering students with infinite patience and personalized guidance.
          </p>
        </div>
      </div>
    </div>
  );
}
