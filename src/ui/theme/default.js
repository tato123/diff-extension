import { html } from "@polymer/lit-element";
import ThemeMixin from "../mixin/ThemeMixin";

const theme = html`
  <style>
    @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700');

    :root {
      --white: rgba(255,255,255,0.1);
      --white-2: rgba(255,255,255,0.3);
      --white-2: rgba(255,255,255,0.5);

      --font-xs: 6px;
      --font-sm: 12px;
      --font-md: 16px;
      --font-lg: 24px;

      --font-thin: 200;

      font-family: 'Roboto', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      box-sizing: border-box;
    }

    ::slotted(*) {
      font-family: 'Roboto', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      box-sizing: border-box;
    }

  </style>
`;

export default ThemeMixin(theme);
