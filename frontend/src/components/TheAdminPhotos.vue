<template>
  <div id="admin-photos--container" class="flex--column">
    <div>
      <h6 class="title">Photography page (Imgur album hash)</h6>
      <AdminPhotoLink
        v-if="!store.editPhotoPageAlbum"
        :url="store.adminURLs.photoPageAlbum"
        type="hash"
        @edit="store.editPhotoPageAlbum = true"
      />
      <PhotoLinkInput
        v-else
        v-model="photoPageAlbum"
        name="album"
        placeholder="6UvjS4y"
        type="hash"
        @submit="submitPhotoPageAlbum"
      />
    </div>
    <div>
      <h6 class="title">About Page</h6>
      <!-- PROFILE PIC -->
      <AdminPhotoLink
        v-if="!store.editProfilePic"
        :url="store.adminURLs.profilePic"
        label="Profile Picture"
        @edit="store.editProfilePic = true"
      />
      <PhotoLinkInput
        v-else
        v-model="profilePic"
        name="profile"
        label="Profile Picture"
        @submit="submitProfilePic"
      />
      <!-- ----------- -->
      <!-- PROCESS ONE -->
      <AdminPhotoLink
        v-if="!store.editProcessOne"
        :url="store.adminURLs.processOne"
        label="Process Section - img #1 (hidden on larger screens)"
        @edit="store.editProcessOne = true"
      />
      <PhotoLinkInput
        v-else
        v-model="processOne"
        name="processOne"
        label="Process Section - img #1 (hidden on larger screens)"
        @submit="submitProcessOne"
      />
      <!-- ----------- -->
      <!-- PROCESS TWO -->
      <AdminPhotoLink
        v-if="!store.editProcessTwo"
        :url="store.adminURLs.processTwo"
        label="Process Section - img #2"
        @edit="store.editProcessTwo = true"
      />
      <PhotoLinkInput
        v-else
        v-model="processTwo"
        name="processTwo"
        label="Process Section - img #2"
        @submit="submitProcessTwo"
      />
      <!-- ----------- -->
      <!-- PROCESS THREE -->
      <AdminPhotoLink
        v-if="!store.editProcessThree"
        :url="store.adminURLs.processThree"
        label="Process Section - img #3"
        @edit="store.editProcessThree = true"
      />
      <PhotoLinkInput
        v-else
        v-model="processThree"
        name="processThree"
        label="Process Section - img #3"
        @submit="submitProcessThree"
      />
      <!-- ------------- -->
      <!-- CAROUSEL -->
      <AdminPhotoLink
        v-if="!store.editCarouselAlbum"
        :url="store.adminURLs.carouselAlbum"
        label="Image Carousel (Imgur Album Hash)"
        type="hash"
        @edit="store.editCarouselAlbum = true"
      />
      <PhotoLinkInput
        v-else
        v-model="carouselAlbum"
        name="carouselAlbum"
        label="Image Carousel (Imgur Album Hash)"
        type="hash"
        @submit="submitCarouselAlbum"
      />
      <!-- -------- -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { usePhotoStore } from "@/stores/photo";
import AdminPhotoLink from "@/components/AdminPhotoLink.vue";
import PhotoLinkInput from "@/components/inputs/PhotoLinkInput.vue";

const store = usePhotoStore();

const photoPageAlbum = ref<string>("");
const profilePic = ref<string>("");
const processOne = ref<string>("");
const processTwo = ref<string>("");
const processThree = ref<string>("");
const carouselAlbum = ref<string>("");
const storeUrls = computed(() => store.adminURLs);

const submitPhotoPageAlbum = () => {
  store.adminURLs.photoPageAlbum = photoPageAlbum.value;
  store.editPhotoPageAlbum = false;
};

const submitProfilePic = () => {
  store.adminURLs.profilePic = profilePic.value;
  store.editProfilePic = false;
};

const submitProcessOne = () => {
  store.adminURLs.processOne = processOne.value;
  store.editProcessOne = false;
};

const submitProcessTwo = () => {
  store.adminURLs.processTwo = processTwo.value;
  store.editProcessTwo = false;
};

const submitProcessThree = () => {
  store.adminURLs.processThree = processThree.value;
  store.editProcessThree = false;
};

const submitCarouselAlbum = () => {
  store.adminURLs.carouselAlbum = carouselAlbum.value;
  store.editCarouselAlbum = false;
};

watch(storeUrls, (newUrls, oldUrls) => {
  if (!oldUrls._id) {
    photoPageAlbum.value = newUrls.photoPageAlbum;
    profilePic.value = newUrls.profilePic;
    processOne.value = newUrls.processOne;
    processTwo.value = newUrls.processTwo;
    processThree.value = newUrls.processThree;
    carouselAlbum.value = newUrls.carouselAlbum;
  }
});

onMounted(() => {
  photoPageAlbum.value = store.adminURLs.photoPageAlbum;
  profilePic.value = store.adminURLs.profilePic;
  processOne.value = store.adminURLs.processOne;
  processTwo.value = store.adminURLs.processTwo;
  processThree.value = store.adminURLs.processThree;
  carouselAlbum.value = store.adminURLs.carouselAlbum;
});
</script>
