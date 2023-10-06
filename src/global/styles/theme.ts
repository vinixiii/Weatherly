type Theme = typeof theme;

export interface WeatherlyTheme extends Theme {}

const theme = {
  colors: {
    main: '#EB6E4B',
    primaryBackground: '#F8F9FA',
    secondaryBackground: '#FFFFFF',

    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',

    title: '#2F2E41',
    text: '#3F3D56',
    textDetail: '#7A7A80',

    success: '#12a454',

    line: '#EBEBF0',

    border: '#3F3D56',
  },

  fonts: {
    primary400: 'Archivo_400Regular',
    primary500: 'Archivo_500Medium',
    primary600: 'Archivo_600SemiBold',
  },
};

export default theme;
