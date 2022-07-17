import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { CityWeatherCard } from '~/components/CityWeatherCard';
import { Loading } from '~/components/Loading';

import { CityInfoDTO } from '~/dtos/CityInfoDTO';
import { CityWeatherInfoDTO } from '~/dtos/CityWeatherInfoDTO';

import CityIllustration from '~/assets/city.svg';

import { ScreenProps } from '~/@types/react-navigation';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  InitialMessage,
  MessageTitle,
  MessageSubtitle,
} from './styles';

const { WEATHER_API_KEY } = process.env;

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
}

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
}

interface ICityWeatherResponse {
  current: ICurrentWeather;
  daily: IDailyWeather[];
}

export function MyCitiesScreen({ navigation }: ScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [myCities, setMyCities] = useState<CityWeatherInfoDTO[]>([]);

  const sortedCities = myCities
    .sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    .sort((a: any, b: any) => b.favorite - a.favorite);

  function handleShowCarDetails(city: CityWeatherInfoDTO) {
    navigation.navigate('CityScreen', { city });
  }

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);

      async function fetchCitiesWeatherData() {
        setMyCities([]);

        const dataStorageKey = `@weatherly:cities`;

        const data = await AsyncStorage.getItem(dataStorageKey);
        const currentData = data ? JSON.parse(data) : [];

        if (currentData.length > 0) {
          currentData.forEach(async (city: CityInfoDTO) => {
            const { lat } = city;
            const { lon } = city;

            try {
              const exclude = 'hourly,minutely';
              const BASE_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${WEATHER_API_KEY}&lang=pt_br&units=metric`;

              const response = await fetch(BASE_URL);
              const responseData =
                (await response.json()) as ICityWeatherResponse;

              const daily = responseData.daily.map(item => {
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
                date: responseData.current.dt * 1000,
                temp: responseData.current.temp,
                weather: {
                  main: responseData.current.weather[0].main,
                  description: responseData.current.weather[0].description,
                  icon: responseData.current.weather[0].icon,
                },
                humidity: responseData.current.humidity,
                wind_speed: responseData.current.wind_speed,
                clouds: responseData.current.clouds,
              };

              const formattedData: CityWeatherInfoDTO = {
                id: city.id,
                name: city.name,
                country: city.country,
                current,
                daily,
                favorite: city.favorite,
              };

              setMyCities(oldState => [...oldState, formattedData]);
            } catch (error: any) {
              console.error(error);
              Alert.alert('Oops!', 'Não foi possível listar as cidades.');
            } finally {
              setIsLoading(false);
            }
          });
        } else {
          setIsLoading(false);
        }
      }

      fetchCitiesWeatherData();
    }, []),
  );

  async function handleDelete(name: string) {
    // Delete from myCities
    const cities = myCities.map(city => ({ ...city }));
    const updatedCities = cities.filter(city => city.name !== name);
    setMyCities(updatedCities);

    // Delete from storage
    const dataStorageKey = `@weatherly:cities`;
    const data = await AsyncStorage.getItem(dataStorageKey);
    const storedData = JSON.parse(data!);

    const storedCitiesUpdated = storedData.filter(
      (city: CityInfoDTO) => city.name !== name,
    );

    await AsyncStorage.setItem(
      dataStorageKey,
      JSON.stringify(storedCitiesUpdated),
    );
  }

  async function handleFavorite(name: string) {
    try {
      // Update myCities
      const updatedCities = myCities.map(city => ({ ...city }));
      const foundCity = updatedCities.find(city => city.name === name);

      if (!foundCity) return;

      foundCity.favorite = !foundCity.favorite;
      setMyCities(updatedCities);

      // Update storage
      const dataStorageKey = `@weatherly:cities`;
      const data = await AsyncStorage.getItem(dataStorageKey);
      const storedData = JSON.parse(data!);

      const foundStoredCity = storedData.find(
        (city: CityInfoDTO) => city.name === name,
      );
      foundStoredCity.favorite = !foundStoredCity.favorite;

      await AsyncStorage.setItem(dataStorageKey, JSON.stringify(storedData));
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Oops!',
        'Não foi possível adicionar esta cidade aos favoritos.',
      );
    }
  }

  return (
    <Container>
      <Header>
        <Title>Weatherly</Title>
        <Subtitle>Minhas cidades</Subtitle>
      </Header>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {myCities.length > 0 ? (
            <Content
              data={sortedCities}
              keyExtractor={item => item.name}
              renderItem={({ item }) => (
                <CityWeatherCard
                  data={item}
                  onPress={() => handleShowCarDetails(item)}
                  onDelete={() => handleDelete(item.name)}
                  onFavorite={() => handleFavorite(item.name)}
                />
              )}
            />
          ) : (
            <InitialMessage>
              <CityIllustration height={200} />
              <MessageTitle>Ainda não há cidades :(</MessageTitle>
              <MessageSubtitle>
                Adcione uma nova cidade utilizando a opção de busca na barra de
                navegação inferior.
              </MessageSubtitle>
            </InitialMessage>
          )}
        </>
      )}
    </Container>
  );
}
