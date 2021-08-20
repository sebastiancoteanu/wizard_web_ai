import { DefaultTheme } from 'styled-components';

const darkTheme: DefaultTheme = {
  palette: {
    text: '#fafafa',
    navigationText: '#E3E3E3',
    navigationBackground: '#1d1d1d',
    websiteBackground: '#2E3134',
    primary: {
      main: '#18bebb',
      second: '#52dfdc',
    },
    secondary: {
      main: '#6D91C1',
      second: '#DDEDFD',
    },
    special: {
      success: '#48EB29',
      warning: '#FF4A81',
    },
    neutral: {
      black: '#2E3134',
      white: '#FFFFFF',
      grey: '#98A2B8',
      disabledGrey: '#E3E3E3',
    },
  },
  borderRadius: '12px',
  fontFamily: 'ProximaNova',
  colors: {
    primary: '#000000',
    secondary: '#ffffff',
    success: '#28a745',
    info: '#17a2b8',
    rockBlue: '#98a2b8',
    warning: '#ffc107',
    danger: '#dc3545',
    dark: '#000000',
    darkestGray: '#565656',
    gray: '#6a6a6a',
    lighter: '#707070',
    lightGray: '#818181',
    lightestGray: '#d5d5d5',
    ivory: '#ececec',
    lightIvory: '#F9F6FC',
    borderRadius: '4px',
  },
  special: {
    sentMessageBoxColor: '#98a2b8',
    modalBackground: 'rgba(0, 0, 0, .65)',
    videoPlayerControlsWithOpacity: 'rgba(227, 227, 227, .7)',
    videoPlayerControlsWithoutOpacity: 'rgba(227, 227, 227)',
  },
};

export default darkTheme;
