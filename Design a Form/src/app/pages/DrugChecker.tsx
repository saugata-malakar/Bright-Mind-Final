import { useState } from 'react';
import { Plus, X, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  Button,
  Input,
  Badge,
  Alert,
} from '../components/ui-components';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
}

export function DrugChecker() {
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
    { id: 2, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
    { id: 3, name: 'Aspirin', dosage: '81mg', frequency: 'Once daily' },
  ]);
  const [newDrug, setNewDrug] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleAddMedication = () => {
    if (!newDrug.trim()) return;

    const newMed: Medication = {
      id: Date.now(),
      name: newDrug,
      dosage: '—',
      frequency: '—',
    };

    setMedications((prev) => [...prev, newMed]);
    setNewDrug('');
  };

  const handleRemoveMedication = (id: number) => {
    setMedications((prev) => prev.filter((med) => med.id !== id));
  };

  const handleCheckInteractions = () => {
    setShowResults(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Alert variant="info">
        <p className="text-sm">
          Enter all current medications to check for potential drug interactions, contraindications, and receive
          dosage recommendations.
        </p>
      </Alert>

      {/* Current Medications */}
      <Card>
        <CardHeader>
          <CardTitle>Current Medications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {medications.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">
              No medications added. Add medications below to check for interactions.
            </p>
          ) : (
            medications.map((med) => (
              <div
                key={med.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{med.name}</p>
                  <p className="text-sm text-gray-600">
                    {med.dosage} - {med.frequency}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveMedication(med.id)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Add New Medication */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Medication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Search drug name..."
              value={newDrug}
              onChange={(e) => setNewDrug(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddMedication();
                }
              }}
            />
            <Button onClick={handleAddMedication}>
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Press Enter or click Add to include medication</p>
        </CardContent>
      </Card>

      {/* Check Button */}
      <div className="flex justify-end">
        <Button
          size="lg"
          onClick={handleCheckInteractions}
          disabled={medications.length === 0}
        >
          Check Interactions
        </Button>
      </div>

      {/* Results */}
      {showResults && (
        <>
          {/* No Major Interactions */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <div>
                  <h4 className="font-semibold text-green-900">No Major Interactions Detected</h4>
                  <p className="text-sm text-green-800 mt-1">
                    The current medication combination appears safe based on available data.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Minor Interactions */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader className="bg-yellow-50">
              <CardTitle className="text-yellow-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Minor Interactions (1)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 bg-white">
              <div className="border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Lisinopril + Aspirin</h4>
                  <Badge variant="warning">Minor</Badge>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Combined use may increase the risk of kidney problems, especially in patients with pre-existing
                  renal impairment or dehydration.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      <p className="font-medium mb-1">Clinical Recommendation:</p>
                      <ul className="list-disc list-inside space-y-1 text-blue-800">
                        <li>Monitor kidney function regularly (every 6 months)</li>
                        <li>Ensure adequate hydration</li>
                        <li>Monitor blood pressure closely</li>
                        <li>Watch for signs of kidney dysfunction</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <Button size="sm" variant="ghost">
                    <Info className="w-3 h-3" />
                    More Information
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>General Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <p className="text-sm text-gray-700">Monitor blood pressure regularly</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <p className="text-sm text-gray-700">Check kidney function every 6 months</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <p className="text-sm text-gray-700">Maintain adequate hydration</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <p className="text-sm text-gray-700">Take medications as prescribed with food if indicated</p>
              </div>
            </CardContent>
          </Card>

          {/* Dosage Information */}
          <Card>
            <CardHeader>
              <CardTitle>Dosage Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {medications.map((med) => (
                <div key={med.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900">{med.name}</h4>
                    <Badge variant="success">Within Range</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Current: {med.dosage} {med.frequency}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Standard range: Appropriate for adult patients</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
