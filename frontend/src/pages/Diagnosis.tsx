import { useState } from 'react';
import { Search, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  Button,
  Input,
  Select,
  Checkbox,
  Textarea,
  Badge,
  Alert,
} from '../components/ui/ui-components';

export default function Diagnosis() {
  const [showResults, setShowResults] = useState(false);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState('');

  const commonSymptoms = [
    'Fever',
    'Cough',
    'Headache',
    'Fatigue',
    'Nausea',
    'Dizziness',
    'Chest Pain',
    'Shortness of Breath',
    'Abdominal Pain',
    'Joint Pain',
    'Sore Throat',
    'Runny Nose',
  ];

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleAnalyze = () => {
    setShowResults(true);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Urgency Level */}
          <Card className="border-yellow-300 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
                <div>
                  <h3 className="text-xl font-bold text-yellow-900">URGENCY LEVEL: MODERATE</h3>
                  <p className="text-yellow-800 mt-1">Recommend medical evaluation within 24 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Differential Diagnosis */}
          <Card>
            <CardHeader>
              <CardTitle>Differential Diagnosis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">1. Viral Upper Respiratory Infection</h4>
                  <Badge variant="info">75%</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Common cold or flu-like illness. Typically self-limiting with supportive care.
                </p>
                <Button size="sm" variant="ghost">
                  <Info className="w-3 h-3" />
                  Learn More
                </Button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">2. Influenza</h4>
                  <Badge variant="warning">20%</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Seasonal flu. May benefit from antiviral treatment if caught early.
                </p>
                <Button size="sm" variant="ghost">
                  <Info className="w-3 h-3" />
                  Learn More
                </Button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">3. COVID-19</h4>
                  <Badge variant="default">5%</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Requires testing for confirmation. Follow local health guidelines for isolation.
                </p>
                <Button size="sm" variant="ghost">
                  <Info className="w-3 h-3" />
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <p className="text-sm text-gray-700">Rest and adequate hydration</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <p className="text-sm text-gray-700">Monitor temperature every 4 hours</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <p className="text-sm text-gray-700">
                  Acetaminophen for fever (if no contraindications)
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <p className="text-sm text-gray-700">Consider rapid flu/COVID testing</p>
              </div>
            </CardContent>
          </Card>

          {/* Warning Signs */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900">Warning Signs - Seek Emergency Care</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <p className="text-sm text-red-800">Difficulty breathing or shortness of breath</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <p className="text-sm text-red-800">Persistent chest pain or pressure</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <p className="text-sm text-red-800">Confusion or inability to stay awake</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <p className="text-sm text-red-800">Bluish lips or face</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="primary">Save to Patient Record</Button>
            <Button variant="secondary">Print Report</Button>
            <Button variant="ghost" onClick={() => setShowResults(false)}>
              New Analysis
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Alert variant="info">
          <p className="text-sm">
            Provide patient information and symptoms for AI-powered diagnosis assistance. This tool helps
            identify possible conditions and recommend next steps.
          </p>
        </Alert>

        {/* Patient Information */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Age" type="number" placeholder="Enter age" value={age} onChange={(e) => setAge(e.target.value)} />
              <Select
                label="Gender"
                options={[
                  { value: '', label: 'Select...' },
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' },
                ]}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
              <Input label="Weight (kg)" type="number" placeholder="Enter weight" />
            </div>
          </CardContent>
        </Card>

        {/* Symptoms Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Primary Symptoms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">Select all symptoms that apply</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {commonSymptoms.map((symptom) => (
                <Checkbox
                  key={symptom}
                  label={symptom}
                  checked={selectedSymptoms.includes(symptom)}
                  onChange={() => handleSymptomToggle(symptom)}
                />
              ))}
            </div>

            <div className="pt-4 space-y-3">
              <Select
                label="Duration"
                options={[
                  { value: '', label: 'Select duration...' },
                  { value: '1', label: 'Less than 24 hours' },
                  { value: '2', label: '1-3 days' },
                  { value: '3', label: '3-7 days' },
                  { value: '4', label: 'More than 1 week' },
                ]}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                <div className="flex gap-4">
                  {['Mild', 'Moderate', 'Severe'].map((severity) => (
                    <label key={severity} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="severity" className="w-4 h-4" />
                      <span className="text-sm">{severity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Any additional details, medical history, recent travel, or other relevant information..."
              rows={4}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Analyze Button */}
        <div className="flex justify-end">
          <Button
            size="lg"
            onClick={handleAnalyze}
            disabled={selectedSymptoms.length === 0}
          >
            <Search className="w-4 h-4" />
            Analyze Symptoms
          </Button>
        </div>
      </div>
    </div>
  );
}
