import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
  Container,
  CityInfo,
  CityName,
  Country,
  AddButton
} from './styles';
import { ActivityIndicator } from 'react-native';

interface ICityCardData {
  name: string;
  country: string;
  addCity: () => void;
  icon: 'add-sharp' | 'checkmark-sharp';
  isAddingCity: boolean;
  isAddButtonDisabled: boolean;
};

interface ICityCard {
  data: ICityCardData;
};

export function CityCard({ data } : ICityCard) {
  const theme = useTheme();

  return(
    <Container>
      <CityInfo>
        <CityName>{data.name}</CityName>
        <Country>{data.country}</Country>
      </CityInfo>
              
      <AddButton onPress={data.addCity} disabled={data.isAddButtonDisabled}>
        {
          data.isAddingCity ? (
            <ActivityIndicator
              color={theme.colors.title}
              size="large"
              style={{ flex: 1}}
            />
          ) : (
            <Ionicons
              name={data.icon}
              size={24}
              color={data.isAddButtonDisabled ? theme.colors.success : theme.colors.main}
            />
          )
        }
      </AddButton>
    </Container>
  );
};
