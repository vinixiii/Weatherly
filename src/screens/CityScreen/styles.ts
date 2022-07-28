import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
`;

export const Header = styled.View`
  width: 100%;
  padding: 0 ${RFValue(24)}px;
  padding-top: ${getStatusBarHeight() + 36}px;
  padding-bottom: ${RFValue(24)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
`;

export const City = styled.View``;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary600};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.title};
  text-align: right;
`;

export const Subtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: right;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
  },
})``;

export const MainInfo = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${RFValue(24)}px;
  margin-top: ${RFValue(36)}px;
  margin-bottom: ${RFValue(36)}px;
`;

export const CurrentInfo = styled.View``;

export const CurrentTemperature = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary600};
  font-size: ${RFValue(48)}px;
  color: ${({ theme }) => theme.colors.title};
  margin-bottom: ${Platform.OS === 'ios' ? RFValue(16) : 0}px;
`;

export const WeatherDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Icon = styled.Image`
  position: absolute;
  top: -36px;
  right: ${RFValue(8)}px;
  width: ${RFValue(150)}px;
  height: ${RFValue(150)}px;
`;

export const MinMaxTemperature = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Min = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.textDetail};
  margin-right: ${RFValue(48)}px;
`;

export const Max = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.main};
`;

export const SideInfo = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(24)}px;
  margin-right: ${RFValue(-12)}px;
  padding: 0 ${RFValue(24)}px;
`;

export const Info = styled.View`
  height: 92px;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryBackground};
  margin-right: 6px;
  margin-left: 6px;
  padding: 16px;
`;

export const InfoTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.textDetail};
`;

export const NextDays = styled.View`
  padding: 0 ${RFValue(24)}px;
  padding-top: ${RFValue(24)}px;
  padding-bottom: ${RFValue(12)}px;
`;
