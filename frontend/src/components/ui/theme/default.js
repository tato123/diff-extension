import { html } from "@polymer/lit-element";
import ThemeMixin from "../mixin/ThemeMixin";

const theme = html`
  <style>
    

    :root {
      --white: rgba(255,255,255,0.1);
      --white-2: rgba(255,255,255,0.3);
      --white-2: rgba(255,255,255,0.5);

      --font-xs: 6px;
      --font-sm: 12px;
      --font-md: 16px;
      --font-lg: 24px;

      --font-thin: 200;

     
    }

    ::slotted(*) {
      box-sizing: border-box;
    }

  </style>
`;

export default ThemeMixin(theme);
