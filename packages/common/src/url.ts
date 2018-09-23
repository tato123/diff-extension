const normalizeUrl = require("normalize-url");
export const getLocationURL = () => {
  const url = normalizeUrl(window.location.href);

  return new URL(url);
};
