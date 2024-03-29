import React from 'react';
import { useTheme } from 'styled-components';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

import {
  Container
} from './styles';

interface IBackButton extends BorderlessButtonProps {
  color?: string;
}

export function BackButton({ color, ...rest } : IBackButton) {
  const theme = useTheme();

  return(
    <Container {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={32}
        color={color ? color : theme.colors.title}
      />
    </Container>
  );
};
