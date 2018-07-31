import { injectGlobal } from "styled-components";

if (window.diff) {
  injectGlobal`
  /* latin-ext */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(${
      window.diff.url
    }/fonts/RobotoMono-Regular.ttf) format('truetype');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(${
      window.diff.url
    }/fonts/RobotoMono-Regular.ttf) format('truetype');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  /* latin-ext */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 500;
    src: local('Roboto Mono Medium'), local('RobotoMono-Medium'), url(${
      window.diff.url
    }/fonts/RobotoMono-Medium.ttf) format('truetype');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 500;
    src: local('Roboto Mono Medium'), local('RobotoMono-Medium'), url(${
      window.diff.url
    }/fonts/RobotoMono-Medium.ttf) format('truetype');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }


  /* latin-ext */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 700;
    src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(${
      window.diff.url
    }/fonts//L0xkDF4xlVMF-BfR8bXMIjDwjmq_f7-7Ag.woff2) format('truetype');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 700;
    src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(${
      window.diff.url
    }/fonts//L0xkDF4xlVMF-BfR8bXMIjDwjmqxf78.woff2) format('truetype');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  `;
} else {
  injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono');  
`;
}
