import { X, Stethoscope, MessageSquare, BookOpen, Shield, Wifi } from 'lucide-react';
import { Button, Card } from './ui-components';

interface WelcomeModalProps {
  onClose: () => void;
}

export function WelcomeModal({ onClose }: WelcomeModalProps) {
  const features = [
    {
      icon: MessageSquare,
      title: 'AI-Powered Chat',
      description: 'Get instant medical guidance powered by Gemma 4 AI model',
    },
    {
      icon: Stethoscope,
      title: 'Symptom Analysis',
      description: 'Comprehensive symptom checking and differential diagnosis',
    },
    {
      icon: BookOpen,
      title: 'Medical Knowledge',
      description: 'Access WHO guidelines, drug databases, and protocols offline',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'All data stays on your device with end-to-end encryption',
    },
    {
      icon: Wifi,
      title: 'Works Offline',
      description: 'Full functionality without internet connection',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[var(--medical-blue)] rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Welcome to MediGuide AI</h2>
                <p className="text-gray-600">Empowering healthcare workers with AI assistance</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mission */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Our Mission:</strong> To provide healthcare workers in rural and remote areas with instant
              access to medical expertise, symptom analysis, and treatment recommendations—all without requiring an
              internet connection.
            </p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
            <div className="space-y-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[var(--medical-blue)]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-semibold text-red-900 mb-2">Important Disclaimer</h4>
            <p className="text-sm text-red-800">
              MediGuide AI is a <strong>clinical decision support tool</strong> and should not replace professional
              medical judgment. Always consult qualified healthcare professionals for medical advice, diagnosis, and
              treatment. Use this tool to augment, not replace, your clinical expertise.
            </p>
          </div>

          {/* Technology */}
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Powered by Gemma 4</h4>
            <p className="text-sm text-green-800">
              This application uses Google's Gemma 4 AI model running locally via Ollama, ensuring your patient data
              remains private and accessible even without internet connectivity.
            </p>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <Button className="flex-1" onClick={onClose}>
              Get Started
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Take a Tour
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
