import React from 'react';
import { useRoute } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';

import { ScreenProps } from '../../@types/react-navigation';
import { CityWeatherInfoDTO } from '../../dtos/CityWeatherInfoDTO';

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
import { toCapitalize } from '../../utils/toCapitalize';

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

  console.log(city);

  function handleGoBack() {
    navigation.goBack();
  }

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
          <Icon source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }} />
          <WeatherDescription>{currentWeatherDesc}</WeatherDescription>
          <CurrentTemperature>{currentTemp}ºC</CurrentTemperature>
          <MinMaxTemperature>
            <Min>min. {dailyMinTemp}ºC</Min>
            <Max>max. {dailyMaxTemp}ºC</Max>
          </MinMaxTemperature>
        </MainInfo>

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

        <NextDays></NextDays>
      </Content>
    </Container>
  );
};
