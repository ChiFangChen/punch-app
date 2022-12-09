export function setLocalStorage(name: string, value: any) {
  window.localStorage.setItem(name, JSON.stringify(value));
}

export function getLocalStorage(name: string) {
  return JSON.parse(window.localStorage.getItem(name) || 'null');
}

export function removeLocalStorage(name: string) {
  window.localStorage.removeItem(name);
}
