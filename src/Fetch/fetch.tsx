interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
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
  return (
    <div className="flex-container">
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong: {error.message}</p>}
      {data && (
        <div>
          <h1>{data.location.name}</h1>
          <p>{data.location.region}</p>
          <p>{data.location.country}</p>
          <p>{data.location.localtime}</p>
          <p>{data.current.temp_c}</p>
          <p>{data.current.condition.text}</p>
          <img src={data.current.condition.icon} alt={data.current.condition.text} />
        </div>
      )}
    </div>
  );
}
