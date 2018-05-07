import { reaction } from "mobx";

export const selectAnnotations = ({ rules }, cb) => {
  reaction(
    () =>
      rules.map(
        rule => console.log("s", rule) && rule.type === "annotation" && rule
      ),
    (rules, reaction) => {
      cb(rules);

      reaction.dispose();
    }
  );
};
