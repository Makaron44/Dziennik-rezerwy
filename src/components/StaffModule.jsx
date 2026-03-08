import React, { useState } from 'react';
import { Briefcase, Ambulance, Clock, Map, Target } from 'lucide-react';

// Sub-moduły
import MedevacForm from './MedevacForm';
import OperationsSchedule from './OperationsSchedule';
import MGRSTool from './MGRSTool';
import ReadinessBoard from './ReadinessBoard';

const StaffModule = () => {
    const [activeTool, setActiveTool] = useState('menu');

    const tools = [
        { id: 'medevac', name: 'MEDEVAC 9-Line', icon: <Ambulance />, component: <MedevacForm />, color: 'bg-red-950/20' },
        { id: 'schedule', name: 'Harmonogram', icon: <Clock />, component: <OperationsSchedule />, color: 'bg-military-800/20' },
        { id: 'mgrs', name: 'MGRS / Koordynaty', icon: <Map />, component: <MGRSTool />, color: 'bg-military-800/20' },
        { id: 'readiness', name: 'Gotowość Bojowa', icon: <Target />, component: <ReadinessBoard />, color: 'bg-blue-950/20' },
    ];

    if (activeTool !== 'menu') {
        const tool = tools.find(t => t.id === activeTool);
        return (
            <div className="p-4 space-y-4 animate-in fade-in duration-300">
                <button
                    onClick={() => setActiveTool('menu')}
                    className="text-xs font-bold text-military-500 uppercase flex items-center gap-2 mb-2 hover:text-military-400 transition-colors"
                >
                    ← Powrót do menu sztabu
                </button>
                {tool.component}
            </div>
        );
    }

    return (
        <div className="p-4 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="card-military p-4 bg-military-900 border-military-800 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-military-500/10 rounded-full blur-2xl"></div>
                <h2 className="text-sm font-black text-military-100 uppercase tracking-[0.2em] flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-military-400" />
                    Sekcja Sztabowa
                </h2>
                <p className="mt-2 text-[10px] text-military-500 uppercase leading-relaxed font-medium">
                    Narzędzia wspomagające dowodzenie, planowanie oraz ewakuację medyczną.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {tools.map((tool) => (
                    <button
                        key={tool.id}
                        onClick={() => setActiveTool(tool.id)}
                        className={`card-military ${tool.color} flex flex-col items-center justify-center p-6 gap-3 hover:border-military-400 transition-all active:scale-95`}
                    >
                        <div className="text-military-100 transition-transform group-hover:scale-110">
                            {React.cloneElement(tool.icon, { size: 32, strokeWidth: 1.5 })}
                        </div>
                        <span className="text-[10px] font-bold text-center uppercase tracking-widest text-military-100">
                            {tool.name}
                        </span>
                    </button>
                ))}
            </div>

            <div className="mt-8 p-4 rounded-lg bg-yellow-950/10 border border-yellow-900/20 text-center">
                <p className="text-[10px] text-yellow-600 font-bold uppercase tracking-tighter">
                    Pamiętaj: Nie wprowadzaj danych niejawnych do aplikacji.
                </p>
            </div>
        </div>
    );
};

export default StaffModule;
