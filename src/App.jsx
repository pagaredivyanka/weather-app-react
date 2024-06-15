import React, { useEffect, useState } from 'react'
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from './components/TimeAndLocation';
import TempAndDetails from './components/TempAndDetails';
import Forcast from './components/Forcast';
import getFormattedWeatherData from './services/weatherService';
import { ToastContainer } from 'react-toastify';

const App = () => {

  const [query, setQuery] = useState({ q: "nashik"})
  const [units, setUnits] = useState ("metric");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const cityName = query.q ? query.q : "current location";
    toast.info(`Fetching weather data for ${capotalizeFirstLetter(cityName)}`)

    await getFormattedWeatherData({ ...query, units }).then((data) => {
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
      setWeather(data);
    });
    console.log(data);
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-blue-700";
    const threshold = units === 'metric' ? 20 : 60
    if (weather.temp <= threshold) return "from-cyan-600 to-blue-700";
    return "from-yellow-600 to-orange-700"; 
  };
  return (
    <div className="mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 from-cyan-600 to-blue-700">
      <TopButtons setQuery = {setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />

      {weather && (
        <>
        <TimeAndLocation weather={weather} />
        <TempAndDetails weather={weather} units={units} />
        <Forcast title= '3 hour step forecast' data={weather.hourly} />
        <Forcast title="daily forecast" data={weather.daily} />
        </>
      )}


      <ToastContainer autoClose={2500} highProgressBar={true} theme="colored" />
      



    </div>
    
  )
}

export default App;
