import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  useFonts,
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from '@expo-google-fonts/archivo';
import remoteConfig from '@react-native-firebase/remote-config';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components/native';

import { AuthContextProvider } from '~/contexts/AuthContext';

import theme from './src/global/styles/theme';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  useEffect(() => {
    const initRemoteConfig = async () => {
      const remoteConfigInstance = remoteConfig();

      try {
        remoteConfigInstance.setDefaults({
          favorite_city_enabled: false,
        });

        await remoteConfigInstance.fetchAndActivate();
      } catch {
        //
      }
    };

    initRemoteConfig();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />

          <Routes />
        </AuthContextProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
