import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';

import { SearchScreen } from './src/screens/SearchScreen';
import { MyCitiesScreen } from './src/screens/MyCitiesScreen';
import theme from './src/global/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });

  if(!fontsLoaded) {
    return <AppLoading />;
  };

  return (
    <ThemeProvider theme={theme}>
      <MyCitiesScreen />
    </ThemeProvider>
  );
};
