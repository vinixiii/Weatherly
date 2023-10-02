import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import auth from '@react-native-firebase/auth';
import { useTheme } from 'styled-components';

import Input from '~/components/Input';

import {
  Container,
  Content,
  Header,
  HeaderContent,
  HeaderTitle,
  Title,
} from './styles';

export default function SignInScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signIn = () => {
    setIsLoading(true);

    try {
      auth().signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      Alert.alert(`Não foi possível efetuar o login: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = () => {
    setIsLoading(true);

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Conta criada com sucesso!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert(`Email já cadastrado`);
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert(`Email inválido`);
        }

        // Alert.alert(
        //   `Não foi possível criar sua conta o login: ${error.message}`,
        // );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior="padding"
    >
      <Container>
        <Header insetsTop={insets.top}>
          <HeaderContent>
            <HeaderTitle>Weatherly</HeaderTitle>
          </HeaderContent>
        </Header>

        <Content>
          <Title>Faça seu login!</Title>

          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <Input
            style={{ marginTop: 16 }}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            secureTextEntry
          />

          {isLoading ? (
            <ActivityIndicator color={theme.colors.main} size="large" />
          ) : (
            <View style={{ marginTop: 16 }}>
              <Button
                title="Entrar"
                onPress={signIn}
                disabled={email === '' || password === ''}
              />

              <Button
                title="Criar conta"
                onPress={signUp}
                disabled={email === '' || password === ''}
              />
            </View>
          )}
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
}
