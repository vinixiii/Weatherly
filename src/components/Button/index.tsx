import React, { useMemo } from 'react';
import { TouchableOpacityProps } from 'react-native';

import { useTheme } from 'styled-components';

import { Container, Loading, Title } from './styles';

interface IButton extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
}

export function Button({
  title,
  variant = 'primary',
  isLoading,
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
      {isLoading && <Loading color={colors.text} />}

      <Title
        opacity={isLoading ? 0 : 1}
        color={colors.text}
        disabled={disabled}
      >
        {title}
      </Title>
    </Container>
  );
}
