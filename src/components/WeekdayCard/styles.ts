import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Platform } from 'react-native';

export const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  justify-content: space-between;
  margin-bottom: ${RFValue(12)}px;
  padding: ${RFValue(16)}px;
`;

export const WeatherInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CityInfo = styled.View``;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary600};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.textDetail};
  margin-top: ${Platform.OS === 'ios' ? RFValue(8) : 0}px;
`;

export const Weather = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
`;

export const Temperature = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary600};
  font-size: ${RFValue(22)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const AditionalInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${RFValue(15)}px;
`;

export const MinMaxTemperature = styled.View`
  flex-direction: row;
`;

export const MinTemperature = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.textDetail};
  margin-right: ${RFValue(12)}px;
`;

export const MaxTemperature = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.main};
`;

export const DateText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.textDetail};
  margin-right: ${RFValue(12)}px;
`;
