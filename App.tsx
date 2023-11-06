import React, { useEffect } from 'react';
import { Alert, StatusBar } from 'react-native';
import Config from 'react-native-config';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
  useFonts,
} from '@expo-google-fonts/archivo';
import messaging from '@react-native-firebase/messaging';
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

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const fcmToken = await messaging().getToken();
      console.log('user token: ', fcmToken);

      messaging().onTokenRefresh(token => {
        console.log('new token: ', token);
      });
    }
  };

  useEffect(() => {
    console.log(Config.ENV_NAME);
  }, []);

  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
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
