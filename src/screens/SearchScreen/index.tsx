import React, { useState, useEffect } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components';

import CitySvg from '../../assets/city.svg';
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
        const formattedCityName = encodeURI(cityName.trim());
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

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ zIndex: 1 }}>
      <Container>
        <Header>
          <InputWrapper>
            <TextInput
              placeholder="Buscar cidade"
              placeholderTextColor={theme.colors.text}
              onChangeText={setCityName}
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
          <Content>
            {
              cityInfo.id ? (
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
              ) : (
                <InitialMessage>
                  <CitySvg height={300} />
                  <MessageTitle>Busque por uma cidade!</MessageTitle>
                  <MessageSubtitle>Basta digitar o nome de uma cidade na barra de pesquisa acima e clicar em buscar</MessageSubtitle>
                </InitialMessage>
              )
            }          
          </Content>
        }
      </Container>
    </TouchableWithoutFeedback>
  );
};
