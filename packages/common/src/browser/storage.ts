type StorageTypes = 'local' | 'sync';

const createForStorageType = (type: StorageTypes): {} => ({
  get: async (
    keys: string | Object | string[] | null
  ): Promise<{ [key: string]: any }> =>
    new Promise(resolve => {
      chrome.storage[type].get(keys, resolve);
    }),
  set: async (items: object): Promise<any> =>
    new Promise(resolve => {
      chrome.storage[type].set(items, resolve);
    })
});

const html5Storage = {
  local: {
    get: async (keys: any) =>
      keys.reduce(
        (acc: {}, key: string) => ({
          ...acc,
          [key]: JSON.parse(localStorage.getItem(key))
        }),
        {}
      ),
    set: async (items: {}) => {
      Object.keys(items).forEach((key: string) => {
        localStorage[key] = JSON.stringify(items[key]);
      });
      return null;
    },
    clear: async () => {
      localStorage.clear();
    }
  }
};

export default {
  local: createForStorageType('local'),
  sync: createForStorageType('sync'),
  html5: html5Storage
};
