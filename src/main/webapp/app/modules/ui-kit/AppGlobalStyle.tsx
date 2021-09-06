import { createGlobalStyle } from 'styled-components';

const AppGlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'Lato';
    font-weight: normal;
    font-style: normal;
    src: local('Lato'), local('Lato'),
        url(../assets/fonts/Lato/Lato-Regular.ttf) format('ttf');
  }

  @font-face {
    font-family: 'Lato';
    font-weight: bold;
    font-style: normal;
    src: local('Lato'), local('Lato'),
    url(../assets/fonts/Lato/Lato-Bold.ttf) format('ttf');
  }

  @font-face {
    font-family: 'Lato';
    font-weight: 300;
    font-style: normal;
    src: local('Lato'), local('Lato'),
    url(../assets/fonts/Lato/Lato-Light.ttf) format('ttf');
  }

  @font-face {
    font-family: 'Lato';
    font-weight: normal;
    font-style: italic;
    src: local('Lato'), local('Lato'),
    url(../assets/fonts/Lato/Lato-Regular.ttf) format('ttf');
  }

  @font-face {
    font-family: 'Lato';
    font-weight: bold;
    font-style: italic;
    src: local('Lato'), local('Lato'),
    url(../assets/fonts/Lato/Lato-Bold.ttf) format('ttf');
  }

  @font-face {
    font-family: 'Lato';
    font-weight: 300;
    font-style: italic;
    src: local('Lato'), local('Lato'),
    url(../assets/fonts/Lato/Lato-Light.ttf) format('ttf');
  }
    
  body {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
  }
`;

export default AppGlobalStyle;
