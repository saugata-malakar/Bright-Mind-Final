import { X, GraduationCap, BrainCircuit, Globe } from 'lucide-react';

interface WelcomeModalProps {
  onClose: () => void;
}

export function WelcomeModal({ onClose }: WelcomeModalProps) {
  const features = [
    {
      icon: <GraduationCap className="w-6 h-6 text-orange-600" />,
      title: 'Socratic AI Tutor',
      description: 'Gemma 4 guides students to answers without just giving them away.',
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-orange-600" />,
      title: 'Knowledge Gap Analyzer',
      description: 'Upload math worksheets to let AI identify missing foundational concepts.',
    },
    {
      icon: <Globe className="w-6 h-6 text-green-600" />,
      title: 'Offline Curriculum Base',
      description: 'Access textbooks and encyclopedia articles completely offline.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to BrightMind</h2>
          <p className="text-gray-600 text-lg">
            Your offline hyper-adaptive educational platform powered by Gemma 4.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-orange-200"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
