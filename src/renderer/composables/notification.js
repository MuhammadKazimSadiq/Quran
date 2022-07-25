import { useStore } from "../store/useStore";

export function useNotification(message, { timeout = 3000 } = {}) {
  const store = useStore();

  store.notification = {
    show: true,
    message,
  };

  setTimeout(() => {
    store.notification = {
      show: false,
      message: "",
    };
  }, timeout);
}
