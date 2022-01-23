export type CityWeatherInfoDTO = {
  id: string;
  name: string;
  country: string;
  current: {
    date: string;
    temp: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    };
    humidity: number;
    wind_speed: number;
    clouds: number;
  };
  daily: {
    date: string;
    temp: {
      day: number;
      min: number;
      max: number;
    };
    weather: {
      main: string;
      description: string;
      icon: string;
    };
    humidity: number;
    wind_speed: number;
    clouds: number;
  }[];
};
