export default {
  get domain() {
    return window.location.origin.replace(/[.:\/]/gi, "_");
  },

  get page() {
    return window.location.pathname;
  }
};
