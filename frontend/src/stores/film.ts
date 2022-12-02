import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Film } from "@/../../../common-types";

const MOCK_DATA = [
  {
    id: 0,
    placement: 1,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #1",
    slug: "film-one",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 1,
    placement: 2,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #2 with a long title to see what happens",
    slug: "film-two",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 2,
    placement: 0,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #3",
    slug: "film-three",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: true,
  },
  {
    id: 3,
    placement: 3,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #4",
    slug: "film-four",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 4,
    placement: 4,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #5",
    slug: "film-five",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 5,
    placement: 5,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #6",
    slug: "film-six",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 6,
    placement: 6,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #7",
    slug: "film-seven",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 7,
    placement: 7,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #8",
    slug: "film-four",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 8,
    placement: 8,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #9",
    slug: "film-five",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 9,
    placement: 9,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #10",
    slug: "film-six",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 10,
    placement: 10,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #11",
    slug: "film-seven",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 11,
    placement: 11,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #12",
    slug: "film-four",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 12,
    placement: 12,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #13",
    slug: "film-five",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 13,
    placement: 13,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #14",
    slug: "film-six",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
  {
    id: 14,
    placement: 14,
    src: "",
    thumbnail: "https://picsum.photos/id/0/367/267",
    title: "Film #15",
    slug: "film-seven",
    description:
      "Film description to be shown under the movie is now shown in full so that the user can get more context about the film.",
    type: "Artistic",
    date: "01/11/2022",
    location: "Nice, France",
    credits: [],
    frames: [],
    featured: false,
  },
];

export const useFilmStore = defineStore("film", () => {
  const films = ref<Film[]>([]);
  let dbCopy: Film[] = [];
  const featuredFilm = computed<Film | undefined>(() =>
    films.value.find((f) => f.featured)
  );
  const hasMadeChanges = computed<boolean>(
    () => JSON.stringify(films.value) !== JSON.stringify(dbCopy)
  );

  const sortFilms = (list: Film[]): Film[] => {
    return list.sort(({ placement: a }, { placement: b }) => a - b);
  };

  const getFilms = async () => {
    const res = await MOCK_DATA;
    if (res) {
      const sorted = sortFilms(res);
      films.value = JSON.parse(JSON.stringify(sorted));
      dbCopy = JSON.parse(JSON.stringify(sorted));
    }
  };

  const undoChanges = () => {
    films.value = JSON.parse(JSON.stringify(dbCopy));
  };

  return {
    films,
    featuredFilm,
    hasMadeChanges,
    sortFilms,
    getFilms,
    undoChanges,
  };
});
