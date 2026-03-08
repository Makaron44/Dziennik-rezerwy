import React, { useState } from 'react';
import { Target, AlertCircle } from 'lucide-react';

const ReadinessBoard = () => {
    const [units, setUnits] = useState([
        { id: 1, name: '1. Pluton', status: 'W POLU', color: 'text-orange-500' },
        { id: 2, name: '2. Pluton', status: 'BAZA', color: 'text-green-500' },
        { id: 3, name: 'Drużyna Dowodzenia', status: 'W GOTOWOŚCI', color: 'text-blue-500' },
        { id: 4, name: 'Zesp. Zabezpieczenia', status: 'ODPOCZYNEK', color: 'text-military-600' },
    ]);

    const toggleStatus = (id) => {
        const statuses = ['BAZA', 'W POLU', 'W GOTOWOŚCI', 'ODPOCZYNEK'];
        const colors = ['text-green-500', 'text-orange-500', 'text-blue-500', 'text-military-600'];

        setUnits(units.map(u => {
            if (u.id === id) {
                const nextIdx = (statuses.indexOf(u.status) + 1) % statuses.length;
                return { ...u, status: statuses[nextIdx], color: colors[nextIdx] };
            }
            return u;
        }));
    };

    return (
        <div className="space-y-4">
            <div className="card-military">
                <h3 className="text-xs font-bold text-military-100 uppercase tracking-widest flex items-center gap-2 mb-4">
                    <Target className="w-4 h-4 text-military-400" />
                    Tablica Gotowości Bojowej
                </h3>

                <div className="grid grid-cols-1 gap-2">
                    {units.map(unit => (
                        <button
                            key={unit.id}
                            onClick={() => toggleStatus(unit.id)}
                            className="flex justify-between items-center p-3 bg-military-950/30 rounded border border-military-800 hover:border-military-600 transition-all text-left"
                        >
                            <span className="text-sm font-bold text-military-100">{unit.name}</span>
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-black uppercase tracking-tighter ${unit.color}`}>
                                    {unit.status}
                                </span>
                                <div className={`w-2 h-2 rounded-full animate-pulse ${unit.color.replace('text', 'bg')}`}></div>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-4 flex items-start gap-2 p-2 bg-blue-950/20 rounded border border-blue-900/30">
                    <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <p className="text-[10px] text-blue-400 leading-tight">
                        Kliknij na pododdział, aby zmienić jego aktualny status operacyjny.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReadinessBoard;
