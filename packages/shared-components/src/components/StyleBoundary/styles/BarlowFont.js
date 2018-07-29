import { injectGlobal } from "styled-components";

injectGlobal`
/* latin-ext */
@font-face {
  font-family: 'Barlow Semi Condensed';
  font-style: normal;
  font-weight: 100;
  src: local('Barlow Semi Condensed Thin'), local('BarlowSemiCondensed-Thin'), url(${
    window.diff.url
  }/fonts/BarlowSemiCondensed-Thin.ttf) format('truetype');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Barlow Semi Condensed';
  font-style: normal;
  font-weight: 100;
  src: local('Barlow Semi Condensed Thin'), local('BarlowSemiCondensed-Thin'), url(${
    window.diff.url
  }/fonts/BarlowSemiCondensed-Thin.ttf) format('truetype');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Barlow Semi Condensed';
  font-style: normal;
  font-weight: 200;
  src: local('Barlow Semi Condensed ExtraLight'), local('BarlowSemiCondensed-ExtraLight'), url(${
    window.diff.url
  }/fonts/BarlowSemiCondensed-ExtraLight.ttf) format('truetype');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Barlow Semi Condensed';
  font-style: normal;
  font-weight: 200;
  src: local('Barlow Semi Condensed ExtraLight'), local('BarlowSemiCondensed-ExtraLight'), url(${
    window.diff.url
  }/fonts/BarlowSemiCondensed-ExtraLight.ttf) format('truetype');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Barlow Semi Condensed';
  font-style: normal;
  font-weight: 300;
  src: local('Barlow Semi Condensed Light'), local('BarlowSemiCondensed-Light'), url(${
    window.diff.url
  }/fonts/BarlowSemiCondensed-Light.ttf) format('truetype');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Barlow Semi Condensed';
  font-style: normal;
  font-weight: 300;
  src: local('Barlow Semi Condensed Light'), local('BarlowSemiCondensed-Light'), url(${
    window.diff.url
  }/fonts/BarlowSemiCondensed-Light.ttf) format('truetype');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Barlow Semi Condensed';
  font-style: normal;
  font-weight: 400;
  src: local('Barlow Semi Condensed Regular'), local('BarlowSemiCondensed-Regular'), url(${
    window.diff.url
  }/fonts/BarlowSemiCondensed-Regular.ttf) format('truetype');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Barlow Semi Condensed';
  font-style: normal;
  font-weight: 400;
  src: local('Barlow Semi Condensed Regular'), local('BarlowSemiCondensed-Regular'), url(${
    window.diff.url
  }/fonts/BarlowSemiCondensed-Regular.ttf) format('truetype');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Barlow Semi Condensed';
  font-style: normal;
  font-weight: 500;
  src: local('Barlow Semi Condensed Medium'), local('BarlowSemiCondensed-Medium'), url(${
    window.diff.url
  }/fonts/BarlowSemiCondensed-Medium.ttf) format('truetype');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Barlow Semi Condensed';
  font-style: normal;
  font-weight: 500;
  src: local('Barlow Semi Condensed Medium'), local('BarlowSemiCondensed-Medium'), url(${
    window.diff.url
  }/fonts/BarlowSemiCondensed-Medium.ttf) format('truetype');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Barlow Semi Condensed';
  font-style: normal;
  font-weight: 600;
  src: local('Barlow Semi Condensed SemiBold'), local('BarlowSemiCondensed-SemiBold'), url(${
    window.diff.url
  }/fonts/BarlowSemiCondensed-SemiBold.ttf) format('truetype');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Barlow Semi Condensed';
  font-style: normal;
  font-weight: 600;
  src: local('Barlow Semi Condensed SemiBold'), local('BarlowSemiCondensed-SemiBold'), url(${
    window.diff.url
  }/fonts/BarlowSemiCondensed-SemiBold.ttf) format('truetype');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Barlow Semi Condensed';
  font-style: normal;
  font-weight: 700;
  src: local('Barlow Semi Condensed Bold'), local('BarlowSemiCondensed-Bold'), url(${
    window.diff.url
  }/fonts/BarlowSemiCondensed-Bold.ttf) format('truetype');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Barlow Semi Condensed';
  font-style: normal;
  font-weight: 700;
  src: local('Barlow Semi Condensed Bold'), local('BarlowSemiCondensed-Bold'), url(${
    window.diff.url
  }/fonts/BarlowSemiCondensed-Bold.ttf) format('truetype');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Barlow Semi Condensed';
  font-style: normal;
  font-weight: 800;
  src: local('Barlow Semi Condensed ExtraBold'), local('BarlowSemiCondensed-ExtraBold'), url(${
    window.diff.url
  }/fonts/BarlowSemiCondensed-ExtraBold.ttf) format('truetype');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Barlow Semi Condensed';
  font-style: normal;
  font-weight: 800;
  src: local('Barlow Semi Condensed ExtraBold'), local('BarlowSemiCondensed-ExtraBold'), url(${
    window.diff.url
  }/fonts/BarlowSemiCondensed-ExtraBold.ttf) format('truetype');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Barlow Semi Condensed';
  font-style: normal;
  font-weight: 900;
  src: local('Barlow Semi Condensed Black'), local('BarlowSemiCondensed-Black'), url(${
    window.diff.url
  }/fonts/BarlowSemiCondensed-Black.ttf) format('truetype');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Barlow Semi Condensed';
  font-style: normal;
  font-weight: 900;
  src: local('Barlow Semi Condensed Black'), local('BarlowSemiCondensed-Black'), url(${
    window.diff.url
  }/fonts/BarlowSemiCondensed-Black.ttf) format('truetype');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

`;
