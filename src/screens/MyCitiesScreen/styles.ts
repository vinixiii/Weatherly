import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primaryBackground};
`;

export const Header = styled.View`
  width: 100%;
  padding: 0 ${RFValue(24)}px;
  padding-top: ${getStatusBarHeight() + 36}px;
  padding-bottom: ${RFValue(24)}px;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${RFValue(48)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary600};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.main};
`;

export const Subtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    paddingTop: RFValue(24),
    paddingBottom: RFValue(8),
    paddingHorizontal: RFValue(24),
  },
})``;

export const InitialMessage = styled.View`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding: 0 ${RFValue(24)}px;
`;

export const MessageTitle = styled.Text`
  margin-top: ${RFValue(24)}px;
  margin-bottom: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.primary600};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.title};
  text-align: center;
`;

export const MessageSubtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;
