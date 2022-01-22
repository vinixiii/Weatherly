import styled from 'styled-components/native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: #F8F9FA;
`;

export const Header = styled.View`
  width: 100%;
  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + 36}px;
  margin-bottom: 36px;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
  background-color: #FFF;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  padding: 0 24px;
  background-color: #FFF;
`;

export const SearchButton = styled(RectButton)`
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
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
  font-size: 22px;
  color: #47474D;
  font-weight: bold;
  text-align: center;
`;

export const MessageSubtitle = styled.Text`
  font-size: 15px;
  text-align: center;
  color: #7A7A80;
`;
