export type CityWeatherInfoDTO = {
  id: string;
  name: string;
  country: string;
  favorite: boolean;
  current: {
    date: number;
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
    date: number;
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
