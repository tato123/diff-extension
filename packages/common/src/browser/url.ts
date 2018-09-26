const normalizeUrl = require('normalize-url');

const location = (): URL => {
  const url = normalizeUrl(window.location.href);
  return new URL(url);
};

export default {
  location
};
