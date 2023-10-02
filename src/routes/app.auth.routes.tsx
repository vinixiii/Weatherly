import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '~/screens/SignIn';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SignInScreen"
    >
      <Screen name="SignInScreen" component={SignInScreen} />
    </Navigator>
  );
}
