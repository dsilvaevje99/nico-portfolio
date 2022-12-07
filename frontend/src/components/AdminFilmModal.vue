<template>
  <PopupModal :open="props.open" @close="$emit('close')">
    <div id="film-modal--container" :key="modalKey">
      <h3 class="title">{{ isEditing ? "Edit Film" : "Add New Film" }}</h3>
      <form v-if="film" id="film-modal--form">
        <TextInput
          v-model.trim="film.title"
          id="film-modal--title"
          name="title"
          label="Title"
          :hideLabel="false"
          placeholder="Film title"
          formId="film-modal--form"
          required
          displayAsterix
          :rules="[(x: string) => x.length > 0 || 'Title cannot be empty']"
          @validated="(v) => (fieldsValidity.title = v)"
          @blur="createExampleSlug"
        />
        <CustomTextarea
          v-model.trim="film.description"
          id="film-modal--description"
          name="description"
          label="Description"
          placeholder="A film about..."
          formId="film-modal--form"
          hideClearBtn
          required
          displayAsterix
          :maxLength="500"
          :rules="[(x: string) => x.length > 0 || 'Description cannot be empty']"
          @validated="(v) => (fieldsValidity.description = v)"
        />
        <TextInput
          v-model.trim="film.src"
          id="film-modal--src"
          name="src"
          label="Film Source URL"
          :hideLabel="false"
          placeholder="https://youtube.com/film"
          formId="film-modal--form"
          required
          displayAsterix
          validateOnBlur
          :rules="urlRules"
          @validated="(v) => (fieldsValidity.src = v)"
        />
        <TextInput
          v-model.trim="film.thumbnail"
          id="film-modal--thumbnail"
          name="thumbnail"
          label="Thumbnail Image URL"
          :hideLabel="false"
          placeholder="https://thumbnail.png"
          formId="film-modal--form"
          required
          displayAsterix
          validateOnBlur
          :rules="urlRules"
          @validated="(v) => (fieldsValidity.thumbnail = v)"
        />
        <FeaturedPlacementInput
          :currentVal="{featured: (film.featured as boolean), placement: film.placement}"
          @input="(v) => (film = { ...film, ...v })"
          @validated="(v) => (fieldsValidity.placement = v)"
        />
        <TextInput
          v-model.trim="film.slug"
          name="slug"
          label="URL Slug"
          :hideLabel="false"
          placeholder="unique-url-slug"
          formId="film-modal--form"
          required
          displayAsterix
          :rules="[(x: string) => x.length > 0 || 'Slug cannot be empty']"
          @validated="(v) => (fieldsValidity.slug = v)"
        />
        <TextInput
          v-model.trim="film.type"
          name="type"
          label="Project Type"
          :hideLabel="false"
          placeholder="Short Film"
          formId="film-modal--form"
          required
          displayAsterix
          :rules="[(x: string) => x.length > 0 || 'Type cannot be empty']"
          @validated="(v) => (fieldsValidity.type = v)"
        />
        <MonthYearInput
          :currentVal="film.date"
          @input="(d) => (film.date = d)"
          @validated="(v) => (fieldsValidity.date = v)"
        />
        <TextInput
          v-model.trim="film.location"
          name="location"
          label="General Filming Location"
          :hideLabel="false"
          placeholder="New York City, USA"
          formId="film-modal--form"
          required
          displayAsterix
          :rules="[(x: string) => x.length > 0 || 'Location cannot be empty']"
          @validated="(v) => (fieldsValidity.location = v)"
        />
        <TextInput
          v-model.trim="film.client"
          name="client"
          label="Client"
          :hideLabel="false"
          placeholder="Company Ltd."
          formId="film-modal--form"
        />
        <TextInput
          v-model.trim="film.company"
          name="company"
          label="Company"
          :hideLabel="false"
          placeholder="Nico Productions"
          formId="film-modal--form"
        />
        <TextInput
          v-model.trim="film.framesUrl"
          name="frames"
          label="Frames (Imgur Album Hash)"
          :hideLabel="false"
          placeholder="6UvjS4y"
          formId="film-modal--form"
          validateOnBlur
        />
        <ArrayTableInput
          id="film-modal--credits"
          :items="film.credits"
          :headers="['Role', 'Name']"
          label="Credits"
          :valid="creditValid"
          @delete="deleteCredit"
          @add="addCredit"
        >
          <td>
            <TextInput
              v-model.trim="newCredit.role"
              name="credit-role"
              label="Role"
              required
              dense
              underlined
              :rules="[(x: string) => x.length > 0 || 'Role cannot be empty']"
              @validated="(v) => (creditValidity.role = v)"
            />
          </td>
          <td>
            <TextInput
              v-model.trim="newCredit.name"
              name="credit-name"
              label="Name"
              required
              dense
              underlined
              :rules="[(x: string) => x.length > 0 || 'Name cannot be empty']"
              @validated="(v) => (creditValidity.name = v)"
            />
          </td>
        </ArrayTableInput>
        <div
          id="film-modal--submit"
          class="flex--justify-end"
          style="gap: 1rem"
        >
          <button class="btn btn--text-secondary" @click="discardChanges">
            Discard changes
          </button>
          <button
            :disabled="!valid || !hasMadeChanges"
            type="submit"
            class="btn btn--filled-green"
            @click="submitValues"
          >
            {{ isEditing ? "Save changes" : "Publish film" }} locally
          </button>
        </div>
      </form>
      <div
        v-if="isEditing && store.films.length > 1"
        class="flex--column"
        style="gap: 1rem"
      >
        <div>
          <button
            v-if="!expanded"
            class="btn btn--card-expand"
            @click="expanded = true"
          >
            More settings <font-awesome-icon icon="fa-solid fa-chevron-down" />
          </button>
          <button v-else class="btn btn--card-expand" @click="expanded = false">
            Collapse settings
            <font-awesome-icon icon="fa-solid fa-chevron-up" />
          </button>
        </div>
        <div v-if="expanded">
          <button
            class="btn btn--filled-red"
            @click="deleteFilm(film.placement)"
          >
            Delete film locally
          </button>
        </div>
      </div>
    </div>
  </PopupModal>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import PopupModal from "@/components/PopupModal.vue";
