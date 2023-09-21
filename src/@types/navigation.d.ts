import { CityWeatherInfoDTO } from '~/dtos/CityWeatherInfoDTO';

export type RootStackParamList = {
  MyCitiesScreen: { isFromCityScreen: boolean };
  CityScreen: { city: CityWeatherInfoDTO };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
