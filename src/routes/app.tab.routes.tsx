import React from 'react';
import { Platform } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDynamicAnimation } from 'moti';
import { useTheme } from 'styled-components';

import { SearchScreen } from '~/screens/SearchScreen';

import { StackRoutes } from './app.stack.routes';
import { INDICATOR_WIDTH, MotiIndicator } from './styles';

const { Navigator, Screen } = createBottomTabNavigator();

export const BOTTOM_TAB_HEIGHT = 62;

export function TabRoutes() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

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
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.textDetail,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? insets.bottom - 20 : 0,
          height: BOTTOM_TAB_HEIGHT + (insets.bottom || 6),
          backgroundColor: theme.colors.secondaryBackground,
          paddingBottom: insets.bottom || 14,
          paddingTop: 8,
          borderTopWidth: 0,
        },
        tabBarBackground: () => (
          <MotiIndicator
            bottom={insets.bottom + BOTTOM_TAB_HEIGHT}
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
          tabBarLabel: 'Cidades',
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
          tabBarLabel: 'Pesquisar',
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
