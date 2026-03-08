import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Book, Shield, Settings, Home, Briefcase } from 'lucide-react';

// Moduły
import WeatherWidget from './components/WeatherWidget';
import CalendarModule from './components/CalendarModule';
import NotesModule from './components/NotesModule';
import MilitaryRefModule from './components/MilitaryRefModule';
import SettingsModule from './components/SettingsModule';
import StaffModule from './components/StaffModule';

const Dashboard = ({ settings }) => {
  const calculateDDC = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const calculateProgress = (start, end) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const nowTime = new Date().getTime();

    if (nowTime < startTime) return 0;
    if (nowTime > endTime) return 100;

    const total = endTime - startTime;
    const current = nowTime - startTime;
    return (current / total) * 100;
  };

  const ddc = calculateDDC(settings.serviceEndDate || '2026-07-10');
  const progress = calculateProgress(
    settings.serviceStartDate || '2025-07-10',
    settings.serviceEndDate || '2026-07-10'
  );

  return (
    <div className="space-y-4 p-4">
      <div className="card-military overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-military-800/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <h2 className="text-sm font-bold text-military-400 uppercase tracking-widest flex items-center gap-2 mb-6">
          <Shield className="w-4 h-4" />
          Status Operacyjny {settings.userName ? `- ${settings.userName}` : ''}
        </h2>

        <div className="flex justify-around items-end">
          <div className="text-center">
            <p className="text-5xl font-black text-military-50 tracking-tighter">{ddc}</p>
            <p className="text-[10px] text-military-500 uppercase font-bold mt-1">Dni do cywila</p>
          </div>
          <div className="h-12 w-px bg-military-800"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-military-100 italic">WZ. 93</p>
            <p className="text-[10px] text-military-500 uppercase font-bold mt-1">Umundurowanie</p>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between text-[8px] font-bold text-military-600 mb-1 uppercase">
            <span>Służba w toku</span>
            <span>{Math.round(progress)}% Gotowości</span>
          </div>
          <div className="w-full bg-military-950/50 rounded-full h-1.5 overflow-hidden border border-military-800/30">
            <div className="bg-military-400 h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      <WeatherWidget />

      <div className="grid grid-cols-2 gap-4">
        <div className="card-military p-3 text-center border-military-700/50">
          <p className="text-[10px] text-military-500 uppercase mb-1">Koniec Służby</p>
          <p className="text-xs font-medium text-military-100">{settings.serviceEndDate || 'Nieskonfigurowano'}</p>
        </div>
        <div className="card-military p-3 text-center border-military-700/50">
          <p className="text-[10px] text-military-500 uppercase mb-1">Dzień Służby</p>
          <p className="text-xs font-medium text-military-100">
            {new Intl.DateTimeFormat('pl-PL', { weekday: 'long' }).format(new Date())}
          </p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('military_journal_settings');
    return saved ? JSON.parse(saved) : {
      serviceStartDate: '2025-07-10',
      serviceEndDate: '2026-07-10',
      supabaseUrl: '',
      supabaseKey: '',
      userName: ''
    };
  });

  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('military_journal_settings', JSON.stringify(newSettings));
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen pb-24 bg-military-950 text-military-50 font-sans selection:bg-military-400/30">
      <header className="sticky top-0 z-20 bg-military-950/90 backdrop-blur-xl border-b border-military-900 px-6 py-4 flex justify-between items-center shadow-lg shadow-black/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-military-100 rounded flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <Shield className="w-5 h-5 text-military-950 fill-military-950" />
          </div>
          <h1 className="text-sm font-black tracking-[0.2em] text-military-50 uppercase">
            Dziennik Rezerwy
          </h1>
        </div>
        <button
          onClick={() => setActiveTab('settings')}
          className={`p-2 rounded-full transition-colors ${activeTab === 'settings' ? 'bg-military-800 text-military-100' : 'text-military-400 hover:bg-military-900'}`}
        >
          <Settings className="w-5 h-5" />
        </button>
      </header>

      <main className="animate-in fade-in duration-500">
        {activeTab === 'home' && <Dashboard settings={settings} />}
        {activeTab === 'calendar' && <CalendarModule serviceStart={settings.serviceStartDate} serviceEnd={settings.serviceEndDate} />}
        {activeTab === 'notes' && <NotesModule />}
        {activeTab === 'staff' && <StaffModule />}
        {activeTab === 'ref' && <MilitaryRefModule />}
        {activeTab === 'settings' && <SettingsModule onSave={saveSettings} initialSettings={settings} />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-[600px] mx-auto z-30">
        <div className="mx-2 mb-6 bg-military-900/95 backdrop-blur-xl border border-military-800/50 rounded-2xl px-2 py-3 shadow-2xl flex justify-around items-center shadow-black/40">
          <NavItem icon={<Home />} label="Start" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<CalendarIcon />} label="DDC" active={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')} />
          <NavItem icon={<Briefcase />} label="Sztab" active={activeTab === 'staff'} onClick={() => setActiveTab('staff')} />
          <NavItem icon={<Book />} label="Notatki" active={activeTab === 'notes'} onClick={() => setActiveTab('notes')} />
          <NavItem icon={<Shield />} label="Ściąga" active={activeTab === 'ref'} onClick={() => setActiveTab('ref')} />
        </div>
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all duration-300 relative group px-2 ${active ? 'text-military-100' : 'text-military-600 hover:text-military-400'}`}
  >
    {active && (
      <span className="absolute -top-1 w-1 h-1 bg-military-100 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
    )}
    <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'scale-100'}`}>
      {React.cloneElement(icon, { size: 20, strokeWidth: active ? 2.5 : 2 })}
    </div>
    <span className={`text-[8px] font-bold uppercase tracking-wider transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-60'}`}>
      {label}
    </span>
  </button>
);

export default App;
