/*eslint-disable*/
export default function(options) {
  return store => {
    // subscribe to store mutations and make changes
    store.subscribe(mutation => {
      if (mutation.type === "addWidget") {
      }
    });
  };
}
