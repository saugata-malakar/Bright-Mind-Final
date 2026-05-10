import { Search, Heart, Lungs, Brain, Pill, AlertCircle, Baby, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, Input } from '../components/ui-components';

export function KnowledgeBase() {
  const categories = [
    { icon: Heart, name: 'Cardiology', count: 245, color: 'bg-red-500' },
    { icon: Lungs, name: 'Respiratory', count: 189, color: 'bg-blue-500' },
    { icon: Brain, name: 'Neurology', count: 167, color: 'bg-purple-500' },
    { icon: Pill, name: 'Pharmacy', count: 423, color: 'bg-green-500' },
    { icon: AlertCircle, name: 'Emergency', count: 98, color: 'bg-orange-500' },
    { icon: Baby, name: 'Pediatrics', count: 156, color: 'bg-pink-500' },
  ];

  const quickReference = [
    {
      title: 'WHO Essential Medicines List',
      description: 'Complete list of essential medications for primary healthcare',
      items: 423,
    },
    {
      title: 'Emergency Protocols',
      description: 'Step-by-step guides for common medical emergencies',
      items: 98,
    },
    {
      title: 'Drug Interaction Database',
      description: 'Comprehensive database of medication interactions',
      items: 1247,
    },
    {
      title: 'Vaccination Schedules',
      description: 'Age-appropriate immunization guidelines',
      items: 34,
    },
    {
      title: 'Common Conditions Guide',
      description: 'Diagnosis and treatment for frequent medical conditions',
      items: 267,
    },
    {
      title: 'Clinical Calculators',
      description: 'Medical calculators for dosing, risk assessment, and more',
      items: 45,
    },
  ];

  const recentlyAccessed = [
    { title: 'Malaria Treatment Guidelines', time: '2 hours ago' },
    { title: 'Hypertension Management Protocol', time: '1 day ago' },
    { title: 'Wound Care Best Practices', time: '2 days ago' },
    { title: 'Diabetes Medication Overview', time: '3 days ago' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search medical knowledge base, guidelines, protocols..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.name}
                className="cursor-pointer hover:shadow-lg transition-all"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{category.name}</p>
                      <p className="text-xs text-gray-500">{category.count} items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Reference */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Reference</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickReference.map((item) => (
              <div
                key={item.title}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[var(--medical-blue)]" />
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                  </div>
                  <span className="text-xs text-gray-500">{item.items} items</span>
                </div>
                <p className="text-sm text-gray-600 ml-7">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recently Accessed */}
        <Card>
          <CardHeader>
            <CardTitle>Recently Accessed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentlyAccessed.map((item, index) => (
              <div key={index} className="pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                <p className="text-sm font-medium text-gray-900 hover:text-[var(--medical-blue)] cursor-pointer">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">{item.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Featured Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Featured Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">WHO COVID-19 Management</h4>
              <p className="text-sm text-blue-800 mb-3">
                Latest guidelines for COVID-19 diagnosis, treatment, and prevention in resource-limited settings.
              </p>
              <button className="text-sm font-medium text-blue-700 hover:text-blue-900">
                View Guidelines →
              </button>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Maternal Health Protocols</h4>
              <p className="text-sm text-green-800 mb-3">
                Comprehensive prenatal care and emergency obstetric protocols for rural healthcare.
              </p>
              <button className="text-sm font-medium text-green-700 hover:text-green-900">
                View Guidelines →
              </button>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Antibiotic Stewardship</h4>
              <p className="text-sm text-purple-800 mb-3">
                Evidence-based guidelines for appropriate antibiotic use and resistance prevention.
              </p>
              <button className="text-sm font-medium text-purple-700 hover:text-purple-900">
                View Guidelines →
              </button>
            </div>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">Trauma Management</h4>
              <p className="text-sm text-orange-800 mb-3">
                Emergency trauma care protocols and stabilization techniques for rural settings.
              </p>
              <button className="text-sm font-medium text-orange-700 hover:text-orange-900">
                View Guidelines →
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
