import React, { useMemo } from 'react';
import { TouchableOpacityProps } from 'react-native';

import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface IButton extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({
  title,
  variant = 'primary',
  disabled,
  ...rest
}: IButton) {
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
          text: theme.colors.primaryBackground,
        };

      case 'outline':
        return {
          background: theme.colors.primaryBackground,
          text: theme.colors.title,
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
    theme.colors.title,
    variant,
  ]);

  return (
    <Container
      backgroundColor={colors.background}
      isOutline={variant === 'outline'}
      disabled={disabled}
      {...rest}
    >
      <Title color={colors.text} disabled={disabled}>
        {title}
      </Title>
    </Container>
  );
}
