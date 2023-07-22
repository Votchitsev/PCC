class LocalStorage {
  static set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  static get(key: string) {
    const data = localStorage.getItem(key);
    return data;
  }

  static remove (key: string) {
    localStorage.removeItem(key);
  }
};

export default LocalStorage;
