import {
  MessageSquare,
  Stethoscope,
  BookOpen,
  History,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Database,
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, Button, Badge } from '../components/ui-components';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const quickActions = [
    { icon: MessageSquare, label: 'New Chat', page: 'chat', color: 'bg-blue-500' },
    { icon: Stethoscope, label: 'Diagnose', page: 'symptoms', color: 'bg-green-500' },
    { icon: BookOpen, label: 'Knowledge', page: 'knowledge', color: 'bg-purple-500' },
    { icon: History, label: 'History', page: 'history', color: 'bg-orange-500' },
  ];

  const recentCases = [
    {
      id: 1,
      priority: 'emergency',
      title: 'Chest pain',
      time: '2 hours ago',
      description: 'Male, 45 years, acute chest discomfort',
    },
    {
      id: 2,
      priority: 'moderate',
      title: 'Diabetes management',
      time: '1 day ago',
      description: 'Follow-up consultation for blood sugar control',
    },
    {
      id: 3,
      priority: 'routine',
      title: 'Skin rash',
      time: '2 days ago',
      description: 'Child, 8 years, allergic reaction assessment',
    },
  ];

  const systemStatus = [
    { label: 'Gemma 4 Model', status: 'Online', icon: Activity, variant: 'success' as const },
    { label: 'Medical Database', status: 'Synced', icon: Database, variant: 'success' as const },
    { label: 'Internet', status: 'Connected', icon: CheckCircle2, variant: 'success' as const },
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

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'emergency':
        return '🔴';
      case 'moderate':
        return '🟡';
      case 'routine':
        return '🟢';
      default:
        return '⚪';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, Dr. Sarah</h2>
        <p className="text-gray-600 mt-1">Here's what's happening with your patients today</p>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card
                key={action.label}
                className="cursor-pointer hover:shadow-lg transition-all"
                onClick={() => onNavigate(action.page)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{action.label}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Cases and System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Cases */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentCases.map((case_) => (
              <div
                key={case_.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getPriorityIcon(case_.priority)}</span>
                    <span className="font-medium text-gray-900">{case_.title}</span>
                  </div>
                  <Badge variant={getPriorityColor(case_.priority)}>{case_.priority}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{case_.description}</p>
                <p className="text-xs text-gray-500">{case_.time}</p>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-2" onClick={() => onNavigate('history')}>
              View All Cases
            </Button>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemStatus.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                  <Badge variant={item.variant}>{item.status}</Badge>
                </div>
              );
            })}

            <div className="pt-4 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Last Sync:</span>
                <span className="font-medium">5 min ago</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Cases Today:</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Patients Helped:</span>
                <span className="font-medium">156</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Notice */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-900">Important Reminder</h4>
              <p className="text-sm text-red-800 mt-1">
                MediGuide AI is a decision support tool and should not replace professional medical judgment.
                Always consult qualified healthcare professionals for critical decisions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
