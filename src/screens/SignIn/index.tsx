import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import auth from '@react-native-firebase/auth';

import { Button } from '~/components/Button';
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
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isSignInLoading, setIsSignInLoading] = useState<boolean>(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState<boolean>(false);

  const signIn = () => {
    setIsSignInLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          Alert.alert(`Email inválido`);
          return;
        }

        Alert.alert(
          `Não foi possível efetuar o login. Revise suas credenciais e tente novamente.`,
        );
      })
      .finally(() => {
        setIsSignInLoading(false);
      });
  };

  const signUp = () => {
    setIsSignUpLoading(true);

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Conta criada com sucesso!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Email já cadastrado');
          return;
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Email inválido');
          return;
        }

        Alert.alert(
          `Não foi possível efetuar o cadastro. Revise suas credenciais e tente novamente.`,
        );
      })
      .finally(() => {
        setIsSignUpLoading(false);
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

          <View style={{ marginTop: 32 }}>
            <Button
              variant="secondary"
              title="Entrar"
              onPress={signIn}
              disabled={email === '' || password === ''}
              isLoading={isSignInLoading}
            />

            <Button
              style={{ marginTop: 8 }}
              variant="outline"
              title="Criar conta"
              onPress={signUp}
              disabled={email === '' || password === ''}
              isLoading={isSignUpLoading}
            />
          </View>
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
}
