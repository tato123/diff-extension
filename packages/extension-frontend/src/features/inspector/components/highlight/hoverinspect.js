import Prism from 'prismjs';
import template from './template.html';

export default class Inspector {
  constructor() {
    this.highlight = this.highlight.bind(this);
    this.log = this.log.bind(this);
    this.codeOutput = this.codeOutput.bind(this);
    this.layout = this.layout.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.$target = document.body;
    this.$cacheEl = document.body;
    this.$cacheElMain = document.body;

    this.serializer = new XMLSerializer();
    this.forbidden = [this.$cacheEl, document.body, document.documentElement];
  }

  getNodes() {
    this.template = template;
    this.createNodes();
    this.registerEvents();
  }

  createNodes() {
    this.$host = document.createElement('div');
    this.$host.className = 'tl-host';
    this.$host.style.cssText = 'all: initial;';

    const shadow = this.$host.createShadowRoot();
    document.body.appendChild(this.$host);

    const templateMarkup = document.createElement('div');
    templateMarkup.innerHTML = this.template;
    shadow.innerHTML = templateMarkup.querySelector('template').innerHTML;

    this.$wrap = shadow.querySelector('.tl-wrap');
    this.$code = shadow.querySelector('.tl-code');

    this.$canvas = shadow.querySelector('#tl-canvas');
    this.c = this.$canvas.getContext('2d');
    this.width = this.$canvas.width = window.innerWidth;
    this.height = this.$canvas.height = window.innerHeight;

    this.highlight();
  }

  registerEvents() {
    document.addEventListener('mousemove', this.log);
    document.addEventListener('scroll', this.layout);
    window.addEventListener('resize', () => {
      this.handleResize();
      this.layout();
    });
  }

  log(e) {
    this.$target = e.target;

    // check if element cached
    if (this.forbidden.indexOf(this.$target) !== -1) return;

    this.stringified = this.serializer.serializeToString(this.$target);

    this.codeOutput();

    this.$cacheEl = this.$target;
    this.layout();
  }

  codeOutput() {
    if (this.$cacheElMain === this.$target) return;
    this.$cacheElMain = this.$target;

    const fullCode = this.stringified
      .slice(0, this.stringified.indexOf('>') + 1)
      .replace(/ xmlns="[^"]*"/, '');

    this.$code.innerText = fullCode; // set full element code
    this.highlight(); // highlight element
  }

  // redraw overlay
  layout() {
    let box;
    let computedStyle;
    let rect;
    const c = this.c;

    rect = this.$target.getBoundingClientRect();
    computedStyle = window.getComputedStyle(this.$target);
    box = {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
      margin: {
        top: computedStyle.marginTop,
        right: computedStyle.marginRight,
        bottom: computedStyle.marginBottom,
        left: computedStyle.marginLeft
      },
      padding: {
        top: computedStyle.paddingTop,
        right: computedStyle.paddingRight,
        bottom: computedStyle.paddingBottom,
        left: computedStyle.paddingLeft
      }
    };

    // pluck negatives
    ['margin', 'padding'].forEach(property => {
      for (const el in box[property]) {
        const val = parseInt(box[property][el], 10);
        box[property][el] = Math.max(0, val);
      }
    });

    c.clearRect(0, 0, this.width, this.height);

    box.left = Math.floor(box.left) + 1.5;
    box.width = Math.floor(box.width) - 1;

    let x;
    let y;
    let width;
    let height;

    // margin
    x = box.left - box.margin.left;
    y = box.top - box.margin.top;
    width = box.width + box.margin.left + box.margin.right;
    height = box.height + box.margin.top + box.margin.bottom;

    c.fillStyle = 'rgba(255,165,0,0.5)';
    c.fillRect(x, y, width, height);

    // padding
    x = box.left;
    y = box.top;
    width = box.width;
    height = box.height;

    c.fillStyle = 'rgba(158,113,221,0.5)';
    c.clearRect(x, y, width, height);
    c.fillRect(x, y, width, height);

    // content
    x = box.left + box.padding.left;
    y = box.top + box.padding.top;
    width = box.width - box.padding.right - box.padding.left;
    height = box.height - box.padding.bottom - box.padding.top;

    c.fillStyle = 'rgba(73,187,231,0.25)';
    c.clearRect(x, y, width, height);
    c.fillRect(x, y, width, height);

    // rulers (horizontal - =)
    // x = -10;
    // y = Math.floor(box.top) + 0.5;
    // width = this.width + 10;
    // height = box.height - 1;

    // c.beginPath();
    // c.setLineDash([10, 3]);
    // c.fillStyle = "rgba(0,0,0,0.02)";
    // c.strokeStyle = "rgba(13, 139, 201, 0.45)";
    // c.lineWidth = 1;
    // c.rect(x, y, width, height);
    // c.stroke();
    // c.fill();

    // // rulers (vertical - ||)
    // x = box.left;
    // y = -10;
    // width = box.width;
    // height = this.height + 10;

    // c.beginPath();
    // c.setLineDash([10, 3]);
    // c.fillStyle = "rgba(0,0,0,0.02)";
    // c.strokeStyle = "rgba(13, 139, 201, 0.45)";
    // c.lineWidth = 1;
    // c.rect(x, y, width, height);
    // c.stroke();
    // c.fill();
  }

  handleResize() {
    this.width = this.$canvas.width = window.innerWidth;
    this.height = this.$canvas.height = window.innerHeight;
  }

  // code highlighting
  highlight() {
    Prism.highlightElement(this.$code);
  }

  activate() {
    this.getNodes();
  }

  deactivate() {
    this.$wrap.classList.add('-out');
    document.removeEventListener('mousemove', this.log);
    setTimeout(() => {
      try {
        document.body.removeChild(this.$host);
      } catch (error) {
        console.warn('Error occured removing element', error.message);
      }
    }, 600);
  }
}
