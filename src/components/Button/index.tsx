import React, { useMemo } from 'react';
import { TouchableOpacityProps } from 'react-native';

import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface IButton extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({ title, variant = 'primary', ...rest }: IButton) {
  const theme = useTheme();

  const colors = useMemo(() => {
    switch (variant) {
      case 'primary':
        return {
          background: theme.colors.border,
          text: theme.colors.primaryBackground,
        };

      case 'secondary':
        return {
          background: theme.colors.main,
          text: theme.colors.text,
        };

      case 'outline':
        return {
          background: theme.colors.primaryBackground,
          text: theme.colors.text,
        };

      default:
        return {
          background: theme.colors.border,
          text: theme.colors.primaryBackground,
        };
    }
  }, [
    theme.colors.border,
    theme.colors.main,
    theme.colors.primaryBackground,
    theme.colors.text,
    variant,
  ]);

  return (
    <Container
      backgroundColor={colors.background}
      isOutline={variant === 'outline'}
      {...rest}
    >
      <Title color={colors.text}>{title}</Title>
    </Container>
  );
}
