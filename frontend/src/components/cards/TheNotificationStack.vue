<template>
  <div id="notification-stack--container" v-if="store.notifications.length > 0">
    <div
      v-for="notification in store.notifications"
      :key="notification.id"
      :class="{
        'notification--container': true,
        'notification-type--success':
          notification.type === NotificationType.success,
      }"
    >
      <div class="notification--title flex--justify-between flex--align-center">
        <h3 v-if="notification.type === NotificationType.error" class="title">
          <font-awesome-icon icon="fa-solid fa-circle-exclamation" /> An error
          occurred!
        </h3>
        <h3 v-else class="title">
          <font-awesome-icon icon="fa-solid fa-circle-check" /> Success!
        </h3>
        <button
          class="btn btn--icon-only btn--close-notification"
          @click="store.removeNotification(notification.id)"
        >
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </button>
      </div>
      <p
        v-if="notification.type === NotificationType.error"
        style="color: lightgrey"
      >
        {{ notification.statusCode }}
      </p>
      <p class="notification--body">{{ notification.message }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNotifications } from "@/stores/notifications";
import { NotificationType } from "../../../../common-types";

const store = useNotifications();
</script>
