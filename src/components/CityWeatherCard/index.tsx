import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import remoteConfig from '@react-native-firebase/remote-config';
import { useTheme } from 'styled-components';

import { CityWeatherInfoDTO } from '~/dtos/CityWeatherInfoDTO';

import { toCapitalize } from '~/utils/toCapitalize';

import {
  Actions,
  AditionalInfo,
  Buttons,
  CityInfo,
  Container,
  DeleteButton,
  Description,
  FavoriteButton,
  Icon,
  MaxTemperature,
  MinTemperature,
  Name,
  Temperature,
  Weather,
  WeatherInfo,
} from './styles';

interface ICityWeatherCard extends TouchableOpacityProps {
  data: CityWeatherInfoDTO;
  onDelete: () => void;
  onFavorite: () => void;
}

export function CityWeatherCard({
  data,
  onDelete,
  onFavorite,
  ...rest
}: ICityWeatherCard) {
  const theme = useTheme();

  const currentWeatherDesc = toCapitalize(data.current.weather.description);
  const currentTemp = Math.round(data.current.temp);
  const dailyMinTemp = Math.round(data.daily[0].temp.min);
  const dailyMaxTemp = Math.round(data.daily[0].temp.max);
  const { icon } = data.current.weather;

  const isFavoriteCityEnabled = remoteConfig()
    .getValue('favorite_city_enabled')
    .asBoolean();

  return (
    <Container {...rest}>
      <WeatherInfo>
        <CityInfo>
          <Name>
            {data.name}, {data.country}
          </Name>
          <Description>{currentWeatherDesc}</Description>
        </CityInfo>
        <Weather>
          <Temperature>{currentTemp}ºC</Temperature>
          <Icon
            source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }}
          />
        </Weather>
      </WeatherInfo>

      <Actions>
        <AditionalInfo>
          <MinTemperature>min. {dailyMinTemp}ºC</MinTemperature>
          <MaxTemperature>max. {dailyMaxTemp}ºC</MaxTemperature>
        </AditionalInfo>

        <Buttons>
          <DeleteButton onPress={onDelete}>
            <Ionicons
              name="md-trash-bin-outline"
              size={24}
              color={theme.colors.text}
            />
          </DeleteButton>

          {isFavoriteCityEnabled && (
            <FavoriteButton onPress={onFavorite}>
              <Ionicons
                name={data.favorite ? 'heart' : 'heart-outline'}
                size={24}
                color={theme.colors.main}
              />
            </FavoriteButton>
          )}
        </Buttons>
      </Actions>
    </Container>
  );
}
