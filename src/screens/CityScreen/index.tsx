import React from 'react';

import { BackButton } from '../../components/BackButton';

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

export function CityScreen() {
  return(
    <Container>
      <Header>
        <BackButton />

        <City>
          <Title>São Paulo, BR</Title>
          <Subtitle>Hoje</Subtitle>
        </City>
      </Header>

      <Content>
        <MainInfo>
          <Icon source={{ uri: `https://openweathermap.org/img/wn/${'10d'}@4x.png` }} />
          <WeatherDescription>Nublado</WeatherDescription>
          <CurrentTemperature>16ºC</CurrentTemperature>
          <MinMaxTemperature>
            <Min>min. 11ºC</Min>
            <Max>max. 22ºC</Max>
          </MinMaxTemperature>
        </MainInfo>

        <SideInfo>
          <Info>
            <HumiditySvg width={32} height={32} />
            <InfoTitle>87%</InfoTitle>
          </Info>
          <Info>
            <WindSvg width={32} height={32} />
            <InfoTitle>2.57 m/s</InfoTitle>
          </Info>
          <Info>
            <CloudSvg width={32} height={32} />
            <InfoTitle>20%</InfoTitle>
          </Info>
        </SideInfo>

        <NextDays></NextDays>
      </Content>
    </Container>
  );
};
