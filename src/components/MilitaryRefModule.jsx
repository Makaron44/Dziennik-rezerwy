import React, { useState } from 'react';
import { Shield, Info, ChevronRight, BookOpen, AlertTriangle, Radio, MessageSquare, Clock } from 'lucide-react';

const MilitaryRefModule = () => {
    const [activeTab, setActiveTab] = useState(null);

    const sections = [
        {
            id: 'ranks',
            title: 'Stopnie Wojskowe',
            icon: <Shield className="w-5 h-5 text-military-400" />,
            items: [
                { label: 'Korpus Szeregowych', desc: 'Szeregowy, St. Szeregowy, St. Szeregowy Specjalista' },
                { label: 'Korpus Podoficerów Młodszych', desc: 'Kapral, St. Kapral, Plutonowy' },
                { label: 'Korpus Podoficerów', desc: 'Sierżant, St. Sierżant, Mł. Chorąży' },
                { label: 'Korpus Podoficerów Starszych', desc: 'Chorąży, St. Chorąży, St. Chorąży Sztabowy' },
                { label: 'Oficerowie Młodsi', desc: 'Podporucznik, Porucznik, Kapitan' },
                { label: 'Oficerowie Starsi', desc: 'Major, Podpułkownik, Pułkownik' },
                { label: 'Generałowie', desc: 'Gen. Brygady, Gen. Dywizji, Gen. Broni, Generał' }
            ]
        },
        {
            id: 'signals',
            title: 'Sygnały Alarmowe',
            icon: <AlertTriangle className="w-5 h-5 text-military-400" />,
            items: [
                { label: 'Alarm Powietrzny', desc: 'Dźwięk modulowany syreny (3 min) / Komunikat: OGŁASZAM ALARM POWIETRZNY' },
                { label: 'Alarm Skażeń', desc: 'Dźwięk przerywany syreny (3 min) / Komunikat: OGŁASZAM ALARM SKAŻEŃ' },
                { label: 'Odwołanie Alarmu', desc: 'Dźwięk ciągły syreny (3 min) / Komunikat: ODWOŁUJĘ ALARM' },
                { label: 'Sygnał Gongu', desc: 'Uderzenia w metalowy przedmiot (stosowany lokalnie)' }
            ]
        },
        {
            id: 'alphabet',
            title: 'Alfabet NATO / Fonetyczny',
            icon: <Radio className="w-5 h-5 text-military-400" />,
            items: [
                { label: 'A - B - C - D', desc: 'Alpha, Bravo, Charlie, Delta' },
                { label: 'E - F - G - H', desc: 'Echo, Foxtrot, Golf, Hotel' },
                { label: 'I - J - K - L', desc: 'India, Juliett, Kilo, Lima' },
                { label: 'M - N - O - P', desc: 'Mike, November, Oscar, Papa' },
                { label: 'Q - R - S - T', desc: 'Quebec, Romeo, Sierra, Tango' },
                { label: 'U - V - W - X', desc: 'Uniform, Victor, Whiskey, X-ray' },
                { label: 'Y - Z', desc: 'Yankee, Zulu' }
            ]
        },
        {
            id: 'radio',
            title: 'Procedury Radiowe',
            icon: <MessageSquare className="w-5 h-5 text-military-400" />,
            items: [
                { label: 'Roger', desc: 'Zrozumiałem / Przyjąłem (nie oznacza TAK)' },
                { label: 'Wilco', desc: 'Zrozumiałem i wykonam (Will Comply)' },
                { label: 'Copy', desc: 'Otrzymałem Twoją wiadomość' },
                { label: 'Say Again', desc: 'Powtórz ostatni komunikat' },
                { label: 'Over', desc: 'Zakończyłem nadawanie, czekam na odpowiedź' },
                { label: 'Out', desc: 'Zakończyłem rozmowę' }
            ]
        }
    ];

    return (
        <div className="p-4 space-y-4 animate-in slide-in-from-bottom-4 duration-500">
            <div className="card-military p-3 bg-military-800/20 border-military-400/30">
                <p className="text-[10px] text-military-400 font-bold uppercase tracking-widest flex items-center gap-2">
                    <Info className="w-3 h-3" />
                    Repozytorium Wiedzy Operacyjnej
                </p>
            </div>

            {sections.map((section) => (
                <div key={section.id} className="space-y-2">
                    <button
                        onClick={() => setActiveTab(activeTab === section.id ? null : section.id)}
                        className="w-full flex justify-between items-center px-1 py-2 group"
                    >
                        <h3 className="text-xs font-bold text-military-100 uppercase tracking-widest flex items-center gap-2">
                            {section.icon}
                            {section.title}
                        </h3>
                        <ChevronRight className={`w-4 h-4 text-military-600 transition-transform duration-300 ${activeTab === section.id ? 'rotate-90 text-military-400' : ''}`} />
                    </button>

                    <div className={`space-y-2 overflow-hidden transition-all duration-300 ${activeTab === section.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        {section.items.map((item, iIdx) => (
                            <div key={iIdx} className="card-military flex justify-between items-start py-3 bg-military-900/40 border-military-800/40">
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-military-50 mb-0.5">{item.label}</p>
                                    <p className="text-[11px] text-military-400 leading-tight">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {activeTab === null && (
                <div className="pt-8 text-center space-y-2 opacity-40">
                    <Clock className="w-8 h-8 text-military-700 mx-auto" />
                    <p className="text-[10px] text-military-600 font-bold uppercase tracking-tighter">Baza wiedzy aktualizowana na bieżąco</p>
                </div>
            )}
        </div>
    );
};

export default MilitaryRefModule;
