import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primaryBackground};
`;

export const Header = styled.View`
  width: 100%;
  padding: 0 ${RFValue(24)}px;
  padding-top: ${getStatusBarHeight() + 36}px;
  padding-bottom: ${RFValue(24)}px;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryBackground};
`;

export const TextInput = styled.TextInput`
  flex: 1;
  padding: 0 0 0 ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const ClearTextButton = styled.TouchableOpacity.attrs({
  activeOpacity: Number(0.7),
})`
  width: ${RFValue(24)}px;
  height: ${RFValue(24)}px;
  margin-right: ${RFValue(12)}px;
  margin-left: ${RFValue(24)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: ${RFValue(24)}px;
`;

export const SearchButton = styled.TouchableOpacity.attrs({
  activeOpacity: Number(0.7),
})`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  keyboardShouldPersistTaps: 'handled',
  contentContainerStyle: {
    flexGrow: 1,
    padding: RFValue(24),
  },
})``;

export const InitialMessage = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const MessageTitle = styled.Text`
  margin-top: ${RFValue(24)}px;
  margin-bottom: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.primary600};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.title};
  text-align: center;
`;

export const MessageSubtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;
