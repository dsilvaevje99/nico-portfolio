import { ref } from "vue";
import { defineStore } from "pinia";
import type { Notification } from "@/../../../common-types";

export const useNotifications = defineStore("notifications", () => {
  const notifications = ref<Notification[]>([]);

  const addNotification = (item: Notification) => {
    notifications.value.push(item);
    // Auto-close notification after 8 seconds
    setTimeout(() => {
      removeNotification(item.id);
    }, 8000);
  };

  const removeNotification = (id: Symbol) => {
    notifications.value = notifications.value.filter(
      (n: Notification) => n.id !== id
    );
  };

  return {
    notifications,
    addNotification,
    removeNotification,
  };
});
