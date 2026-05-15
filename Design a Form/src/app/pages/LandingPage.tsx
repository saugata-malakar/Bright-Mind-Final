import { GraduationCap, BrainCircuit, Globe, Zap, Shield, Users, ChevronRight, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: <BrainCircuit className="w-7 h-7" />,
      title: 'Multi-Agent AI Tutoring',
      description: 'Specialized Gemma 4 agents for Math, Science, and Humanities adapt to each student in real-time.',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Bloom's Taxonomy Engine",
      description: 'Dynamically adjusts question difficulty based on cognitive level — from recall to creation.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: '100% Offline-First',
      description: 'Works without internet. Perfect for rural classrooms, refugee camps, and remote schools.',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'Emotion-Aware Adaptation',
      description: 'Detects student frustration or boredom and adjusts the AI tone for maximum engagement.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: 'At-Risk Student Alerts',
      description: 'Predictive analytics warn teachers before a student falls behind — early intervention saves futures.',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: <Star className="w-7 h-7" />,
      title: 'Spaced Repetition (SM-2)',
      description: 'Scientifically optimal review scheduling ensures students retain what they learn forever.',
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  const stats = [
    { value: '10x', label: 'Faster Learning' },
    { value: '95%', label: 'Retention Rate' },
    { value: '0', label: 'Internet Required' },
    { value: '24/7', label: 'Always Available' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              CogniCore
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#how" className="hover:text-blue-600 transition-colors">How It Works</a>
            <a href="#impact" className="hover:text-blue-600 transition-colors">Impact</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onGetStarted}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={onGetStarted}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-blue-200 transition-all hover:-translate-y-0.5"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-40 animate-pulse" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-indigo-100 rounded-full filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-sm font-medium text-blue-700 mb-8">
              <Zap className="w-4 h-4" />
              Powered by Google Gemma 4
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
              Education That{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Adapts to You
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed mb-10">
              CogniCore is an offline-first AI tutor that uses Gemma 4 to deliver 
              personalized Socratic learning to every student — even without internet.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-2xl hover:shadow-2xl hover:shadow-blue-200 transition-all hover:-translate-y-1 flex items-center gap-2"
              >
                Start Learning Free <ChevronRight className="w-5 h-5" />
              </button>
              <a
                href="#features"
                className="px-8 py-4 bg-gray-50 text-gray-700 text-lg font-semibold rounded-2xl border border-gray-200 hover:bg-gray-100 transition-all"
              >
                See How It Works
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-extrabold text-white">{stat.value}</div>
              <div className="text-blue-100 text-sm mt-1 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Groundbreaking Features
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Six innovative AI services working together to create the most adaptive educational experience ever built.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Ready to Transform Education?
          </h2>
          <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
            Join thousands of teachers and students already using CogniCore 
            to close learning gaps in communities that need it most.
          </p>
          <button
            onClick={onGetStarted}
            className="px-10 py-5 bg-white text-blue-700 text-lg font-bold rounded-2xl hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            Get Started — It's Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-800">CogniCore</span>
          </div>
          <p className="text-sm text-gray-500">
            Built with ❤️ for the Gemma 4 Good Hackathon · Powered by Google DeepMind
          </p>
        </div>
      </footer>
    </div>
  );
}
