import { LitElement, html } from "@polymer/lit-element";
import Popper from "popper.js";

import { connect } from "pwa-helpers/connect-mixin.js";
import { navigateTo } from "actions/location";
import { store } from "store";

import { threadIdSelector } from "selectors/location";

export default class PopperHandler extends connect(store)(LitElement) {
  _render({ count, delay, duration, element }) {
    if (!element || this.pop) {
      return;
    }

    // create an outline element
    const outliner = (this.outliner = document.createElement(
      "df-popper-outline"
    ));
    outliner.style.opacity = 0;
    this.appendChild(outliner);

    // create our bubble element
    const popper = (this.popper = document.createElement("df-bubble"));
    popper.value = count;
    popper.classList.add("pop");
    popper.style.opacity = 0;
    this.appendChild(popper);

    // create our reference
    const reference = document.querySelector(element);

    const updateImg = data => {
      const width = window.getComputedStyle(reference, null).width;
      const height = window.getComputedStyle(reference, null).height;
      outliner.style.width = width;
      outliner.style.height = height;
      outliner.style.top = data.offsets.popper.top + "px";
      outliner.style.left = data.offsets.popper.left + "px";
      outliner.style.position = data.offsets.popper.position;
      return outliner;
    };

    const timings = {
      easing: "cubic-bezier(0.2, 0.0, 0.2, 1)",
      fill: "forwards",
      duration,
      delay
    };

    const animateImg = (data, outliner) => {
      popper.animate([{ opacity: 0 }, { opacity: 1 }], timings);
      outliner.animate([{ opacity: 0 }, { opacity: 1 }], timings);
    };

    this.pop = new Popper(reference, popper, {
      placement: "left-start",
      onCreate: data => {
        const outliner = updateImg(data);
        animateImg(data, outliner);
      },
      onUpdate: updateImg
    });

    return html`<slot></slot>`;
  }

  static get properties() {
    return {
      count: Number,
      element: String,
      delay: Number,
      duration: Number
    };
  }

  _didRender() {
    if (!this.outliner) {
      return;
    }

    this.outliner.addEventListener("mouseover", () => {
      console.log("mousing over");
    });

    this.outliner.addEventListener("mouseleave", () => {
      console.log("mousing leave");
    });

    this.outliner.addEventListener("click", evt => {
      this.onClick(evt);
    });
  }

  onClick(evt) {
    // dont bubble
    evt.preventDefault();

    store.dispatch(
      navigateTo("/selector/view", {
        element: this.element
      })
    );
  }

  _stateChanged(state) {
    if (state) {
      this.threadId = threadIdSelector(state);
      if (this.outliner && this.threadId === this.element) {
        this.outliner.classList.add("selected");
      } else if (this.outliner) {
        this.outliner.classList.remove("selected");
      }
    }
  }
}
