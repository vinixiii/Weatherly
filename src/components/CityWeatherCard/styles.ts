import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  padding-top: ${RFValue(24)}px;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  justify-content: space-between;
  margin-bottom: ${RFValue(24)}px;
`;

export const WeatherInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${RFValue(24)}px;
`;

export const CityInfo = styled.View``;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Country = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.textDetail};
`;

export const Weather = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled.Image`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;
`;

export const Temperature = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary600};
  font-size: ${RFValue(32)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${RFValue(8)}px 0;
  padding-left: ${RFValue(24)}px;
  padding-right: ${RFValue(8)}px;
`;

export const Buttons = styled.View`
  flex-direction: row;
`;

export const DeleteButton = styled.TouchableOpacity`
  width: ${RFValue(56)}px;
  height: ${RFValue(56)}px;
  align-items: center;
  justify-content: center;
`;

export const FavoriteButton = styled.TouchableOpacity`
  width: ${RFValue(56)}px;
  height: ${RFValue(56)}px;
  align-items: center;
  justify-content: center;
`;

export const AditionalInfo = styled.View``;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary600};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.main};
  margin-bottom: ${RFValue(8)}px;
`;

export const MinMaxTemperature = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.textDetail};
`;



