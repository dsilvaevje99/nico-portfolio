<template>
  <div>
    <transition name="reveal" mode="in-out">
      <div id="admin-actions--container" v-if="hasMadeChanges">
        <button class="btn btn--filled-green" @click="saveAllChanges">
          Publish Changes
          <LocalLoadingSpinner v-if="showSavingLoader" />
        </button>
        <button class="btn btn--text-secondary" @click="undoAllChanges">
          Discard Changes
        </button>
      </div>
    </transition>
    <div
      id="admin--container"
      :style="`grid-template-rows: ${gridTemplateRows}`"
    >
      <AdminPageCard
        id="admin-films--card-container"
        class="admin-card--span-one"
      >
        <template #title
          ><font-awesome-icon icon="fa-solid fa-clapperboard" />Films</template
        >
        <template #body>
          <TheAdminFilmTable @edit="editFilm" />
          <button
            class="btn btn--filled-primary"
            style="margin-left: 1rem"
            @click="addFilm"
          >
            <font-awesome-icon icon="fa-solid fa-add" /> Add Film
          </button>
        </template>
      </AdminPageCard>
      <AdminPageCard id="admin-photos--card-container">
        <template #title
          ><font-awesome-icon icon="fa-solid fa-image" />Photos</template
        >
        <template #body>
          <TheAdminPhotos />
        </template>
      </AdminPageCard>
      <AdminPageCard id="admin-inquiries--card-container">
        <template #title
          ><font-awesome-icon icon="fa-solid fa-user" />Inquiries</template
        >
        <template #body>
          <p
            v-if="inquiryStore.shownInquiries.length === 0"
            style="text-align: center; padding: 2rem 0"
          >
            No inquiries to show!
          </p>
          <div v-else>
            <ExpandableInquiryCard
              v-for="msg in inquiryStore.shownInquiries"
              :inquiry="msg"
              :key="`inquiry-${msg._id}`"
            />
            <button
              v-if="
                inquiryStore.shownInquiries.length <
                inquiryStore.inquiries.length
              "
              class="btn btn--text-secondary"
              @click="inquiryStore.loadMore()"
            >
              Load more....
            </button>
          </div>
        </template>
      </AdminPageCard>
      <AdminPageCard
        id="admin-password--card-container"
        class="admin-card--span-one"
      >
        <template #title
          ><font-awesome-icon icon="fa-solid fa-key" />Change Password</template
        >
        <template #body>
          <TheChangePasswordForm />
        </template>
      </AdminPageCard>
      <AdminPageCard
        id="admin-text--card-container"
        class="admin-card--all-cols"
      >
        <template #title>
          <font-awesome-icon icon="fa-solid fa-align-left" />Paragraphs
        </template>
        <template #body>
          <TheAdminParagraphs />
        </template>
      </AdminPageCard>

      <AdminFilmModal
        :open="filmModal"
        :editing="editingFilm"
        @close="filmModal = false"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, nextTick, ref, computed, watch } from "vue";
import AdminPageCard from "@/components/cards/AdminPageCard.vue";
import TheAdminFilmTable from "@/components/film_displayers/TheAdminFilmTable.vue";
import TheAdminPhotos from "@/components/TheAdminPhotos.vue";
import { useFilmStore } from "@/stores/film";
import { usePhotoStore } from "@/stores/photo";
import { useInquiryStore } from "@/stores/inquiry";
import { useParagraphStore } from "@/stores/paragraphs";
import ExpandableInquiryCard from "@/components/cards/ExpandableInquiryCard.vue";
import AdminFilmModal from "@/components/AdminFilmModal.vue";
import LocalLoadingSpinner from "@/components/LocalLoadingSpinner.vue";
import type { Film } from "@/../../common-types";
import TheChangePasswordForm from "@/components/forms/TheChangePasswordForm.vue";
import TheAdminParagraphs from "@/components/TheAdminParagraphs.vue";

const filmStore = useFilmStore();
const photoStore = usePhotoStore();
const inquiryStore = useInquiryStore();
const paragraphStore = useParagraphStore();

const filmModal = ref<boolean>(false);
const editingFilm = ref<Film>();
const showSavingLoader = computed(
  () => filmStore.showSavingLoader || paragraphStore.showSavingLoader
);

const filmCardHeight = ref<number>(1);
const filmsCount = computed<number>(() => filmStore.films.length);
const hasMadeChanges = computed<boolean>(
  () =>
    filmStore.hasMadeChanges ||
    photoStore.hasMadeChanges ||
    paragraphStore.hasMadeChanges
);
const gridTemplateRows = computed<string>(
  () => `${filmCardHeight.value}px auto`
);

const editFilm = (film: Film) => {
  editingFilm.value = film;
  filmModal.value = true;
};

const addFilm = () => {
  editingFilm.value = undefined;
  filmModal.value = true;
};

const saveAllChanges = () => {
  if (filmStore.hasMadeChanges) filmStore.saveChanges();
  if (photoStore.hasMadeChanges) photoStore.saveChanges();
  if (paragraphStore.hasMadeChanges) paragraphStore.saveChanges();
};

const undoAllChanges = () => {
  if (filmStore.hasMadeChanges) filmStore.undoChanges();
  if (photoStore.hasMadeChanges) photoStore.undoChanges();
  if (paragraphStore.hasMadeChanges) paragraphStore.undoChanges();
};

const getCardHeight = () => {
  filmCardHeight.value =
    document.getElementById("admin-films--card-container")?.offsetHeight || 1;
};

onMounted(() => nextTick(() => getCardHeight()));

watch(filmsCount, () => nextTick(() => getCardHeight()));

onBeforeMount(() => {
  document.documentElement.setAttribute("data-theme", "admin");
  if (filmStore.films.length == 0) filmStore.getFilms();
  if (inquiryStore.inquiries.length == 0) inquiryStore.getInquiries();
});
</script>
