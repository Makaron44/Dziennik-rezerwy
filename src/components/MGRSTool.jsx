import React, { useState } from 'react';
import { Map, RefreshCw, Info } from 'lucide-react';

const MGRSTool = () => {
    const [coord, setCoord] = useState('');

    // To jest prosty placeholder - realna konwersja MGRS wymaga biblioteki proj4 lub mgrs.
    // Tu zaimplementujemy parser sprawdzający poprawność formatu i wyświetlający pomoc.

    const validateMGRS = (val) => {
        const regex = /^\d{1,2}[A-Z]\s[A-Z]{2}\s\d{1,10}$/;
        return regex.test(val.toUpperCase());
    };

    return (
        <div className="space-y-4">
            <div className="card-military">
                <h3 className="text-xs font-bold text-military-100 uppercase tracking-widest flex items-center gap-2 mb-4">
                    <Map className="w-4 h-4 text-military-400" />
                    Narzędzie Współrzędnych MGRS
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-[10px] text-military-500 uppercase font-bold mb-1">MGRS Grid Reference</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={coord}
                                onChange={(e) => setCoord(e.target.value)}
                                placeholder="np. 34U FD 12345 67890"
                                className="flex-1 bg-military-950 border border-military-800 rounded p-2 text-sm text-military-100 focus:border-military-400 outline-none font-mono"
                            />
                            <button className="p-2 bg-military-800 rounded hover:bg-military-700 transition-colors">
                                <RefreshCw className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="p-3 bg-military-950/50 rounded border border-military-800/50 text-xs space-y-2">
                        <p className="flex items-start gap-2 text-military-400">
                            <Info className="w-4 h-4 text-military-600 flex-shrink-0" />
                            <span>Format MGRS: <span className="text-military-200">GZD ID Easting Northing</span></span>
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-bold text-military-600">
                            <div className="p-1 bg-military-900 border border-military-800 rounded text-center">Lat/Long: ---</div>
                            <div className="p-1 bg-military-900 border border-military-800 rounded text-center">UTM: ---</div>
                        </div>
                    </div>

                    <div className="text-[10px] text-military-700 text-center italic">
                        Wskazówka: Zapisuj koordynaty w notatniku, aby mieć do nich szybki dostęp offline.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MGRSTool;
