import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { CityWeatherInfoDTO } from '../../dtos/CityWeatherInfoDTO';

import {
  Container,
  WeatherInfo,
  CityInfo,
  Name,
  Description,
  Weather,
  Icon,
  Temperature,
  Actions,
  Buttons,
  DeleteButton,
  FavoriteButton,
  AditionalInfo,
  MinTemperature,
  MaxTemperature
} from './styles';

interface ICityWeatherCard {
  data: CityWeatherInfoDTO
}

export function CityWeatherCard({ data } : ICityWeatherCard) {
  const theme = useTheme();
  
  const currentWeatherDesc = toCapitalize(data.current.weather.description);
  const currentTemp = Math.round(data.current.temp);
  const dailyMinTemp = Math.round(data.daily[0].temp.min);
  const dailyMaxTemp = Math.round(data.daily[0].temp.max);
  const icon = data.current.weather.icon;
  
  function toCapitalize(string: string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return(
    <Container>
      <WeatherInfo>
        <CityInfo>
          <Name>{data.name}, {data.country}</Name>
          <Description>{currentWeatherDesc}</Description>
        </CityInfo>
        <Weather>
          <Temperature>{currentTemp}ºC</Temperature>
          <Icon source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }} />
        </Weather>
      </WeatherInfo>

      <Actions>
        <AditionalInfo>
        <MinTemperature>min. {dailyMinTemp}ºC</MinTemperature>
          <MaxTemperature>max. {dailyMaxTemp}ºC</MaxTemperature>
        </AditionalInfo>

        <Buttons>
          <DeleteButton>
            <Ionicons
              name="md-trash-bin-outline" 
              size={24}
              color={theme.colors.text} />
          </DeleteButton>
          <FavoriteButton>
            <Ionicons
              name="heart-outline" 
              size={24}
              color={theme.colors.main} />
          </FavoriteButton>
        </Buttons>
      </Actions>
    </Container>
  );
};
