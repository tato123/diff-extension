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

export default {
  local: createForStorageType('local'),
  sync: createForStorageType('sync')
};
