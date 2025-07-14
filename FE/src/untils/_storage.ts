const storage = {
  get(key:string) {
    const accessToken = localStorage.getItem(key);
    if (!accessToken) return null;
    return accessToken;
  },
  set(key: string, value: string) {
    localStorage.setItem(key, value);
  },

  remove(key:string){
        localStorage.removeItem(key)
  }
};

export default storage;
