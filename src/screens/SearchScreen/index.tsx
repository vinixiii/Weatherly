import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Config from 'react-native-config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { AnimatePresence, MotiView, useAnimationState } from 'moti';
import { useTheme } from 'styled-components';

import { CityCard } from '~/components/CityCard';
import { Loading } from '~/components/Loading';
import Presence from '~/components/Presence';

import useAuth from '~/hooks/useAuth';

import { CityInfoDTO } from '~/dtos/CityInfoDTO';

import db from '~/services/db';

import SearchImage from './components/SearchImage';
import {
  ClearIconWrapper,
  ClearTextButton,
  Container,
  Content,
  Header,
  InitialMessage,
  InputWrapper,
  MessageSubtitle,
  MessageTitle,
  SearchButton,
  TextInput,
} from './styles';

const { WEATHER_API_KEY } = Config;

export function SearchScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [cityIsAlreadyStored, setCityIsAlreadyStored] = useState(false);
  const [cityName, setCityName] = useState('');
  const [cityInfo, setCityInfo] = useState<CityInfoDTO | null>(null);

  const pressAnimationState = useAnimationState({
    from: {
      opacity: 0,
      scale: 0.8,
    },
    to: {
      opacity: 1,
      scale: 1,
    },
    pressed: {
      scale: [0.8, 1],
    },
  });

  const handleGetCityInfo = async () => {
    setIsLoading(true);

    try {
      if (cityName.trim()) {
        const formattedCityName = encodeURI(cityName.trim().toLowerCase());
        const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${formattedCityName}&APPID=${WEATHER_API_KEY}`;

        const response = await fetch(BASE_URL);
        const data = await response.json();

        if (response.status === 200) {
          const formattedData = {
            id: String(data.id),
            name: data.name,
            country: data.sys.country,
            lon: String(data.coord.lon),
            lat: String(data.coord.lat),
            favorite: false,
          };

          setCityInfo(formattedData);
        }
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert('Oops!', 'Cidade não encontrada.');
    } finally {
      setIsLoading(false);
    }
  };

  async function handleAddNewCity() {
    try {
      if (cityInfo?.id && user?.uid) {
        db.cities.add({
          id: cityInfo.id,
          name: cityInfo.name,
          country: cityInfo.country,
          lon: cityInfo.lon,
          lat: cityInfo.lat,
          favorite: false,
          userId: user.uid,
        });
      }

      setCityIsAlreadyStored(true);
    } catch (error) {
      console.error(error);
      Alert.alert('Oops!', 'Não foi possível adicionar esta cidade.');
    }
  }

  useEffect(() => {
    async function checkIfIsStoredCity() {
      if (cityInfo?.name) {
        const querySnapshot = await db.cities
          .where('userId', '==', user?.uid)
          .get();

        const storedCities = querySnapshot.docs.map(doc => {
          return {
            docId: doc.id,
            ...(doc.data() as CityInfoDTO),
          };
        });

        const storedCity = storedCities.find(
          city => city.name === cityInfo.name,
        );

        if (storedCity) {
          setCityIsAlreadyStored(true);
        } else {
          setCityIsAlreadyStored(false);
        }
      }
    }

    checkIfIsStoredCity();
  }, [cityInfo?.name, user?.uid]);

  useEffect(() => {
    if (cityName === '') {
      setCityInfo({} as CityInfoDTO);
    }
  }, [cityName]);

  return (
    <Container>
      <Header insetsTop={insets.top}>
        <InputWrapper>
          <TextInput
            placeholder="Nome da cidade"
            placeholderTextColor={theme.colors.textDetail}
            onChangeText={setCityName}
            value={cityName}
            onSubmitEditing={handleGetCityInfo}
          />

          <AnimatePresence>
            {!!cityName.trim() && (
              <ClearTextButton onPress={() => setCityName('')}>
                <MotiView
                  from={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  transition={{
                    type: 'timing',
                    duration: 80,
                  }}
                >
                  <ClearIconWrapper>
                    <Ionicons
                      name="close-outline"
                      size={18}
                      color={theme.colors.text}
                    />
                  </ClearIconWrapper>
                </MotiView>
              </ClearTextButton>
            )}
          </AnimatePresence>

          <SearchButton
            onPress={() => {
              handleGetCityInfo();
              pressAnimationState.transitionTo('pressed');
            }}
          >
            <MotiView state={pressAnimationState}>
              <Ionicons
                name="search-outline"
                size={24}
                color={theme.colors.text}
              />
            </MotiView>
          </SearchButton>
        </InputWrapper>
      </Header>

      {isLoading ? (
        <Loading />
      ) : (
        <Content>
          {cityInfo?.id ? (
            <Presence>
              <CityCard
                data={{
                  name: cityInfo?.name,
                  country: cityInfo?.country,
                  addCity: handleAddNewCity,
                  cityIsAlreadyStored,
                }}
              />
            </Presence>
          ) : (
            <InitialMessage>
              <SearchImage />

              <MessageTitle>Buscar cidade!</MessageTitle>

              <MessageSubtitle>
                Utilize a barra de busca para encontrar uma cidade pelo nome e
                adiciona-la a sua lista.
              </MessageSubtitle>
            </InitialMessage>
          )}
        </Content>
      )}
    </Container>
  );
}
