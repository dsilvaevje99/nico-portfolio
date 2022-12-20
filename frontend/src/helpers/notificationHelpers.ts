import { useNotifications } from "@/stores/notifications";
import { NotificationType } from "../../../common-types";

export const displayError = (e: any, message: string) => {
  const store = useNotifications();
  store.addNotification({
    type: NotificationType.error,
    id: Symbol(),
    statusCode: e.response?.status ?? 500,
    message,
  });
};

export const displaySuccess = (message: string) => {
  const store = useNotifications();
  store.addNotification({
    type: NotificationType.success,
    id: Symbol(),
    statusCode: "",
    message,
  });
};
