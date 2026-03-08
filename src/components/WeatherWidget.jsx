import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, MapPin } from 'lucide-react';

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolokalizacja nie jest wspierana');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    // Symulacja pobierania danych (użytkownik musi podać API key dla realnego API)
                    // W rzeczywistości: fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_KEY&units=metric`)

                    await new Promise(resolve => setTimeout(resolve, 1000)); // Symulacja opóźnienia

                    setWeather({
                        temp: 14,
                        city: 'Twoja Lokalizacja',
                        desc: 'Częściowe zachmurzenie',
                        icon: 'cloud'
                    });
                    setLoading(false);
                } catch (err) {
                    setError('Błąd pobierania pogody');
                    setLoading(false);
                }
            },
            () => {
                setError('Brak dostępu do lokalizacji');
                setLoading(false);
            }
        );
    }, []);

    if (loading) return <div className="card-military animate-pulse h-20 flex items-center justify-center text-military-400">Pobieranie pogody...</div>;
    if (error) return <div className="card-military text-sm text-red-400 border-red-900/50">{error}</div>;

    return (
        <div className="card-military flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-military-800 rounded-lg">
                    <Cloud className="w-6 h-6 text-military-400" />
                </div>
                <div>
                    <h3 className="font-bold text-military-100 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-military-500" />
                        {weather.city}
                    </h3>
                    <p className="text-xs text-military-400">{weather.desc}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-2xl font-black text-military-50 font-mono">{weather.temp}°C</p>
                <div className="flex gap-2 text-[10px] text-military-500 font-medium">
                    <span className="flex items-center gap-1"><Wind className="w-2 h-2" /> 4 m/s</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;
