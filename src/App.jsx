import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      // Make sure this is your actual Render URL!
      const response = await fetch(`https://weather-api-u65i.onrender.com/weather?city=${city}`);
      const data = await response.json();
      
      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to connect. Server might be waking up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center pt-24 font-sans">
      
      <h1 className="text-5xl font-extrabold text-blue-900 mb-8 drop-shadow-sm">
        Weather App ⛅
      </h1>
      
      <div className="flex gap-3 mb-10 w-full max-w-md px-4">
        <input 
          type="text" 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
        <button 
          onClick={fetchWeather}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:scale-105 transition-all text-lg font-semibold"
        >
          Search
        </button>
      </div>

      {loading && (
        <p className="text-blue-600 font-medium text-lg animate-pulse">
          Waking up the server... ⏳
        </p>
      )}
      
      {error && (
        <p className="text-red-500 font-semibold bg-red-50 px-4 py-2 rounded-lg">
          {error}
        </p>
      )}

      {weather && (
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-11/12 max-w-sm text-center transform transition-all hover:scale-105 duration-300 border border-blue-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{weather.city}</h2>
          <p className="text-6xl font-black text-blue-500 mb-6 drop-shadow-sm">
            {Math.round(weather.temperature)}°C
          </p>
          <div className="space-y-2">
            <p className="text-gray-600 capitalize text-xl font-medium">
              {weather.description}
            </p>
            <p className="text-gray-400 font-medium">
              Humidity: {weather.humidity}%
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
