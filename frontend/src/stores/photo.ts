import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Photo } from "@/../../../common-types";

interface AdminURLs {
  photoPageAlbum: string;
  profilePic: string;
  processOne: string;
  processTwo: string;
  processThree: string;
  carouselAlbum: string;
}

const MOCK_DATA: Photo[] = [];
for (let i = 0; i < 15; i++) {
  MOCK_DATA.push({
    id: i,
    url: `https://picsum.photos/${Math.floor(
      Math.random() * (300 - 50 + 1) + 50
    )}/${Math.floor(Math.random() * (300 - 50 + 1) + 50)}`,
  });
}

const MOCK_URLS = {
  photoPageAlbum: "https://picsum.photos/id/0/367/267",
  profilePic: "https://picsum.photos/id/0/367/267",
  processOne: "https://picsum.photos/id/0/367/267",
  processTwo: "https://picsum.photos/id/0/367/267",
  processThree: "https://picsum.photos/id/0/367/267",
  carouselAlbum: "https://picsum.photos/id/0/367/267",
};

export const usePhotoStore = defineStore("photo", () => {
  const photoPageImages = ref<Photo[]>([]);
  const aboutCarouselImages = ref<Photo[]>([]);
  const adminURLs = ref<AdminURLs>({
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
    const urls = await MOCK_URLS;
    if (urls) {
      adminURLs.value = urls;
      dbCopy = JSON.parse(JSON.stringify(urls));
    }
    fetchImages();
  };

  const fetchImages = async () => {
    const pageImages = await MOCK_DATA; // use adminURLs.photoPageAlbum to fetch
    const carouselImages = await MOCK_DATA; // use adminURLs.carouselAlbum to fetch
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
  };
});
