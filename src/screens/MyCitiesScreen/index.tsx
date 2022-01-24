import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CityWeatherCard } from '../../components/CityWeatherCard';

import { ScreenProps } from '../../@types/react-navigation';
import { CityInfoDTO } from '../../dtos/CityInfoDTO';
import { CityWeatherInfoDTO } from '../../dtos/CityWeatherInfoDTO';

const { WEATHER_API_KEY } = process.env;

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content
} from './styles';

interface ICurrentWeather {
  dt: number;
  temp: number;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  humidity: number;
  wind_speed: number;
  clouds: number;
};

interface IDailyWeather {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
  };
  humidity: number;
  wind_speed: number;
  clouds: number;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
};

interface ICityWeatherResponse {
  current: ICurrentWeather;
  daily: IDailyWeather[];
};

export function MyCitiesScreen({ navigation } : ScreenProps) {
  const [myCities, setMyCities] = useState<CityWeatherInfoDTO[]>([]);

  function handleShowCarDetails(city: CityWeatherInfoDTO) {
    navigation.navigate('CityScreen', { city });
  };

  useEffect(() => {
    async function fetchCitiesWeatherData() {
      const dataStorageKey = `@weatherly:cities`;
    
      const data = await AsyncStorage.getItem(dataStorageKey);
      const currentData = data ? JSON.parse(data) : [];

      currentData.forEach(async (city: CityInfoDTO) => {
        const lat = city.lat;
        const lon = city.lon;
        
        try {
          const exclude = 'hourly,minutely'
          const BASE_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${WEATHER_API_KEY}&lang=pt_br&units=metric`

          const response = await fetch(BASE_URL);
          const data = await response.json() as ICityWeatherResponse;

          const daily = data.daily.map(item => {
            return {
              date: item.dt * 1000,
              temp: {
                day: item.temp.day,
                min: item.temp.min,
                max: item.temp.max,
              },
              humidity: item.humidity,
              wind_speed: item.wind_speed,
              clouds: item.clouds,
              weather: {
                main: item.weather[0].main,
                description: item.weather[0].description,
                icon: item.weather[0].icon,
              },
            };
          });

          const current = {
            date: data.current.dt * 1000,
            temp: data.current.temp,
            weather: {
              main: data.current.weather[0].main,
              description: data.current.weather[0].description,
              icon: data.current.weather[0].icon,
            },
            humidity: data.current.humidity,
            wind_speed: data.current.wind_speed,
            clouds: data.current.clouds,
          };

          const formattedData: CityWeatherInfoDTO = {
            id: city.id,
            name: city.name,
            country: city.country,
            current,
            daily,
          };

          setMyCities((oldState) => [...oldState, formattedData]);
        } catch (error: any) {
          console.error(error);
          Alert.alert('Oops!', 'Não foi possível listar as cidades.');
        }
      });
    }

    fetchCitiesWeatherData();
  }, []);

  return(
    <Container>
      <Header>
        <Title>Weatherly</Title>
        <Subtitle>Minhas cidades</Subtitle>
      </Header>

      <Content
        data={myCities}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CityWeatherCard data={item} onPress={() => handleShowCarDetails(item)} />
        )}
      />
    </Container>
  );
};
