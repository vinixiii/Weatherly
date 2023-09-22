import React, { useRef } from 'react';

import analytics from '@react-native-firebase/analytics';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';

import { TabRoutes } from './app.tab.routes';

export const navigationRef = createNavigationContainerRef();

const ignoreCatch = () => undefined;

export function Routes() {
  const routeNameRef = useRef<string>();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute()?.name;
      }}
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          analytics()
            .logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            })
            .catch(ignoreCatch);
        }

        routeNameRef.current = currentRouteName;
      }}
    >
      <TabRoutes />
    </NavigationContainer>
  );
}
