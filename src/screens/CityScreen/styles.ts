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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const City = styled.View``;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary600};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.title};
  text-align: right;
`;

export const Subtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: right;
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding: 0 ${RFValue(24)}px;
`;

export const MainInfo = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.Image`
  position: absolute;
  top: 0;
  width: ${RFValue(150)}px;
  height: ${RFValue(150)}px;
`;

export const WeatherDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${RFValue(140)}px;
`;

export const CurrentTemperature = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary600};
  font-size: ${RFValue(48)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const MinMaxTemperature = styled.View`
  flex-direction: row;
  align-items: center;
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
  margin-top: 16px;
  margin-right: -12px;
`;

export const Info = styled.View`
  min-width: 26%;
  height: 92px;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  margin-right: 12px;
  margin-bottom: 12px;
  padding: 16px;
`;

export const InfoTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.textDetail};
`;

export const NextDays = styled.View``;

