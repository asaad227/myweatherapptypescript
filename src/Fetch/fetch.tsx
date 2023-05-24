interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_mph: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

interface WeatherLocationProps {
  data: WeatherData | null;
  loading: boolean;
  error: any;
}

export default function WeatherLocation({ data, loading, error }: WeatherLocationProps): JSX.Element {
  const dateIinfo = data?.location.localtime.slice(0, 10);
  const timeInfo = data?.location.localtime.slice(11, 16);
  

  return (
    <div className="flex-container">
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong: {error.message}</p>}
      {data && (
        <div>
          <h1>{data.location.name}</h1>
          <p>{data.location.region}</p>
          <p>{data.location.country}</p>
          <p>Date: <span>{dateIinfo}</span></p>
          <p>Time: <span>{timeInfo}</span></p>
          <p>Current temp: <span>{data.current.temp_c}°C</span></p>
          <p>Feels like: <span>{data.current.feelslike_c}°C</span></p>
          <p>Humidity: <span>{data.current.humidity}%</span></p>
          <p>Wind: <span>{data.current.wind_mph}mph</span></p>
          <p className="condition">{data.current.condition.text}</p>
          <img src={data.current.condition.icon} alt={data.current.condition.text} />
        </div>
      )}
    </div>
  );
}
