import React, { useCallback } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import { ptBR } from 'date-fns/locale';
import { MotiView } from 'moti';

import { BackButton } from '~/components/BackButton';
import Presence from '~/components/Presence';
import { WeekdayCard } from '~/components/WeekdayCard';

import { toCapitalize } from '~/utils/toCapitalize';

import CloudSvg from '~/assets/cloud.svg';
import HumiditySvg from '~/assets/humidity.svg';
import WindSvg from '~/assets/wind.svg';

import { RootStackParamList } from '~/@types/navigation';

import {
  City,
  Container,
  Content,
  CurrentInfo,
  CurrentTemperature,
  Header,
  Icon,
  Info,
  InfoTitle,
  MainInfo,
  Max,
  Min,
  MinMaxTemperature,
  NextDays,
  SideInfo,
  Subtitle,
  Title,
  WeatherDescription,
} from './styles';

type CityScreenRoute = RouteProp<RootStackParamList, 'CityScreen'>;

export function CityScreen() {
  const { navigate } = useNavigation();

  const {
    params: { city },
  } = useRoute<CityScreenRoute>();

  const insets = useSafeAreaInsets();

  const currentWeatherDesc = toCapitalize(city.current.weather.description);
  const currentTemp = Math.round(city.current.temp);
  const dailyMinTemp = Math.round(city.daily[0].temp.min);
  const dailyMaxTemp = Math.round(city.daily[0].temp.max);
  const currentWindSpeed = Math.round(city.current.wind_speed * 3.6);
  const { icon } = city.current.weather;

  const formattedDailyData = city.daily.slice(1).map(item => {
    const weekday = format(new Date(item.date), 'EEEE', { locale: ptBR });
    const capitalizeWeekday = toCapitalize(weekday);
    const date = format(new Date(item.date), 'dd/MM/yyyy', { locale: ptBR });

    return {
      ...item,
      date,
      weekday: capitalizeWeekday,
    };
  });

  const handleGoBack = useCallback(() => {
    navigate('MyCitiesScreen', { isFromCityScreen: true });
    return true;
  }, [navigate]);

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', handleGoBack);
  //   addListener('gestureEnd', handleGoBack);

  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
  //     navigation.removeListener('gestureEnd', handleGoBack);
  //   };
  // }, [navigation, handleGoBack]);

  return (
    <Container>
      <Presence index={1}>
        <Header insetsTop={insets.top}>
          <BackButton onPress={handleGoBack} />

          <City>
            <Title>
              {city.name}, {city.country}
            </Title>

            <Subtitle>Hoje</Subtitle>
          </City>
        </Header>
      </Presence>

      <Content>
        <MainInfo>
          <CurrentInfo>
            <Presence index={2}>
              <CurrentTemperature>{currentTemp}ºC</CurrentTemperature>
            </Presence>

            <Presence index={3}>
              <WeatherDescription>{currentWeatherDesc}</WeatherDescription>
            </Presence>
          </CurrentInfo>

          <MotiView
            from={{
              opacity: 0,
              translateY: -58,
            }}
            animate={{
              opacity: 1,
              translateY: -46,
              right: RFValue(-24),
            }}
            delay={4 * 80}
          >
            <Icon
              source={{
                uri: `https://openweathermap.org/img/wn/${icon}@4x.png`,
              }}
            />
          </MotiView>
        </MainInfo>

        <MinMaxTemperature>
          <Presence index={5}>
            <Min>min. {dailyMinTemp}ºC</Min>
          </Presence>

          <Presence index={6}>
            <Max>max. {dailyMaxTemp}ºC</Max>
          </Presence>
        </MinMaxTemperature>

        <SideInfo>
          <Presence index={7} style={{ flex: 1 }}>
            <Info>
              <HumiditySvg width={32} height={32} />
              <InfoTitle>{city.current.humidity}%</InfoTitle>
            </Info>
          </Presence>

          <Presence index={8} style={{ flex: 1 }}>
            <Info>
              <WindSvg width={32} height={32} />
              <InfoTitle>{currentWindSpeed} km/h</InfoTitle>
            </Info>
          </Presence>

          <Presence index={9} style={{ flex: 1 }}>
            <Info>
              <CloudSvg width={32} height={32} />
              <InfoTitle>{city.current.clouds}%</InfoTitle>
            </Info>
          </Presence>
        </SideInfo>

        <NextDays>
          {formattedDailyData.map((item, index) => (
            <Presence key={String(item.date)} index={index + 10}>
              <WeekdayCard data={item} />
            </Presence>
          ))}
        </NextDays>
      </Content>
    </Container>
  );
}
