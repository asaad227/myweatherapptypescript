/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './App.css';
import WeatherLocation from '../Fetch/fetch';
import WeekForecast from '../WeekCast';


function App(): JSX.Element {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [location, setLocation] = useState<string>("");
  let initialItems = "London";
  try {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      initialItems = JSON.parse(storedItems);
    }
  } catch (error) {
    // Handle the JSON parsing error, e.g., set a default value
    initialItems = "London";
    console.error("Error parsing items from localStorage:", error);
  }
  
  const [items, setItems] = useState<string>(initialItems);
  
  useEffect(() => {
    try {
      localStorage.setItem("items", JSON.stringify(items));
    } catch (error) {
      // Handle the error when setting items in localStorage
      console.error("Error setting items in localStorage:", error);
    }
    // Rest of your code...
  }, [items]);
  
  // Rest of your code...
  

  async function fetchData() {
    setLoading(true);
    setError(null);
    setData(null);
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${items}&aqi=no`);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          throw response;
        }
      
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error);
    }
    setLoading(false);
    setLocation("");
  }

  async function fetchWeekData() {
    setLoading(true);
    setError(null);
    setData(null);
    try {
   
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${items}&days=7`);
        if (response.ok) {
          const json = await response.json();
          setData(json);

        } else {
          throw response;
        }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error);
    }
    setLoading(false);
    setLocation("")
  }
  
  const forecastday = data?.forecast?.forecastday || [];

  function handleFunctin(){
    if (location === "") {
      alert("Please enter a location")
    }else{
      setItems(location)
      fetchData();
      fetchWeekData();
    }
  }

  useEffect(() => {
    fetchData();
    fetchWeekData();
  }, [items]);


  return (
   
    <div className='App'>
     <div className='search'>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Enter your location here....' />
      <button type="button" onClick={handleFunctin}>Search</button>
      </div>
  
      <WeatherLocation data={data} loading={loading} error={error} />
      <h1 className='sub-header'>7 Days weather forecast</h1>
      <WeekForecast forecastday={forecastday} loading={loading} error={error} />  
    </div>
   
  );
}

export default App;
