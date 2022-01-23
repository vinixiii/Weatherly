import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
  Container,
  WeatherInfo,
  CityInfo,
  Name,
  Country,
  Weather,
  Icon,
  Temperature,
  Actions,
  Buttons,
  DeleteButton,
  FavoriteButton,
  AditionalInfo,
  Description,
  MinMaxTemperature
} from './styles';

interface ICityWeatherCard {
  name: string;
  country: string;
}

export function CityWeatherCard({
  name,
  country,
} : ICityWeatherCard) {
  const theme = useTheme();

  return(
    <Container>
      <WeatherInfo>
        <CityInfo>
          <Name>{name}</Name>
          <Country>{country}</Country>
        </CityInfo>
        <Weather>
          <Icon source={{ uri: 'https://openweathermap.org/img/wn/10d@4x.png' }} />
          <Temperature>16ºC</Temperature>
        </Weather>
      </WeatherInfo>

      <Actions>
        <AditionalInfo>
          <Description>Nublado</Description>
          <MinMaxTemperature>min. 14ºC - max. 22ºC</MinMaxTemperature>
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
