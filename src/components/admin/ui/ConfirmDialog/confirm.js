let pendingConfirm = null;
let listeners = [];

const notifyListeners = () => {
  listeners.forEach((listener) => listener(pendingConfirm));
};

export const openConfirm = (options = {}) => {
  pendingConfirm = {
    open: true,
    title: "Are you sure?",
    message: "This action cannot be undone.",
    confirmText: "Confirm",
    cancelText: "Cancel",
    loading: false,
    ...options,
  };
  notifyListeners();
  return pendingConfirm;
};

export const closeConfirm = () => {
  pendingConfirm = null;
  notifyListeners();
};

export const subscribeToConfirm = (listener) => {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((item) => item !== listener);
  };
};
