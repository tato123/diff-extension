import { observable, autorun, reaction } from "mobx";

const selectElements = selector => {
  document.querySelectorAll(selector).forEach(element => {
    element.style.border = "3px solid black";
  });
};

export const renderSelectors = store => {
  store.selectors.observe(change => {
    change.object.forEach((value, key) => {
      selectElements(key);
    });
  });
};

// select(selector, type) {
//   const element = document.querySelector(selector);
//   console.log("selecting", selector, element);
//   const styles = readStyles([element])[0]
//     .map(
//       rule => `<div><pre><code class="css">${rule.cssText}</code></pre></div>`
//     )
//     .join("");
//   if (element) {
//     Components[type](element);
//     addNotes(
//       element,
//       cssbeautify(styles, {
//         indent: "  ",
//         openbrace: "separate-line",
//         autosemicolon: true
//       })
//     );
//   }
// }

export default function render(store) {}
