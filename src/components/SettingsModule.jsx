import React, { useState, useEffect } from 'react';
import { Save, Database, Calendar, Trash2, ShieldCheck } from 'lucide-react';

const SettingsModule = ({ onSave, initialSettings }) => {
    const [settings, setSettings] = useState(initialSettings || {
        serviceStartDate: '2025-07-10',
        serviceEndDate: '2026-07-10',
        supabaseUrl: '',
        supabaseKey: '',
        userName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(settings);
        alert('Ustawienia zostały zapisane lokalnie.');
    };

    return (
        <div className="p-4 space-y-6">
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-military-500 uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Personalizacja Służby
                </h3>
                <div className="card-military space-y-4">
                    <div>
                        <label className="block text-[10px] text-military-500 uppercase font-bold mb-1">Data rozpoczęcia służby</label>
                        <input
                            type="date"
                            name="serviceStartDate"
                            value={settings.serviceStartDate}
                            onChange={handleChange}
                            className="w-full bg-military-950 border border-military-800 rounded p-2 text-sm text-military-100 focus:border-military-400 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] text-military-500 uppercase font-bold mb-1">Data zakończenia służby</label>
                        <input
                            type="date"
                            name="serviceEndDate"
                            value={settings.serviceEndDate}
                            onChange={handleChange}
                            className="w-full bg-military-950 border border-military-800 rounded p-2 text-sm text-military-100 focus:border-military-400 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] text-military-500 uppercase font-bold mb-1">Pseudonim / Imię</label>
                        <input
                            type="text"
                            name="userName"
                            value={settings.userName}
                            onChange={handleChange}
                            placeholder="np. Rezerwista"
                            className="w-full bg-military-950 border border-military-800 rounded p-2 text-sm text-military-100 focus:border-military-400 outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xs font-bold text-military-500 uppercase tracking-widest flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Synchronizacja Chmury (Supabase)
                </h3>
                <div className="card-military space-y-4">
                    <div>
                        <label className="block text-[10px] text-military-500 uppercase font-bold mb-1">Supabase URL</label>
                        <input
                            type="text"
                            name="supabaseUrl"
                            value={settings.supabaseUrl}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full bg-military-950 border border-military-800 rounded p-2 text-xs text-military-100 focus:border-military-400 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] text-military-500 uppercase font-bold mb-1">Supabase Anon Key</label>
                        <input
                            type="password"
                            name="supabaseKey"
                            value={settings.supabaseKey}
                            onChange={handleChange}
                            placeholder="eyJh..."
                            className="w-full bg-military-950 border border-military-800 rounded p-2 text-xs text-military-100 focus:border-military-400 outline-none"
                        />
                    </div>
                </div>
            </div>

            <button
                onClick={handleSave}
                className="w-full btn-military flex items-center justify-center gap-2 py-4"
            >
                <Save className="w-5 h-5" />
                Zapisz Ustawienia
            </button>

            <div className="pt-10">
                <button
                    onClick={() => {
                        if (confirm('Czy na pewno chcesz usunąć wszystkie dane z tego urządzenia?')) {
                            localStorage.clear();
                            window.location.reload();
                        }
                    }}
                    className="w-full flex items-center justify-center gap-2 text-red-900/50 hover:text-red-500 text-xs font-bold uppercase transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                    Resetuj aplikację
                </button>
            </div>

            <div className="text-center text-[10px] text-military-700 font-mono">
                Dziennik Rezerwy v1.0.0-beta
            </div>
        </div>
    );
};

export default SettingsModule;
