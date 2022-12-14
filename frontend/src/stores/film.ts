import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import type { Film } from "@/../../../common-types";
import { getAllFilms, saveEditedFilm, saveNewFilm } from "@/api/films.api";

export const useFilmStore = defineStore("film", () => {
  const films = ref<Film[]>([]);
  const showSavingLoader = ref<boolean>(false);
  const editedFilms = ref<string[]>([]);
  const newFilms = ref<string[]>([]);
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
    showSavingLoader.value = false;
  };

  const getFilmDetails = async (slug: string): Promise<Film | null> => {
    if (films.value.length <= 0) {
      await getFilms();
    }
    const found = films.value.find((f: Film) => f.slug === slug);
    return found ? found : null;
  };

  const saveChanges = () => {
    showSavingLoader.value = true;
    let allChangesSuccessfull = true;

    if (editedFilms.value.length > 0) {
      editedFilms.value.forEach(async (id: string) => {
        const film = films.value.find((f: Film) => f._id === id);
        if (film) {
          const savedFilm = await saveEditedFilm(film);
          if (!savedFilm) {
            allChangesSuccessfull = false;
          }
        }
      });
    }

    if (newFilms.value.length > 0) {
      newFilms.value.forEach(async (id: string) => {
        const film = films.value.find((f: Film) => f._id === id);
        if (film) {
          const savedFilm = await saveNewFilm(film);
          if (!savedFilm) allChangesSuccessfull = false;
        }
      });
    }

    if (allChangesSuccessfull) setTimeout(() => getFilms(), 1000);
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

  watch(hasMadeChanges, (is, was) => {
    if (was && !is) {
      editedFilms.value = [];
      newFilms.value = [];
    }
  });

  return {
    films,
    showSavingLoader,
    editedFilms,
    newFilms,
    featuredFilm,
    hasMadeChanges,
    sortFilms,
    getFilms,
    getFilmDetails,
    saveChanges,
    undoChanges,
  };
});
