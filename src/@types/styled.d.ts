import 'styled-components';
import { WeatherlyTheme } from '~/global/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends WeatherlyTheme {}
}
