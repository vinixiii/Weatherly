import React from 'react';
import { Feather } from '@expo/vector-icons';

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
  return(
    <Container>
      <Header>
        <InputWrapper>
          <TextInput
            placeholder="Buscar cidade"
          />
          <SearchButton>
            <Feather
              name="search"
              size={24}
              color="#67527D"
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
