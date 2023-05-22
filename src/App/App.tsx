/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './App.css';
import WeatherLocation from '../Fetch/fetch';

function App(): JSX.Element {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [location, setLocation] = useState<string>("");

  async function fetchData() {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      if (location === "") {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=London&aqi=no`);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          throw response;
        }
      } else {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&aqi=no`);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          throw response;
        }
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error);
    }
    setLoading(false);
    setLocation("");
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='App'>
      <h1 className='header'>Weather App</h1>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Enter your location here....' />
      <button type="button" onClick={fetchData}>Search</button>
  
      <WeatherLocation data={data} loading={loading} error={error} />
    </div>
  );
}

export default App;
