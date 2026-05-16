import { User, Bell, Lock, Shield, CreditCard, Palette, Globe } from 'lucide-react';

export function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Profile Information</h3>
                <p className="text-sm text-gray-500">Update your account details and profile picture.</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700">Edit</button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Notifications & Reminders</h3>
                <p className="text-sm text-gray-500">Configure how you receive student alerts and updates.</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700">Manage</button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Privacy & Security</h3>
                <p className="text-sm text-gray-500">Manage your passwords and secure your account.</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700">Configure</button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Appearance</h3>
                <p className="text-sm text-gray-500">Customize the look and feel of BrightMind.</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700">Customize</button>
          </div>
        </div>
      </div>
    </div>
  );
}
