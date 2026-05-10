import { Search, Filter, Download } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, Input, Button, Badge } from '../components/ui-components';

export function History() {
  const cases = [
    {
      id: 'C-2024-001',
      date: '2024-05-10',
      time: '14:30',
      patient: 'Male, 45 years',
      condition: 'Chest pain - Acute coronary syndrome suspected',
      priority: 'emergency',
      status: 'Referred',
    },
    {
      id: 'C-2024-002',
      date: '2024-05-09',
      time: '11:15',
      patient: 'Female, 32 years',
      condition: 'Diabetes management - Type 2',
      priority: 'moderate',
      status: 'Ongoing',
    },
    {
      id: 'C-2024-003',
      date: '2024-05-08',
      time: '09:45',
      patient: 'Child, 8 years',
      condition: 'Skin rash - Allergic reaction',
      priority: 'routine',
      status: 'Resolved',
    },
    {
      id: 'C-2024-004',
      date: '2024-05-08',
      time: '16:20',
      patient: 'Female, 67 years',
      condition: 'Hypertension - Blood pressure management',
      priority: 'moderate',
      status: 'Follow-up scheduled',
    },
    {
      id: 'C-2024-005',
      date: '2024-05-07',
      time: '10:00',
      patient: 'Male, 28 years',
      condition: 'Upper respiratory infection',
      priority: 'routine',
      status: 'Resolved',
    },
    {
      id: 'C-2024-006',
      date: '2024-05-06',
      time: '13:30',
      patient: 'Female, 54 years',
      condition: 'Migraine - Severe headache',
      priority: 'moderate',
      status: 'Resolved',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'emergency':
        return 'error';
      case 'moderate':
        return 'warning';
      case 'routine':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'success';
      case 'Ongoing':
        return 'info';
      case 'Referred':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input placeholder="Search cases by ID, condition, or patient..." className="pl-10" />
            </div>
            <Button variant="secondary">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button variant="secondary">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Cases</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Resolved</p>
            <p className="text-2xl font-bold text-green-600 mt-1">142</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Ongoing</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">14</p>
          </CardContent>
        </Card>
      </div>

      {/* Cases List */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cases.map((case_) => (
              <div
                key={case_.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-sm font-medium text-gray-700">{case_.id}</span>
                      <Badge variant={getPriorityColor(case_.priority)}>{case_.priority}</Badge>
                      <Badge variant={getStatusColor(case_.status)}>{case_.status}</Badge>
                    </div>
                    <h4 className="font-semibold text-gray-900">{case_.condition}</h4>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>{case_.date}</p>
                    <p>{case_.time}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{case_.patient}</p>
                  <Button size="sm" variant="ghost">
                    View Details →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
