import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  scrollEnabled: false,
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primaryBackground};
`;

export const Header = styled.View<{ insetsTop: number }>`
  width: 100%;
  padding: 0 ${RFValue(24)}px;
  padding-top: ${({ insetsTop }) => insetsTop + 36}px;
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

export const HeaderTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary600};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.main};
`;

export const Content = styled.View`
  flex: 1;
  margin: 64px 16px 0;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary600};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.title};
  margin-bottom: ${RFValue(24)}px;
`;
