import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { CityScreen } from '~/screens/CityScreen';
import { MyCitiesScreen } from '~/screens/MyCitiesScreen';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MyCitiesScreen"
    >
      <Screen name="MyCitiesScreen" component={MyCitiesScreen} />
      <Screen name="CityScreen" component={CityScreen} />
    </Navigator>
  );
}
