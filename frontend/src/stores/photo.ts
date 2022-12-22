import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Photo, AdminURLs } from "@/../../../common-types";
import {
  getAdminUrls,
  updateAdminUrls,
  getImgurImages,
} from "@/api/photos.api";

/* const MOCK_DATA: Photo[] = [];
for (let i = 0; i < 15; i++) {
  MOCK_DATA.push({
    id: i,
    url: `https://picsum.photos/${Math.floor(
      Math.random() * (300 - 50 + 1) + 50
    )}/${Math.floor(Math.random() * (300 - 50 + 1) + 50)}`,
    alt: "",
  });
} */

export const usePhotoStore = defineStore("photo", () => {
  const photoPageImages = ref<Photo[]>([]);
  const aboutCarouselImages = ref<Photo[]>([]);
  const adminURLs = ref<AdminURLs>({
    _id: "",
    photoPageAlbum: "",
    profilePic: "",
    processOne: "",
    processTwo: "",
    processThree: "",
    carouselAlbum: "",
  });
  let dbCopy = {};

  const editPhotoPageAlbum = ref<Boolean>(false);
  const editProfilePic = ref<Boolean>(false);
  const editProcessOne = ref<Boolean>(false);
  const editProcessTwo = ref<Boolean>(false);
  const editProcessThree = ref<Boolean>(false);
  const editCarouselAlbum = ref<Boolean>(false);

  const hasMadeChanges = computed<boolean>(
    () => JSON.stringify(adminURLs.value) !== JSON.stringify(dbCopy)
  );

  const initialFetch = async () => {
    const urls = await getAdminUrls();
    if (urls) {
      adminURLs.value = urls;
      dbCopy = JSON.parse(JSON.stringify(urls));
    }
    fetchImages();
  };

  const fetchImages = async () => {
    const pageImages = await getImgurImages(adminURLs.value.photoPageAlbum);
    const carouselImages = await getImgurImages(adminURLs.value.carouselAlbum);
    if (pageImages && pageImages.length > 0) {
      photoPageImages.value = pageImages;
    }
    if (carouselImages && carouselImages.length > 0) {
      aboutCarouselImages.value = carouselImages;
    }
  };

  const undoChanges = () => {
    adminURLs.value = JSON.parse(JSON.stringify(dbCopy));
    fetchImages();
  };

  const saveChanges = async () => {
    const saved = await updateAdminUrls(adminURLs.value);
    if (saved) {
      dbCopy = JSON.parse(JSON.stringify(adminURLs.value));
      adminURLs.value = JSON.parse(JSON.stringify(dbCopy)); // trigger hasMadeChanges computed update
    }
  };

  return {
    photoPageImages,
    aboutCarouselImages,
    adminURLs,
    hasMadeChanges,
    editPhotoPageAlbum,
    editProfilePic,
    editProcessOne,
    editProcessTwo,
    editProcessThree,
    editCarouselAlbum,
    initialFetch,
    undoChanges,
    saveChanges,
  };
});
