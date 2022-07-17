import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  MyCitiesScreen: undefined;
  CityScreen: { city: CityWeatherInfoDTO };
};

export type ScreenProps = StackScreenProps<RootStackParamList>;
