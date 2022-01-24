import React from 'react';
import { View } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { BackButton } from '../../components/BackButton';
import { WeekdayCard } from '../../components/WeekdayCard';

import { ScreenProps } from '../../@types/react-navigation';
import { CityWeatherInfoDTO } from '../../dtos/CityWeatherInfoDTO';
import { toCapitalize } from '../../utils/toCapitalize';

import HumiditySvg from '../../assets/humidity.svg';
import WindSvg from '../../assets/wind.svg';
import CloudSvg from '../../assets/cloud.svg';

import {
  Container,
  Header,
  City,
  Title,
  Subtitle,
  Content,
  MainInfo,
  CurrentInfo,
  Icon,
  WeatherDescription,
  CurrentTemperature,
  MinMaxTemperature,
  Min,
  Max,
  SideInfo,
  NextDays,
  Info,
  InfoTitle
} from './styles';

interface IParams {
  city: CityWeatherInfoDTO
};

export function CityScreen({ navigation, route } : ScreenProps) {
  const { city } = route.params as IParams;

  const currentWeatherDesc = toCapitalize(city.current.weather.description);
  const currentTemp = Math.round(city.current.temp);
  const dailyMinTemp = Math.round(city.daily[0].temp.min);
  const dailyMaxTemp = Math.round(city.daily[0].temp.max);
  const currentWindSpeed = Math.round(city.current.wind_speed * 3.6);
  const icon = city.current.weather.icon;

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
  
  function handleGoBack() {
    navigation.goBack();
  };

  return(
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />

        <City>
          <Title>{city.name}, {city.country}</Title>
          <Subtitle>Hoje</Subtitle>
        </City>
      </Header>

      <Content>
        <MainInfo>
          <CurrentInfo>
              <CurrentTemperature>{currentTemp}ºC</CurrentTemperature>
              <WeatherDescription>{currentWeatherDesc}</WeatherDescription>
          </CurrentInfo>
          <Icon source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }} />            
        </MainInfo>

        <MinMaxTemperature>
          <Min>min. {dailyMinTemp}ºC</Min>
          <Max>max. {dailyMaxTemp}ºC</Max>
        </MinMaxTemperature>

        <SideInfo>
          <Info>
            <HumiditySvg width={32} height={32} />
            <InfoTitle>{city.current.humidity}%</InfoTitle>
          </Info>
          <Info>
            <WindSvg width={32} height={32} />
            <InfoTitle>{currentWindSpeed} km/h</InfoTitle>
          </Info>
          <Info>
            <CloudSvg width={32} height={32} />
            <InfoTitle>{city.current.clouds}%</InfoTitle>
          </Info>
        </SideInfo>

        <NextDays>
          {
            formattedDailyData.map(item => (
              <WeekdayCard
                key={String(item.date)}
                data={item}
              />
            ))
          }
        </NextDays>
      </Content>
    </Container>
  );
};
