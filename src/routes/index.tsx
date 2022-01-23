import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackRoutes } from './app.stack.routes';

export function Routes() {
  return(
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
};
