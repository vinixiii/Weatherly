import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { AnimatePresence, MotiView } from 'moti';
import { useTheme } from 'styled-components';

import { AddButton, CityInfo, CityName, Container, Country } from './styles';

const presenceAnimation = {
  from: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
  },
  transition: {
    type: 'timing',
    duration: 80,
  },
} as any;

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
        <AnimatePresence exitBeforeEnter>
          {data.cityIsAlreadyStored ? (
            <MotiView key="check-icon" {...presenceAnimation}>
              <Ionicons
                name="checkmark-sharp"
                size={24}
                color={theme.colors.success}
              />
            </MotiView>
          ) : (
            <MotiView key="add-icon" {...presenceAnimation}>
              <Ionicons name="add-sharp" size={24} color={theme.colors.main} />
            </MotiView>
          )}
        </AnimatePresence>
      </AddButton>
    </Container>
  );
}
