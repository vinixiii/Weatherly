import { RFValue } from 'react-native-responsive-fontsize';

import styled, { css } from 'styled-components/native';

interface ContainerProps {
  backgroundColor: string;
  isOutline: boolean;
}

interface TitleProps {
  color: string;
  opacity: number;
  disabled?: boolean;
}

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: Number(0.7),
})<ContainerProps>`
  justify-content: center;
  align-items: center;
  padding: ${RFValue(8)}px ${RFValue(16)}px;
  background-color: ${({ backgroundColor }) => backgroundColor};

  ${({ isOutline }) =>
    isOutline &&
    css`
      border-width: 1px;
      border-color: ${({ theme }) => theme.colors.line};
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      border-width: unset;
      border-color: unset;
      background-color: ${({ theme }) => theme.colors.gray100};
    `}
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
})`
  align-self: center;
  position: absolute;
`;

export const Title = styled.Text<TitleProps>`
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(14)}px;
  color: ${({ color }) => color};
  opacity: ${({ opacity }) => opacity};

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${({ theme }) => theme.colors.gray300};
    `}
`;
