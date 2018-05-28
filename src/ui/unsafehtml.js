import { directive } from "lit-html";

export const unsafeHTML = value =>
  directive(part => {
    const tmp = document.createElement("template");
    tmp.innerHTML = value;
    part.setValue(document.importNode(tmp.content, true));
  });
