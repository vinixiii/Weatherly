import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { AddButton, CityInfo, CityName, Container, Country } from './styles';

interface ICityCardData {
  name: string;
  country: string;
  addCity: () => void;
  cityIsAlreadyStored: boolean;
}

interface ICityCard {
  data: ICityCardData;
}

export function CityCard({ data }: ICityCard) {
  const theme = useTheme();

  return (
    <Container>
      <CityInfo>
        <CityName>{data.name}</CityName>
        <Country>{data.country}</Country>
      </CityInfo>

      <AddButton onPress={data.addCity} disabled={data.cityIsAlreadyStored}>
        {data.cityIsAlreadyStored ? (
          <Ionicons
            name="checkmark-sharp"
            size={24}
            color={theme.colors.success}
          />
        ) : (
          <Ionicons name="add-sharp" size={24} color={theme.colors.main} />
        )}
      </AddButton>
    </Container>
  );
}
