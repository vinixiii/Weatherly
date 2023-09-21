import React from 'react';
import { ViewProps } from 'react-native';

// eslint-disable-next-line import/no-duplicates
import { addDays, format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import { ptBR } from 'date-fns/locale';

import { toCapitalize } from '~/utils/toCapitalize';

import {
  AditionalInfo,
  CityInfo,
  Container,
  DateText,
  Description,
  Icon,
  MaxTemperature,
  MinMaxTemperature,
  MinTemperature,
  Name,
  Temperature,
  Weather,
  WeatherInfo,
} from './styles';

interface IWeekdayCard extends ViewProps {
  data: {
    date: string;
    weekday: string;
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
  };
}

export function WeekdayCard({ data, ...rest }: IWeekdayCard) {
  const currentWeatherDesc = toCapitalize(data.weather.description);
  const currentTemp = Math.round(data.temp.day);
  const dailyMinTemp = Math.round(data.temp.min);
  const dailyMaxTemp = Math.round(data.temp.max);
  const { icon } = data.weather;

  const tomorrowDate = addDays(new Date(), 1);
  const formattedTomorrowDate = format(tomorrowDate, 'dd/MM/yyyy', {
    locale: ptBR,
  });

  return (
    <Container {...rest}>
      <WeatherInfo>
        <CityInfo>
          <Name>
            {data.date === formattedTomorrowDate ? 'Amanhã' : data.weekday}
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

      <AditionalInfo>
        <MinMaxTemperature>
          <MinTemperature>min. {dailyMinTemp}ºC</MinTemperature>
          <MaxTemperature>max. {dailyMaxTemp}ºC</MaxTemperature>
        </MinMaxTemperature>

        <DateText>{data.date}</DateText>
      </AditionalInfo>
    </Container>
  );
}
