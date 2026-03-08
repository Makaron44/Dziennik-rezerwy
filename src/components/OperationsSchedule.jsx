import React, { useState, useEffect } from 'react';
import { Clock, Plus, Trash2, Bell } from 'lucide-react';

const OperationsSchedule = () => {
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem('military_journal_schedule');
        return saved ? JSON.parse(saved) : [
            { id: 1, time: '06:00', task: 'Pobudka i toaleta poranna' },
            { id: 2, time: '06:30', task: 'Zaprawa poranna' },
            { id: 3, time: '08:00', task: 'Odprawa Sztabowa (Sytuacyjna)' },
            { id: 4, time: '10:00', task: 'Wyjazd w rejon operacyjny' }
        ];
    });

    const [newTask, setNewTask] = useState({ time: '', task: '' });

    useEffect(() => {
        localStorage.setItem('military_journal_schedule', JSON.stringify(items));
    }, [items]);

    const addTask = () => {
        if (!newTask.time || !newTask.task) return;
        const item = { ...newTask, id: Date.now() };
        const sorted = [...items, item].sort((a, b) => a.time.localeCompare(b.time));
        setItems(sorted);
        setNewTask({ time: '', task: '' });
    };

    const deleteTask = (id) => {
        setItems(items.filter(i => i.id !== id));
    };

    return (
        <div className="space-y-4">
            <div className="card-military">
                <h3 className="text-xs font-bold text-military-100 uppercase tracking-widest flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-military-400" />
                    Harmonogram Operacji
                </h3>

                <div className="flex gap-2 mb-6">
                    <input
                        type="time"
                        value={newTask.time}
                        onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                        className="bg-military-950 border border-military-800 rounded p-1 text-xs text-military-100 w-24 outline-none focus:border-military-400"
                    />
                    <input
                        type="text"
                        placeholder="Zadanie/Punkt planu..."
                        value={newTask.task}
                        onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
                        className="flex-1 bg-military-950 border border-military-800 rounded p-1 text-xs text-military-100 outline-none focus:border-military-400"
                    />
                    <button onClick={addTask} className="p-2 bg-military-700 rounded hover:bg-military-600 transition-colors">
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                <div className="space-y-0 relative before:absolute before:left-[39px] before:top-2 before:bottom-2 before:w-px before:bg-military-800">
                    {items.map((item) => (
                        <div key={item.id} className="group flex items-start gap-4 py-3 relative">
                            <span className="text-xs font-mono text-military-400 pt-1 w-10 text-right">{item.time}</span>
                            <div className="mt-2 w-2 h-2 rounded-full bg-military-600 border border-military-950 z-10"></div>
                            <div className="flex-1 bg-military-950/30 p-2 rounded border border-military-800/10 group-hover:border-military-800 transition-colors">
                                <p className="text-sm text-military-100">{item.task}</p>
                            </div>
                            <button
                                onClick={() => deleteTask(item.id)}
                                className="p-2 text-military-700 hover:text-red-500 transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OperationsSchedule;
