import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  MyCitiesScreen: undefined;
  CityScreen: { city: CityWeatherInfoDTO };
};

type ScreenProps = StackScreenProps<RootStackParamList>;
