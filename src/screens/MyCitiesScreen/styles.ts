import styled from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primaryBackground};
`;

export const Header = styled.View`
  width: 100%;
  padding: 0 ${RFValue(24)}px;
  padding-top: ${getStatusBarHeight() + 36}px;
  padding-bottom: ${RFValue(24)}px;
  margin-bottom: ${RFValue(24)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary600};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.main};
`;

export const Subtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Content = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 0 ${RFValue(24)}px;
`;
