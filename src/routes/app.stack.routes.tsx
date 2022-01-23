import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MyCitiesScreen } from '../screens/MyCitiesScreen';
import { CityScreen } from '../screens/CityScreen';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return(
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MyCities"
    >
      <Screen
        name="MyCitiesScreen"
        component={MyCitiesScreen}
      />
      <Screen
        name="CityScreen"
        component={CityScreen}
      />
    </Navigator>
  );
};
