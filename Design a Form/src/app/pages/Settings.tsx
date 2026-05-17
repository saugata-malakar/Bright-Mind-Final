import { useState } from 'react';
import { User, Bell, Lock, Palette, Check, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Settings() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  
  // Settings States
  const [name, setName] = useState('Teacher Davis');
  const [email, setEmail] = useState('davis@brightmind.edu');
  const [notifications, setNotifications] = useState({ email: true, push: true, digest: false });
  const [theme, setTheme] = useState('light');

  const handleSave = (section: string) => {
    setSaved(section);
    setTimeout(() => {
      setSaved(null);
      setActiveSection(null);
    }, 1500);
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
          <p className="text-gray-500 mt-1">Manage your profile, preferences, and security.</p>
        </div>
        
        <div className="divide-y divide-slate-100">
          {/* Profile Section */}
          <div className="p-6 transition-colors hover:bg-slate-50">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('profile')}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Profile Information</h3>
                  <p className="text-sm text-gray-500">Update your account details and profile picture.</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-100 text-gray-700 transition-colors">
                {activeSection === 'profile' ? 'Close' : 'Edit'}
              </button>
            </div>
            
            <AnimatePresence>
              {activeSection === 'profile' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="pt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" />
                      </div>
                    </div>
                    <button onClick={() => handleSave('profile')} className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium transition-colors">
                      {saved === 'profile' ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                      {saved === 'profile' ? 'Saved!' : 'Save Changes'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications Section */}
          <div className="p-6 transition-colors hover:bg-slate-50">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('notifications')}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Notifications & Reminders</h3>
                  <p className="text-sm text-gray-500">Configure how you receive student alerts and updates.</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-100 text-gray-700 transition-colors">
                {activeSection === 'notifications' ? 'Close' : 'Manage'}
              </button>
            </div>

            <AnimatePresence>
              {activeSection === 'notifications' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="pt-6 space-y-4">
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={notifications.email} onChange={(e) => setNotifications({...notifications, email: e.target.checked})} className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500" />
                        <span className="text-sm font-medium text-gray-700">Email Alerts for "At-Risk" Students</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={notifications.push} onChange={(e) => setNotifications({...notifications, push: e.target.checked})} className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500" />
                        <span className="text-sm font-medium text-gray-700">Push Notifications for Goal Achievements</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={notifications.digest} onChange={(e) => setNotifications({...notifications, digest: e.target.checked})} className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500" />
                        <span className="text-sm font-medium text-gray-700">Weekly Progress Digest</span>
                      </label>
                    </div>
                    <button onClick={() => handleSave('notifications')} className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium transition-colors">
                      {saved === 'notifications' ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                      {saved === 'notifications' ? 'Saved!' : 'Save Preferences'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Security Section */}
          <div className="p-6 transition-colors hover:bg-slate-50">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('security')}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Privacy & Security</h3>
                  <p className="text-sm text-gray-500">Manage your passwords and secure your account.</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-100 text-gray-700 transition-colors">
                {activeSection === 'security' ? 'Close' : 'Configure'}
              </button>
            </div>

            <AnimatePresence>
              {activeSection === 'security' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="pt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Current Password</label>
                        <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                      </div>
                    </div>
                    <button onClick={() => handleSave('security')} className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium transition-colors">
                      {saved === 'security' ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                      {saved === 'security' ? 'Updated!' : 'Update Password'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Appearance Section */}
          <div className="p-6 transition-colors hover:bg-slate-50">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('appearance')}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <Palette className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Appearance</h3>
                  <p className="text-sm text-gray-500">Customize the look and feel of BrightMind.</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-100 text-gray-700 transition-colors">
                {activeSection === 'appearance' ? 'Close' : 'Customize'}
              </button>
            </div>

            <AnimatePresence>
              {activeSection === 'appearance' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="pt-6 space-y-4">
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setTheme('light')} 
                        className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${theme === 'light' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}
                      >
                        Light Mode
                      </button>
                      <button 
                        onClick={() => setTheme('dark')} 
                        className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${theme === 'dark' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 bg-slate-800 text-gray-300 hover:border-gray-300'}`}
                      >
                        Dark Mode
                      </button>
                    </div>
                    <button onClick={() => handleSave('appearance')} className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium transition-colors mt-2">
                      {saved === 'appearance' ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                      {saved === 'appearance' ? 'Applied!' : 'Apply Theme'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
