export const saveLocalStorage = (itemName, value) => {
  try {
    localStorage.setItem(itemName, value);
  } catch (error) {
    console.log(error);
  }
};
export const getLocalStorageItem = (itemName) => {
  try {
    return localStorage.getItem(itemName);
  } catch (error) {
    console.log(error);
  }
};

export const removeLocalStorageItem = (itemName) => {
  try {
    return localStorage.removeItem(itemName);
  } catch (error) {
    console.log(error);
  }
};

export const getLocalStorageKeyValue = (itemName, key) => {
  try {
    const object = JSON.parse(localStorage.getItem(itemName));
    return object[key];
  } catch (error) {
    console.log(error);
  }
};
//website Config
