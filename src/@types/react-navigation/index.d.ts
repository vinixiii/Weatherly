import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  MyCitiesScreen: { isFromCityScreen: boolean };
  CityScreen: { city: CityWeatherInfoDTO };
};

export type ScreenProps = StackScreenProps<RootStackParamList>;
