import { Dimensions } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { MotiView } from 'moti';
import styled from 'styled-components/native';

export const INDICATOR_WIDTH = Dimensions.get('screen').width / 2;

export const MotiIndicator = styled(MotiView)`
  background-color: ${({ theme }) => theme.colors.main};
  bottom: ${getBottomSpace() + 60}px;
  height: 2px;
  position: absolute;
  width: ${INDICATOR_WIDTH}px;
`;
