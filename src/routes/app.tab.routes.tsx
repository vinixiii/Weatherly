import React from 'react';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Easing } from 'react-native-reanimated';

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDynamicAnimation } from 'moti';
import { useTheme } from 'styled-components';

import { SearchScreen } from '~/screens/SearchScreen';

import { StackRoutes } from './app.stack.routes';
import { INDICATOR_WIDTH, MotiIndicator } from './styles';

const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes() {
  const theme = useTheme();

  const animation = useDynamicAnimation();

  const handleSelect = (index: number) => {
    animation.animateTo({
      translateX: index * INDICATOR_WIDTH,
    });
  };

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.textDetail,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? getBottomSpace() - 20 : 0,
          height: getBottomSpace() + 60,
          backgroundColor: theme.colors.secondaryBackground,
        },
        tabBarBackground: () => (
          <MotiIndicator
            state={animation}
            transition={{
              type: 'timing',
              easing: Easing.inOut(Easing.ease),
              duration: 400,
            }}
          />
        ),
      }}
      initialRouteName="MyCitiesTabScreen"
    >
      <Screen
        name="MyCitiesTabScreen"
        component={StackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="list-outline" size={24} color={color} />
          ),
        }}
        listeners={() => ({
          focus: () => handleSelect(0),
        })}
      />
      <Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" size={24} color={color} />
          ),
        }}
        listeners={() => ({
          focus: () => handleSelect(1),
        })}
      />
    </Navigator>
  );
}
