<template>
  <div id="admin--container" :style="`grid-template-rows: ${gridTemplateRows}`">
    <transition name="reveal" mode="in-out">
      <div id="admin-actions--container" v-if="hasMadeChanges">
        <button class="btn btn--filled-green">Publish Changes</button>
        <button class="btn btn--text-secondary" @click="undoAllChanges">
          Undo Changes
        </button>
      </div>
    </transition>
    <AdminPageCard
      id="admin-films--card-container"
      :class="{ 'admin-card--span-one': shortestCard === filmCardHeight }"
    >
      <template #title
        ><font-awesome-icon icon="fa-solid fa-clapperboard" />Films</template
      >
      <template #body>
        <TheAdminFilmTable />
        <button class="btn btn--filled-primary">
          <font-awesome-icon icon="fa-solid fa-add" /> Add Film
        </button>
      </template>
    </AdminPageCard>
    <AdminPageCard
      id="admin-photos--card-container"
      :class="{ 'admin-card--span-one': shortestCard === photoCardHeight }"
    >
      <template #title
        ><font-awesome-icon icon="fa-solid fa-image" />Photos</template
      >
      <template #body>
        <TheAdminPhotos />
      </template>
    </AdminPageCard>
    <AdminPageCard
      id="admin-inquiries--card-container"
      :class="{ 'admin-card--span-one': shortestCard === inquiryCardHeight }"
    >
      <template #title
        ><font-awesome-icon icon="fa-solid fa-user" />Inquiries</template
      >
      <template #body>
        <ExpandableInquiryCard
          v-for="msg in inquiryStore.shownInquiries"
          :inquiry="msg"
          :key="`inquiry-${msg.id}`"
        />
        <button
          v-if="
            inquiryStore.shownInquiries.length < inquiryStore.inquiries.length
          "
          class="btn btn--text-secondary"
          @click="inquiryStore.loadMore()"
        >
          Load more....
        </button>
      </template>
    </AdminPageCard>
    <AdminPageCard
      id="admin-password--card-container"
      class="admin-card--span-one"
    >
      <template #title
        ><font-awesome-icon icon="fa-solid fa-key" />Change Password</template
      >
      <template #body></template>
    </AdminPageCard>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onUpdated, ref, computed } from "vue";
import AdminPageCard from "@/components/cards/AdminPageCard.vue";
import TheAdminFilmTable from "@/components/film_displayers/TheAdminFilmTable.vue";
import TheAdminPhotos from "@/components/TheAdminPhotos.vue";
import { useFilmStore } from "@/stores/film";
import { usePhotoStore } from "@/stores/photo";
import { useInquiryStore } from "@/stores/inquiry";
import ExpandableInquiryCard from "@/components/cards/ExpandableInquiryCard.vue";

const filmStore = useFilmStore();
const photoStore = usePhotoStore();
const inquiryStore = useInquiryStore();

const filmCardHeight = ref<number>(3);
const photoCardHeight = ref<number>(2);
const inquiryCardHeight = ref<number>(1);
const hasMadeChanges = computed<Boolean>(
  () => filmStore.hasMadeChanges || photoStore.hasMadeChanges
);
const shortestCard = computed<number>(() =>
  Math.min(filmCardHeight.value, photoCardHeight.value, inquiryCardHeight.value)
);
const gridTemplateRows = computed<string>(() =>
  hasMadeChanges.value
    ? `auto ${shortestCard.value}px auto`
    : `${shortestCard.value}px auto`
);

const undoAllChanges = () => {
  filmStore.undoChanges();
  photoStore.undoChanges();
};

onUpdated(() => {
  filmCardHeight.value =
    document.getElementById("admin-films--card-container")?.offsetHeight || 3;
  photoCardHeight.value =
    document.getElementById("admin-photos--card-container")?.offsetHeight || 2;
  inquiryCardHeight.value =
    document.getElementById("admin-inquiries--card-container")?.offsetHeight ||
    1;
});

onBeforeMount(() => {
  document.documentElement.setAttribute("data-theme", "admin");
  if (filmStore.films.length <= 0) filmStore.getFilms();
  if (inquiryStore.inquiries.length <= 0) inquiryStore.getInquiries();
});
</script>
