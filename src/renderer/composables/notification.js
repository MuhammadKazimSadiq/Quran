import { useStore } from "../store/store";

export function useNotification(
  message,
  { timeout = 3000, type = "success" } = {}
) {
  const store = useStore();

  clearTimeout(store?.notification?.timeoutID);

  store.notification = {
    show: true,
    message,
    type,
    timeoutID: setTimeout(() => {
      store.notification = {
        show: false,
        message: "",
      };
    }, timeout),
  };
}
