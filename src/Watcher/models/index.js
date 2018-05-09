export const connect = (key = null) => fn => {
  const storeRef = window.watcher.store;
  if (key) {
    return fn(storeRef[key]);
  }
  return fn(storeRef);
};
