import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import type { Film } from "@/../../../common-types";
import { getAllFilms } from "@/api/films.api";

export const useFilmStore = defineStore("film", () => {
  const films = ref<Film[]>([]);
  let dbCopy: Film[] = [];
  const featuredFilm = computed<Film | undefined>(() =>
    films.value.find((f) => f.featured)
  );
  const hasMadeChanges = computed<boolean>(
    () => JSON.stringify(films.value) !== JSON.stringify(dbCopy)
  );
  const hasPlacementOverlap = computed<boolean>(() => {
    const placements: number[] = films.value.map((f: Film) => f.placement);
    return placements.length > new Set(placements).size;
  });

  const sortFilms = (list: Film[]): Film[] => {
    return list.sort(({ placement: a }, { placement: b }) => a - b);
  };

  const getFilms = async () => {
    const res = await getAllFilms();
    if (res) {
      const sorted = sortFilms(res);
      films.value = JSON.parse(JSON.stringify(sorted));
      dbCopy = JSON.parse(JSON.stringify(sorted));
    }
  };

  const getFilmDetails = async (slug: string): Promise<Film | null> => {
    if (films.value.length <= 0) {
      await getFilms();
    }

    return films.value.find((f: Film) => f.slug === slug) || null;
  };

  const undoChanges = () => {
    films.value = JSON.parse(JSON.stringify(dbCopy));
  };

  watch(
    films,
    () => {
      if (hasPlacementOverlap.value) {
        //Re-assign placements so there's no overlap
        films.value = films.value.map((f: Film, index: number) => {
          return {
            ...f,
            placement: index,
          };
        });
      }
    },
    { deep: true }
  );

  return {
    films,
    featuredFilm,
    hasMadeChanges,
    sortFilms,
    getFilms,
    getFilmDetails,
    undoChanges,
  };
});
