import React from 'react';

import { CityWeatherCard } from '../../components/CityWeatherCard';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content
} from './styles';

export function MyCitiesScreen() {
  return(
    <Container>
      <Header>
        <Title>Weatherly</Title>
        <Subtitle>Minhas cidades</Subtitle>
      </Header>

      <Content
        data={[1, 2, 3, 4, 6]}
        keyExtractor={item => String(item)}
        renderItem={(item) => (
          <CityWeatherCard
            name="São Paulo"
            country="BR"
          />
        )}
      />
    </Container>
  );
};
