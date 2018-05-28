import { LitElement, html } from "@polymer/lit-element";

export default class Logo extends LitElement {
  static get properties() {
    return {};
  }

  _render() {
    return html`
	<style>
		svg {
			height: 28px;
		}

		.st0{fill:#fff;}
		.st1{fill:#00C9D8;}
		.st2{fill:#4648B0;}
	</style>
	<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	viewBox="0 0 518 166" style="enable-background:new 0 0 518 166;" xml:space="preserve">
<g>
   <g>
	   <path class="st0" d="M191.4,44.6c0-5.1,4.1-9.3,9.3-9.3h13.1c14.2,0,25.2,2.3,33.5,8c9.8,6.8,15.3,18,15.3,31.7
		   c0,12.5-4.7,23.2-13.2,30.2c-8.1,6.6-19.6,9.8-36.3,9.8h-12.3c-5.1,0-9.3-4.1-9.3-9.3V44.6z M213.8,99.7c11.3,0,18.6-2,23.5-6.3
		   c4.7-4.1,7.7-10.4,7.7-18.4c0-8.4-3.3-15.4-9.2-19.6c-5.6-4-13.2-4.8-22.1-4.8h-4.7v49.1H213.8z"/>
	   <path class="st0" d="M293.3,35.4h17.5V115h-17.5V35.4z"/>
	   <path class="st0" d="M354.7,35.4h41.3v15.3h-33v17.2h28.4v14.5h-28.4V115h-17.5V44.6C345.4,39.5,349.6,35.4,354.7,35.4z"/>
	   <path class="st0" d="M437.1,35.4h41.3v15.3h-33v17.2h28.4v14.5h-28.4V115h-17.5V44.6C427.8,39.5,432,35.4,437.1,35.4z"/>
   </g>
   <path class="st1" d="M131.8,118.5h-90c-7.3,0-11.9-8-8.2-14.3l45-76.2c3.7-6.2,12.7-6.2,16.3,0l45,76.2
	   C143.7,110.5,139.1,118.5,131.8,118.5z"/>
   <path class="st2" d="M146,128H56c-7.3,0-11.9-8-8.2-14.3l45-76.2c3.7-6.2,12.7-6.2,16.3,0l45,76.2C157.9,120,153.4,128,146,128z"/>
</g>
</svg>
    `;
  }
}

window.customElements.define("df-logo", Logo);
