import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';

import { StackRoutes } from './app.stack.routes';
import { SearchScreen } from '../screens/SearchScreen';

const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes() {
  const theme = useTheme();

  return(
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.textDetail,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? getBottomSpace() - 20 : 0,
          height: 75,
          backgroundColor: theme.colors.secondaryBackground,
        },
      }}
      initialRouteName="MyCitiesTabScreen"
    >
      <Screen
        name="MyCitiesTabScreen"
        component={StackRoutes}
        options={{
          tabBarIcon: (({ color }) => (
            <Ionicons name="list-outline" size={24} color={color} />
          ))
        }}
      />
      <Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: (({ color }) => (
            <Ionicons name="search-outline" size={24} color={color} />
          ))
        }}
      />
    </Navigator>
  );
};
