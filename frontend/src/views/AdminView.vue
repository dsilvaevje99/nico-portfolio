<template>
  <div id="admin--container">
    <transition name="reveal">
      <div id="admin-actions--container" v-if="filmStore.hasMadeChanges">
        <button class="btn btn--filled-green">Publish Changes</button>
        <button class="btn btn--text-secondary" @click="filmStore.undoChanges">
          Undo Changes
        </button>
      </div>
    </transition>
    <AdminPageCard>
      <template #title
        ><font-awesome-icon icon="fa-solid fa-clapperboard" />Films</template
      >
      <template #body>
        <TheAdminFilmTable />
      </template>
    </AdminPageCard>
    <AdminPageCard>
      <template #title
        ><font-awesome-icon icon="fa-solid fa-image" />Photos</template
      >
      <template #body></template>
    </AdminPageCard>
    <AdminPageCard>
      <template #title
        ><font-awesome-icon icon="fa-solid fa-user" />Inquiries</template
      >
      <template #body></template>
    </AdminPageCard>
    <AdminPageCard>
      <template #title
        ><font-awesome-icon icon="fa-solid fa-key" />Change Password</template
      >
      <template #body></template>
    </AdminPageCard>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import AdminPageCard from "@/components/cards/AdminPageCard.vue";
import TheAdminFilmTable from "@/components/film_displayers/TheAdminFilmTable.vue";
import { useFilmStore } from "@/stores/film";

const filmStore = useFilmStore();

onBeforeMount(() => {
  document.documentElement.setAttribute("data-theme", "admin");
  if (filmStore.films.length <= 0) filmStore.getFilms();
});
</script>
