import { Dimensions } from 'react-native';

import { MotiView } from 'moti';
import styled from 'styled-components/native';

export const INDICATOR_WIDTH = Dimensions.get('screen').width / 2;

export const MotiIndicator = styled(MotiView)<{ bottom: number }>`
  background-color: ${({ theme }) => theme.colors.main};
  bottom: ${({ bottom }) => bottom}px;
  height: 2px;
  position: absolute;
  width: ${INDICATOR_WIDTH}px;
`;
