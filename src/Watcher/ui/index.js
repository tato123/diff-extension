import { observable, autorun, reaction } from "mobx";

export const renderSelectors = selectors => {
  reaction(
    () => selectors && selectors.values(),
    selector => console.log(selector)
  );
};
