/** `localStorage`, or a stand-in that keeps nothing when the browser blocks it. */
export function browserStorage(view: Window | null): Storage {
  try {
    if (view?.localStorage) {
      return view.localStorage;
    }
  } catch {
    // Accessing localStorage throws when site data is blocked.
  }
  return UNAVAILABLE_STORAGE;
}

const UNAVAILABLE_STORAGE: Storage = {
  length: 0,
  clear: () => undefined,
  getItem: () => null,
  key: () => null,
  removeItem: () => undefined,
  setItem: () => undefined,
};
