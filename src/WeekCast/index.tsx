import React from 'react';

interface Day {
  date: string;
  astro: {
    sunrise: string;
    sunset: string;
  };
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

interface WeekForecastProps {
  forecastday: Day[];
  loading: boolean;
  error: {
    message: string;
  } | null;
}

const WeekForecast: React.FC<WeekForecastProps> = ({ forecastday, loading, error }) => {
  return (
    <div className='flex-forecast'>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong: {error.message}</p>}
      {forecastday.map((day) => (
        <div className='forecast-container' key={day.date}>
          <p>Date: {day.date}</p>
          <p>Sunrise: {day.astro.sunrise}</p>
          <p>Sunset: {day.astro.sunset}</p>
          <p>Maxtemp: {day.day.maxtemp_c}</p>
          <p>Mintemp: {day.day.mintemp_c}</p>
          <p>{day.day.condition.text}</p>
          <img src={day.day.condition.icon} alt={day.day.condition.text} />
        </div>
      ))}
    </div>
  );
};

export default WeekForecast;
