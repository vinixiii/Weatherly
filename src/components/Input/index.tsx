import React, { forwardRef, useCallback, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { AnimatePresence, MotiView, useAnimationState } from 'moti';
import { useTheme } from 'styled-components';

import { presenceAnimation } from '~/global/animation';

import {
  Container,
  Content,
  PasswordButton,
  SearchButton,
  StyledTextInput,
} from './styles';

type EventType = NativeSyntheticEvent<TextInputFocusEventData>;

export interface InputProps extends TextInputProps {
  isDisabled?: boolean;
  isSearchable?: boolean;
  style?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  onSearchButtonPress?: () => void;
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      isDisabled,
      secureTextEntry,
      multiline,
      isSearchable,
      style,
      textInputStyle,
      editable,
      value,
      onFocus,
      onBlur,
      onChangeText,
      onSearchButtonPress,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();

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

    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(
      !!secureTextEntry,
    );

    const handleFocus = (event: EventType) => {
      onFocus?.(event);
    };

    const handleBlur = (event: EventType) => {
      onBlur?.(event);
    };

    const handleChangeText = useCallback(
      (text: string) => {
        onChangeText?.(text);
      },
      [onChangeText],
    );

    const handleSearchButtonPress = () => {
      onSearchButtonPress?.();

      pressAnimationState.transitionTo('pressed');
    };

    return (
      <Container style={style}>
        <Content>
          <StyledTextInput
            {...rest}
            ref={ref}
            style={textInputStyle}
            value={value}
            isDisabled={isDisabled}
            secureTextEntry={secureTextEntry && isPasswordShown}
            editable={editable !== undefined ? editable : !isDisabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleChangeText}
          />

          {secureTextEntry && (
            <PasswordButton
              onPress={() => setIsPasswordShown(prevState => !prevState)}
            >
              <AnimatePresence exitBeforeEnter>
                {isPasswordShown && (
                  <MotiView key="eye-outline" {...presenceAnimation}>
                    <Ionicons
                      name="eye-outline"
                      size={24}
                      color={theme.colors.text}
                    />
                  </MotiView>
                )}

                {!isPasswordShown && (
                  <MotiView key="eye-off-outline" {...presenceAnimation}>
                    <Ionicons
                      name="eye-off-outline"
                      size={24}
                      color={theme.colors.text}
                    />
                  </MotiView>
                )}
              </AnimatePresence>
            </PasswordButton>
          )}

          {isSearchable && (
            <SearchButton onPress={handleSearchButtonPress}>
              <MotiView state={pressAnimationState}>
                <Ionicons
                  name="eye-off-outline"
                  size={24}
                  color={theme.colors.main}
                />
              </MotiView>
            </SearchButton>
          )}
        </Content>
      </Container>
    );
  },
);

export default Input;
