const setFlag = async (flag: string, value: string): Promise<any> => {
  return new Promise(resolve => {
    chrome.storage.local.set({ [flag]: value }, () => {
      resolve();
    });
  });
};

const getFlag = async (flag: string): Promise<any> => {
  return new Promise(resolve => {
    chrome.storage.local.get([flag], result => {
      resolve(result[flag]);
    });
  });
};

export default {
  getFlag,
  setFlag
};
