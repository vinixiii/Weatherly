import React, { useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import Config from 'react-native-config';
import { Layout } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import analytics from '@react-native-firebase/analytics';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { AnimatePresence } from 'moti';

import { Button } from '~/components/Button';
import { CityWeatherCard } from '~/components/CityWeatherCard';
import { Loading } from '~/components/Loading';
import Presence from '~/components/Presence';

import useAuth from '~/hooks/useAuth';

import { CityInfoDTO } from '~/dtos/CityInfoDTO';
import { CityWeatherInfoDTO } from '~/dtos/CityWeatherInfoDTO';

import CityIllustration from '~/assets/city.svg';

import { RootStackParamList } from '~/@types/navigation';
import db from '~/services/db';

import {
  Container,
  Content,
  Header,
  HeaderContent,
  InitialMessage,
  MessageSubtitle,
  MessageTitle,
  HeaderTitle,
} from './styles';

const { WEATHER_API_KEY } = Config;

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

type MyCitiesScreenRoute = RouteProp<RootStackParamList, 'MyCitiesScreen'>;

export function MyCitiesScreen() {
  const { navigate, setParams } = useNavigation();
  const { params } = useRoute<MyCitiesScreenRoute>();
  const { user } = useAuth();

  const isFromCityScreen = params?.isFromCityScreen;

  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [myCities, setMyCities] = useState<CityWeatherInfoDTO[]>([]);

  const sortedCities = useMemo(() => {
    return myCities
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
  }, [myCities]);

  const handlePressCityWeatherCard = (city: CityWeatherInfoDTO) => {
    analytics().logEvent('city_weather_card_pressed', {
      cityName: city.name,
    });

    navigate('CityScreen', { city });
  };

  const handleDelete = async (name: string) => {
    const cities = myCities.map(city => ({ ...city }));

    const cityToDelete = cities.find(city => city.name === name);

    try {
      if (!cityToDelete) return;

      // Delete from storage
      await db.cities.doc(cityToDelete.docId).delete();

      // Delete from state
      const updatedCities = cities.filter(city => city.name !== name);

      setMyCities(updatedCities);
    } catch (error) {
      console.error(error);

      Alert.alert('Oops!', 'Não foi possível deletar essa cidade.');
    }
  };

  const handleFavorite = async (name: string) => {
    const cities = myCities.map(city => ({ ...city }));

    const cityToFavorite = cities.find(city => city.name === name);

    try {
      if (!cityToFavorite) return;

      cityToFavorite.favorite = !cityToFavorite.favorite;

      // Favorite storage city
      await db.cities.doc(cityToFavorite.docId).update({
        favorite: cityToFavorite.favorite,
      });

      // Favorite state city
      setMyCities(cities);

      analytics().logEvent('city_weather_card_favorited', {
        cityName: name,
      });
    } catch (error) {
      console.error(error);

      Alert.alert(
        'Oops!',
        'Não foi possível adicionar esta cidade aos favoritos.',
      );
    }
  };

  const fetchCitiesWeatherData = useCallback(async () => {
    setIsLoading(true);

    const querySnapshot = await db.cities
      .where('userId', '==', user?.uid)
      .get();

    const storedCities = querySnapshot.docs.map(doc => {
      return {
        docId: doc.id,
        ...(doc.data() as CityInfoDTO),
      };
    });

    if (storedCities.length) {
      const cities: CityWeatherInfoDTO[] = [];

      try {
        // eslint-disable-next-line no-restricted-syntax
        for (const city of storedCities) {
          const { docId, lat, lon } = city;

          const exclude = 'hourly,minutely';
          // eslint-disable-next-line no-await-in-loop
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${WEATHER_API_KEY}&lang=pt_br&units=metric`,
          );
          // eslint-disable-next-line no-await-in-loop
          const responseData = (await response.json()) as ICityWeatherResponse;
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

          cities.push({ docId, ...formattedData });
        }

        setMyCities(cities);
      } catch (error) {
        console.error(error);

        Alert.alert('Oops!', 'Não foi possível listar as cidades.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [user?.uid]);

  useFocusEffect(
    useCallback(() => {
      if (!isFromCityScreen) {
        fetchCitiesWeatherData();
      }

      return () => {
        if (isFromCityScreen) {
          setParams({ isFromCityScreen: false });
        }
      };
    }, [fetchCitiesWeatherData, isFromCityScreen, setParams]),
  );

  return (
    <Container>
      <Header insetsTop={insets.top}>
        <HeaderContent>
          <HeaderTitle>Weatherly</HeaderTitle>

          <Button variant="outline" title="Sair" onPress={signOut} />
        </HeaderContent>
      </Header>

      {isLoading ? (
        <Loading />
      ) : (
        <Content>
          {sortedCities.length > 0 ? (
            <AnimatePresence>
              {sortedCities.map((item, index) => (
                <Presence key={item.name} layout={Layout} index={index}>
                  <CityWeatherCard
                    data={item}
                    onPress={() => handlePressCityWeatherCard(item)}
                    onDelete={() => handleDelete(item.name)}
                    onFavorite={() => handleFavorite(item.name)}
                  />
                </Presence>
              ))}
            </AnimatePresence>
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
        </Content>
      )}
    </Container>
  );
}
