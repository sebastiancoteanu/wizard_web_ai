import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      primary: {
        main: string;
        second: string;
      };
      secondary: {
        main: string;
        second: string;
      };
      special: {
        success: string;
        warning: string;
      };
      neutral: {
        black: string;
        white: string;
        grey: string;
        disabledGrey: string;
      };
    };
    borderRadius: string;
    fontFamily: string;
    colors: {
      primary: string;
      secondary: string;
      success: string;
      info: string;
      warning: string;
      danger: string;
      dark: string;
      darkestGray: string;
      lighter: string;
      lightGray: string;
      lightestGray: string;
      ivory: string;
      lightIvory: string;
      rockBlue: string;
      gray: string;
      borderRadius: string;
    };
    special: {
      sentMessageBoxColor: string;
      modalBackground: string;
      videoPlayerControlsWithOpacity: string;
      videoPlayerControlsWithoutOpacity: string;
    };
  }
}
