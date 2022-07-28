import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Layout } from 'react-native-reanimated';

import { MotiView } from 'moti';

interface PresenceProps {
  index?: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  layout?: typeof Layout;
}

function Presence({ index = 0, children, ...rest }: PresenceProps) {
  return (
    <MotiView
      from={{
        opacity: 0,
        translateY: -12,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
      }}
      exit={{
        opacity: 0,
        translateX: -12,
      }}
      exitTransition={{
        duration: 80,
        delay: undefined,
      }}
      transition={{
        duration: 80,
        delay: index * 80,
      }}
      {...rest}
    >
      {children}
    </MotiView>
  );
}

export default Presence;
