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
  error: any;
}

const WeekForecast: React.FC<WeekForecastProps> = ({ forecastday, loading, error }) => {
  return (
    <div className='flex-forecast'>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong: {error.message}</p>}
      {forecastday.map((day) => (
        <div className='forecast-container' key={day.date}>
          <p><span>Date:</span> {day.date}</p>
          <p><span>Sunrise:</span> {day.astro.sunrise}</p>
          <p><span>Sunset:</span> {day.astro.sunset}</p>
          <p><span>Maxtemp:</span> {day.day.maxtemp_c}°C</p>
          <p><span>Mintemp:</span> {day.day.mintemp_c}°C</p>
          <p className='condition'>{day.day.condition.text}</p>
          <img src={day.day.condition.icon} alt={day.day.condition.text} />
        </div>
      ))}
    </div>
  );
};

export default WeekForecast;