import type { Credit, Film } from "@/../../common-types";
import TextInput from "@/components/inputs/TextInput.vue";
import CustomTextarea from "@/components/inputs/CustomTextarea.vue";
import { urlRules } from "@/form-rules";
import MonthYearInput from "./inputs/MonthYearInput.vue";
import FeaturedPlacementInput from "./inputs/FeaturedPlacementInput.vue";
import ArrayTableInput from "./inputs/ArrayTableInput.vue";
import { useFilmStore } from "@/stores/film";

const emit = defineEmits(["close"]);
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  editing: {
    type: Object as () => Film,
    required: false,
    default: () => ({
      _id: "",
      placement: 1,
      src: "",
      thumbnail: "",
      title: "",
      slug: "",
      description: "",
      type: "",
      date: "",
      location: "",
      client: "",
      company: "",
      credits: [],
      framesUrl: "",
      frames: [],
      featured: false,
    }),
  },
});

const store = useFilmStore();

const modalKey = ref<symbol>(Symbol());
const film = ref<Film>({
  _id: "",
  placement: 1,
  src: "",
  thumbnail: "",
  title: "",
  slug: "",
  description: "",
  type: "",
  date: "",
  location: "",
  client: "",
  company: "",
  credits: [],
  frames: [],
  framesUrl: "",
  featured: false,
});
const newCredit = ref<Credit>({
  role: "",
  name: "",
});
const creditValidity = ref({
  role: false,
  name: false,
});
const fieldsValidity = ref({
  placement: true,
  src: true,
  thumbnail: true,
  title: true,
  slug: true,
  description: true,
  type: true,
  date: true,
  location: true,
  client: true,
  company: true,
  credits: true,
});
const expanded = ref<boolean>(false);
const creditValid = computed<boolean>(
  () => !JSON.stringify(creditValidity.value).includes("false")
);
const valid = computed<boolean>(
  () => !JSON.stringify(fieldsValidity.value).includes("false")
);
const isEditing = computed<boolean>(() => !!film.value?._id);
const hasMadeChanges = computed<boolean>(
  () => JSON.stringify(props.editing) !== JSON.stringify(film.value)
);

const createExampleSlug = () => {
  if (film.value && film.value.title && !film.value.slug) {
    film.value.slug = film.value.title
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\u0100-\uFFFF\w-]/g, "-")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }
};

const checkFramesAlbumHash = () => {};

const checkCreditValidity = () => {
  fieldsValidity.value.credits = !!(film.value.credits.length > 0);
};

const addCredit = (e: any) => {
  e.preventDefault();
  film.value.credits.push(newCredit.value);
  newCredit.value = {
    role: "",
    name: "",
  };
  creditValidity.value = {
    role: false,
    name: false,
  };
  checkCreditValidity();
};

const deleteCredit = (index: number) => {
  film.value.credits.splice(index, 1);
  checkCreditValidity();
};

const discardChanges = (e: any) => {
  e.preventDefault();
  modalKey.value = Symbol();
  emit("close");
};

const deleteFilm = (index: number) => {
  store.films.splice(index, 1);
};

const submitValues = (e: any) => {
  e.preventDefault();
  if (isEditing.value) {
    const found = store.films.findIndex((f: Film) => f._id === film.value._id);
    if (film.value.placement !== props.editing.placement) {
      // If placement has been altered, remove original and insert again into new position in array, this will automatically change the placements of following items
      deleteFilm(found);
      store.films.splice(film.value.placement, 0, film.value);
    } else {
      if (found) {
        store.films[found] = film.value;
      }
    }
  } else {
    store.films.splice(film.value.placement, 0, {
      ...film.value,
      _id: `temp-${new Date()}`,
    });
  }
  emit("close");
};

watch(props, () => {
  film.value = JSON.parse(JSON.stringify(props.editing));
  checkCreditValidity();
});
</script>
