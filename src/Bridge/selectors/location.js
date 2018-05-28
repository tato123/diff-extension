import { createSelector } from "reselect";

const locationDomain = state => state && state.location;

export const threadIdSelector = createSelector(
  locationDomain,
  location => location.params.element || ""
);
