import React, { memo } from 'react';
import { Easing } from 'react-native-reanimated';

import { MotiView } from 'moti';

import SearchIllustration from '~/assets/location-search.svg';

function SearchImage() {
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
      transition={{
        type: 'timing',
        easing: Easing.bezier(0.42, 0, 0.58, 1),
        duration: 1000,
        loop: true,

        opacity: {
          duration: 150,
          loop: false,
        },
      }}
    >
      <SearchIllustration height={200} />
    </MotiView>
  );
}

export default memo(SearchImage);
