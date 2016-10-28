const localStorageData = {};

const localStorageMock = {
  getItem: (key) => localStorageData[key],
  setItem: (key, value) => localStorageData[key] = value
};

global.localStorage = localStorageMock;
