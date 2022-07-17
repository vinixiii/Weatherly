import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: Number(0.7),
})`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  justify-content: space-between;
  margin-bottom: ${RFValue(12)}px;
  padding: 0 ${RFValue(16)}px;
  padding-top: ${RFValue(16)}px;
`;

export const WeatherInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CityInfo = styled.View`
  flex: 1;
  padding-right: ${RFValue(12)}px;
`;

export const Name = styled.Text.attrs({
  numberOfLines: 1,
})`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.primary600};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Description = styled.Text.attrs({
  numberOfLines: 1,
})`
  flex: 1;
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

export const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Buttons = styled.View`
  flex-direction: row;
`;

export const DeleteButton = styled.TouchableOpacity`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  align-items: center;
  justify-content: center;
`;

export const FavoriteButton = styled.TouchableOpacity`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  align-items: center;
  justify-content: center;
`;

export const AditionalInfo = styled.View`
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
