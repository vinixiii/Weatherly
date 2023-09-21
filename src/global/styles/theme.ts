export interface WeatherlyTheme {
  colors: {
    main: string;
    primaryBackground: string;
    secondaryBackground: string;
    title: string;
    text: string;
    textDetail: string;
    success: string;
    line: string;
  };
  fonts: {
    primary400: string;
    primary500: string;
    primary600: string;
  };
}

const theme: WeatherlyTheme = {
  colors: {
    main: '#EB6E4B',
    primaryBackground: '#F8F9FA',
    secondaryBackground: '#FFFFFF',

    title: '#2F2E41',
    text: '#3F3D56',
    textDetail: '#7A7A80',

    success: '#12a454',

    line: '#EBEBF0',
  },

  fonts: {
    primary400: 'Archivo_400Regular',
    primary500: 'Archivo_500Medium',
    primary600: 'Archivo_600SemiBold',
  },
};

export default theme;
