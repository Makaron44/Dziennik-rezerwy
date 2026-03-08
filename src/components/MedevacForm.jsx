import React, { useState } from 'react';
import { Ambulance, Copy, Check, Trash2 } from 'lucide-react';

const MedevacForm = () => {
    const [data, setData] = useState({
        line1: '', // Location
        line2: '', // Freq/Callsign
        line3: '', // Precedence (A-Urgent, B-Urgent Surg, C-Priority, D-Routine, E-Convenience)
        line4: '', // Special Equip (A-None, B-Hoist, C-Extraction, D-Ventilator)
        line5: '', // Number/Type (A-Litter, B-Ambulatory)
        line6: '', // Security (N-No enemy, P-Possible, E-Enemy in area, X-Armed escort)
        line7: '', // Marking (A-Panels, B-Pyrotechnic, C-Smoke, D-None, E-Other)
        line8: '', // Nationality (A-US, B-Non-US, C-NC, D-EPW, E-Hired)
        line9: '', // NBC/Terrain (N-Nuclear, B-Bio, C-Chemical / Terrain description)
    });

    const [copied, setCopied] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const generateReport = () => {
        return `9-LINE MEDEVAC REPORT:
Line 1 (Location): ${data.line1}
Line 2 (Freq/Callsign): ${data.line2}
Line 3 (Precedence): ${data.line3}
Line 4 (Equipment): ${data.line4}
Line 5 (Litter/Amb): ${data.line5}
Line 6 (Security): ${data.line6}
Line 7 (Marking): ${data.line7}
Line 8 (Nationality): ${data.line8}
Line 9 (NBC/Terrain): ${data.line9}`;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generateReport());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const resetForm = () => {
        if (confirm('Wyczyścić formularz?')) {
            setData({
                line1: '', line2: '', line3: '', line4: '', line5: '', line6: '', line7: '', line8: '', line9: ''
            });
        }
    };

    return (
        <div className="space-y-4">
            <div className="card-military">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-bold text-military-100 uppercase tracking-widest flex items-center gap-2">
                        <Ambulance className="w-4 h-4 text-red-500" />
                        MEDEVAC 9-Line
                    </h3>
                    <button onClick={resetForm} className="text-military-600 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

                <div className="space-y-3">
                    <LineInput id="line1" label="L1: Lokalizacja Pick-up" value={data.line1} onChange={handleChange} placeholder="Grid / Koordynaty" />
                    <LineInput id="line2" label="L2: Częstotliwość / Kryptonim" value={data.line2} onChange={handleChange} placeholder="np. 45.500 / SOKÓŁ" />
                    <LineInput id="line3" label="L3: Priorytet (A, B, C, D, E)" value={data.line3} onChange={handleChange} placeholder="A-PILNY, B-PILNY SURG, C-PRIORYTET..." />
                    <LineInput id="line4" label="L4: Sprzęt Specjalny (A, B, C, D)" value={data.line4} onChange={handleChange} placeholder="A-BRAK, B-WCIĄGARKA, C-EKSTRAKCJA..." />
                    <LineInput id="line5" label="L5: Liczba Pacjentów (A, B)" value={data.line5} onChange={handleChange} placeholder="A-LEŻĄCY, B-CHODZĄCY" />
                    <LineInput id="line6" label="L6: Bezpieczeństwo (N, P, E, X)" value={data.line6} onChange={handleChange} placeholder="N-BRAK WROGA, P-MOŻLIWY, E-W KONTAKCIE..." />
                    <LineInput id="line7" label="L7: Oznakowanie (A, B, C, D)" value={data.line7} onChange={handleChange} placeholder="A-PANELE, B-PIRO, C-DYM, D-BRAK" />
                    <LineInput id="line8" label="L8: Narodowość / Status" value={data.line8} onChange={handleChange} placeholder="A-WŁASNE, B-SOJUSZ, C-POW..." />
                    <LineInput id="line9" label="L9: Skażenia / Teren" value={data.line9} onChange={handleChange} placeholder="N-JĄDROWE, B-BIO, C-CHEM / OPIS TERENU" />
                </div>

                <button
                    onClick={copyToClipboard}
                    className="w-full mt-6 btn-military bg-red-950/30 border-red-900/50 hover:bg-red-900/40 flex items-center justify-center gap-2"
                >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copied ? 'Skopiowano meldunek' : 'Kopiuj meldunek do radia'}
                </button>
            </div>
        </div>
    );
};

const LineInput = ({ id, label, value, onChange, placeholder }) => (
    <div className="space-y-1">
        <label htmlFor={id} className="block text-[10px] text-military-500 uppercase font-bold">{label}</label>
        <input
            id={id}
            name={id}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-military-950 border border-military-800 rounded p-2 text-xs text-military-100 focus:border-red-900/50 outline-none placeholder:text-military-800"
        />
    </div>
);

export default MedevacForm;
