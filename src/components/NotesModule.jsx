import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Search, Clock as ClockIcon } from 'lucide-react';

const NotesModule = () => {
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem('military_journal_notes');
        return saved ? JSON.parse(saved) : [];
    });
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        localStorage.setItem('military_journal_notes', JSON.stringify(notes));
    }, [notes]);

    const addNote = () => {
        if (!newNote.trim()) return;
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const note = {
            id: Date.now(),
            text: newNote,
            date: dateStr
        };

        setNotes([note, ...notes]);
        setNewNote('');
    };

    return (
        <div className="p-4 space-y-4">
            <div className="card-military flex gap-2">
                <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Wpisz nową notatkę..."
                    className="flex-1 bg-military-950 border border-military-800 rounded p-2 text-sm focus:outline-none focus:border-military-400 resize-none h-20 text-military-100 placeholder:text-military-600"
                />
                <button
                    onClick={addNote}
                    className="bg-military-500 hover:bg-military-400 p-3 rounded-lg flex items-center justify-center transition-colors border border-military-400/30"
                >
                    <Plus className="w-6 h-6 text-military-100" />
                </button>
            </div>

            <div className="space-y-3">
                {notes.map(note => (
                    <div key={note.id} className="card-military relative group animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-bold text-military-500 flex items-center gap-1 font-mono">
                                <ClockIcon className="w-3 h-3" />
                                {note.date}
                            </span>
                            <button
                                onClick={() => setNotes(notes.filter(n => n.id !== note.id))}
                                className="opacity-0 group-hover:opacity-100 p-1 text-red-900/50 hover:text-red-500 transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-sm text-military-100 leading-relaxed font-medium">
                            {note.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotesModule;
