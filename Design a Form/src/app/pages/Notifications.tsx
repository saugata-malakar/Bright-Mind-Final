import { Bell, Clock, AlertCircle, CheckCircle } from 'lucide-react';

export function Notifications() {
  const reminders = [
    { id: 1, title: 'Student At Risk', desc: 'Carlos Martinez failed the PEMDAS quiz 3 times.', time: '10 mins ago', type: 'alert' },
    { id: 2, title: 'Review Needed', desc: 'Timmy Rogers is struggling with fractions.', time: '1 hour ago', type: 'warning' },
    { id: 3, title: 'Spaced Repetition Due', desc: '5 students have biology terms to review today.', time: '3 hours ago', type: 'info' },
    { id: 4, title: 'Goal Achieved', desc: 'Sarah Kim mastered Linear Equations!', time: 'Yesterday', type: 'success' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-500" />
            Reminders & Notifications
          </h2>
          <button className="text-sm text-orange-600 font-semibold hover:text-orange-700">Mark all as read</button>
        </div>
        <div className="divide-y divide-slate-100">
          {reminders.map(r => (
            <div key={r.id} className="p-5 hover:bg-slate-50 transition-colors flex gap-4 items-start">
              <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                ${r.type === 'alert' ? 'bg-red-100 text-red-600' :
                  r.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                  r.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                  'bg-blue-100 text-blue-600'}`}
              >
                {r.type === 'alert' || r.type === 'warning' ? <AlertCircle className="w-5 h-5" /> :
                 r.type === 'success' ? <CheckCircle className="w-5 h-5" /> :
                 <Clock className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{r.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{r.desc}</p>
                <p className="text-xs text-gray-400 mt-2">{r.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
