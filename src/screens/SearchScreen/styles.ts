import styled from 'styled-components/native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primaryBackground};
`;

export const Header = styled.View`
  width: 100%;
  padding: 0 ${RFValue(24)}px;
  margin-top: ${getStatusBarHeight() + 36}px;
  margin-bottom: ${RFValue(36)}px;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  margin-bottom: ${RFValue(8)}px;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
`;

export const TextInput = styled.TextInput`
  flex: 1;
  padding: 0 ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const SearchButton = styled(RectButton)`
  width: ${RFValue(56)}px;
  height: ${RFValue(56)}px;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.View`
  flex: 1;
`;

export const InitialMessage = styled.View`
  margin: 0 ${RFValue(24)}px;
  align-items: center;
  justify-content: center;
`;

export const MessageTitle = styled.Text`
  margin-top: ${RFValue(36)}px;
  margin-bottom: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.primary600};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.title};
  text-align: center;
`;

export const MessageSubtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;
