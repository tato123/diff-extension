export const log = (...args) => {
  if (window.watcher && window.watcher.debug) {
    console.log(...args);
  }
};
