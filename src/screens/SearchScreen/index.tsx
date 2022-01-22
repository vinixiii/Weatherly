import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import CitySvg from '../../assets/city.svg';

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

  return(
    <Container>
      <Header>
        <InputWrapper>
          <TextInput
            placeholder="Buscar cidade"
            placeholderTextColor={theme.colors.text}
          />
          <SearchButton>
            <Feather
              name="search"
              size={24}
              color={theme.colors.main}
            />
          </SearchButton>
        </InputWrapper>
      </Header>

      <Content>
        <InitialMessage>
          <CitySvg height={300} />
          <MessageTitle>Busque por uma cidade!</MessageTitle>
          <MessageSubtitle>Basta digitar o nome de uma cidade na barra de pesquisa acima e clicar em buscar</MessageSubtitle>
        </InitialMessage>
      </Content>
    </Container>
  );
};
