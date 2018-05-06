import cssbeautify from "./cssbeautify";
import { readStyles } from "./cssrules";
import tester from "./test.json";

function getJson() {
  // const imgURL = chrome.runtime.getURL("test.json");
  // return fetch(imgURL).then(response => {
  //   console.log(response);
  //   return response.json();
  // });
  return Promise.resolve(tester);
}

const queryRules = async origin => {
  const allRules = await getJson();
  const rulesForOrigin = allRules[origin];
  rulesForOrigin.forEach(({ selector, type }) => {
    select(selector, type);
  });
};

function annotation(element) {
  element.style.background = "blue";
}

function border(element) {
  element.style.border = "3px dashed black";
}

function addNotes(element, text) {
  const note = `
        <div>   
            ${text}
        </div>
    `;
  element.insertAdjacentHTML("afterend", note);
}

const Components = {
  annotation,
  border
};

function select(selector, type) {
  const element = document.querySelector(selector);
  console.log("selecting", selector, element);
  const styles = readStyles([element])[0]
    .map(
      rule => `<div><pre><code class="css">${rule.cssText}</code></pre></div>`
    )
    .join("");
  if (element) {
    Components[type](element);
    addNotes(
      element,
      cssbeautify(styles, {
        indent: "  ",
        openbrace: "separate-line",
        autosemicolon: true
      })
    );
  }
}

queryRules(window.location.origin);
