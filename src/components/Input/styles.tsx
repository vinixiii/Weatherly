import { TextInput } from 'react-native';

import styled from 'styled-components/native';

interface InputProps {
  error?: boolean;
  focused?: boolean;
  isDisabled?: boolean;
}

export const Container = styled.View``;

export const Border = styled.View<InputProps>`
  padding: ${({ focused }) => (focused ? 2 : 1)}px;
  width: 100%;
`;

export const Content = styled.View<InputProps>`
  align-items: center;
  background-color: ${({ theme, isDisabled }) =>
    !isDisabled ? theme.colors.secondaryBackground : theme.colors.gray400};
  border-color: transparent;
  flex-direction: row;
  width: 100%;
`;

export const StyledTextInput = styled(TextInput).attrs<InputProps>(
  ({ theme }) => ({
    placeholderTextColor: theme.colors.textDetail,
  }),
)<InputProps>`
  flex: 1;
  color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.gray500 : theme.colors.text};
  min-height: 46px;
  padding: 8px 16px;
`;

export const PasswordButton = styled.TouchableOpacity.attrs({
  activeOpacity: Number(0.7),
})`
  margin-right: 16px;
`;

export const SearchButton = styled.TouchableOpacity.attrs({
  activeOpacity: Number(0.7),
})`
  margin-right: 16px;
`;
