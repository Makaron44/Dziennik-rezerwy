import React from 'react';
import { Clock } from 'lucide-react';

const CalendarModule = ({ serviceStart = '2025-07-10', serviceEnd = '2026-07-10' }) => {
    const calculateDDC = () => {
        const end = new Date(serviceEnd);
        const now = new Date();
        const diffTime = end - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    const calculateProgress = () => {
        const startTime = new Date(serviceStart).getTime();
        const endTime = new Date(serviceEnd).getTime();
        const nowTime = new Date().getTime();

        if (nowTime < startTime) return 0;
        if (nowTime > endTime) return 100;

        const total = endTime - startTime;
        const current = nowTime - startTime;
        return (current / total) * 100;
    };

    const ddc = calculateDDC();
    const progress = calculateProgress();

    return (
        <div className="space-y-4 p-4">
            <div className="card-military text-center py-8">
                <p className="text-sm font-bold text-military-500 uppercase tracking-[0.2em] mb-2">Dni Do Cywila</p>
                <h2 className="text-7xl font-black text-military-100 font-mono tracking-tighter shadow-military-950">
                    {ddc}
                </h2>
                <div className="mt-2 text-xs text-military-400 space-y-1">
                    <p>Początek: {serviceStart}</p>
                    <p>Koniec: {serviceEnd}</p>
                </div>

                <div className="mt-8 px-4">
                    <div className="flex justify-between text-[10px] uppercase font-bold text-military-500 mb-2">
                        <span>Pobór</span>
                        <span>{Math.round(progress)}% ZALICZONE</span>
                        <span>Cywil</span>
                    </div>
                    <div className="w-full bg-military-950/50 rounded-full h-4 p-1 border border-military-800">
                        <div
                            className="bg-gradient-to-r from-military-700 to-military-400 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(122,137,122,0.3)]"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="card-military">
                <h3 className="text-sm font-bold text-military-100 flex items-center gap-2 mb-4 uppercase tracking-wider">
                    <Clock className="w-4 h-4 text-military-400" />
                    Szczegóły Czasu
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-military-950/50 rounded border border-military-800/50">
                        <p className="text-[10px] text-military-500 uppercase">Tygodni</p>
                        <p className="text-xl font-bold text-military-100 font-mono">{Math.floor(ddc / 7)}</p>
                    </div>
                    <div className="p-3 bg-military-950/50 rounded border border-military-800/50">
                        <p className="text-[10px] text-military-500 uppercase">Godzin</p>
                        <p className="text-xl font-bold text-military-100 font-mono">{ddc * 24}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarModule;
