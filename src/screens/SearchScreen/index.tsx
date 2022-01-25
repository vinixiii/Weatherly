import React, { useState, useEffect } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components';

import SearchIllustration from '../../assets/location-search.svg';
import { CityCard } from '../../components/CityCard';
import { Loading } from '../../components/Loading';

import { CityInfoDTO } from '../../dtos/CityInfoDTO';

const { WEATHER_API_KEY } = process.env;

import {
  Container,
  Header,
  InputWrapper,
  TextInput,
  SearchButton,
  Content,
  InitialMessage,
  MessageTitle,
  MessageSubtitle
} from './styles';

export function SearchScreen() {
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [isAddingCity, setIsAddingCity] = useState(false);
  const [cityIsAlreadyStored, setCityIsAlreadyStored] = useState(false);
  const [cityName, setCityName] = useState('');
  const [cityInfo, setCityInfo] = useState<CityInfoDTO>({} as CityInfoDTO);

  async function handleGetCityInfo() {
    setIsLoading(true);

    try {
      if(cityName.trim()) {
        const formattedCityName = encodeURI(cityName.trim().toLowerCase());
        const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${formattedCityName}&APPID=${WEATHER_API_KEY}`

        const response = await fetch(BASE_URL);
        const data = await response.json();

        const formattedData = {
          id: String(data.id),
          name: data.name,
          country: data.sys.country,
          lon: String(data.coord.lon),
          lat: String(data.coord.lat),
          favorite: false,
        };

        setCityInfo(formattedData);
      };
    } catch (error: any) {
      console.error(error);
      Alert.alert('Oops!', 'Cidade não encontrada.');
    } finally {
      setIsLoading(false);
    }
  };

  async function handleAddNewCity() {
    setIsAddingCity(true);

    const dataStorageKey = `@weatherly:cities`;

    try {
      const data = await AsyncStorage.getItem(dataStorageKey);
      const currentData = data ? JSON.parse(data) : [];

      const cities = [
        ...currentData,
        cityInfo
      ];

      await AsyncStorage.setItem(dataStorageKey, JSON.stringify(cities));
    } catch (error) {
      console.error(error);
      Alert.alert('Oops!', 'Não foi possível adicionar esta cidade.');
    } finally {
      setIsAddingCity(false);
    };
  };

  useEffect(() => {
    async function checkIfIsStoredCity() {
      const dataStorageKey = `@weatherly:cities`;
      const data = await AsyncStorage.getItem(dataStorageKey);
      const transactions = data ? JSON.parse(data) : [];

      const storedCities = transactions.filter((item: CityInfoDTO) => item.name === cityInfo.name);

      if(storedCities.length > 0) {
        setCityIsAlreadyStored(true);
      } else {
        setCityIsAlreadyStored(false);
      }

      // await AsyncStorage.removeItem(dataStorageKey);
    };

    checkIfIsStoredCity();
  }, [cityInfo, isAddingCity, isLoading]);

  useEffect(() => {
    setCityInfo({} as CityInfoDTO);
  }, [cityName === '']);

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ zIndex: 1 }}>
      <Container>
        <Header>
          <InputWrapper>
            <TextInput
              placeholder="Nome da cidade"
              placeholderTextColor={theme.colors.textDetail}
              onChangeText={setCityName}
              value={cityName}
            />
            <SearchButton
              onPress={handleGetCityInfo}
            >
              <Ionicons
                name="search-outline"
                size={24}
                color={theme.colors.text}
              />
            </SearchButton>
          </InputWrapper>
        </Header>

        {
          isLoading
          ? <Loading />
          :
          <>
            {
              cityInfo.id ? (
                <Content>
                  <CityCard
                    data={{
                      name: cityInfo.name,
                      country: cityInfo.country,
                      addCity: handleAddNewCity,
                      icon: cityIsAlreadyStored ? "checkmark-sharp" : "add-sharp",
                      isAddingCity: isAddingCity,
                      isAddButtonDisabled: cityIsAlreadyStored
                    }}
                  />
                </Content>
              ) : (
                <InitialMessage>
                  <SearchIllustration height={200} />
                  <MessageTitle>Buscar cidade!</MessageTitle>
                  <MessageSubtitle>Utilize a barra de busca para encontrar uma cidade pelo nome e adiciona-la a sua lista.</MessageSubtitle>
                </InitialMessage>
              )
            }          
          </>
        }
      </Container>
    </TouchableWithoutFeedback>
  );
};
