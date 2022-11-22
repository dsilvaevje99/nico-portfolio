import { useFilmStore } from "@/stores/film";

// https://code-boxx.com/drag-drop-sortable-list-javascript/
export const handleFilmDragDrop = (target: any) => {
  const store = useFilmStore();
  // (A) SET CSS + GET ALL LIST ITEMS
  target.classList.add("drag-drop--container");
  const items = target.getElementsByTagName("tr");
  let current: any = null;
  let previous: any = null;
  let firstLoop: Boolean = true;

  // (B) MAKE ITEMS DRAGGABLE + SORTABLE
  for (const i of items) {
    // (B1) ATTACH DRAGGABLE
    if (!firstLoop) i.draggable = true;
    else i.draggable = false;
    firstLoop = false;

    // (B2) DRAG START - YELLOW HIGHLIGHT DROPZONES
    i.ondragstart = (ev: any) => {
      current = i;
      previous = i.previousSibling;
    };

    // (B3) DRAG ENTER - RED HIGHLIGHT DROPZONE
    i.ondragenter = (ev: any) => {
      if (i != current && i != previous) {
        i.classList.add("active");
      }
    };

    // (B4) DRAG LEAVE - REMOVE RED HIGHLIGHT
    i.ondragleave = () => {
      i.classList.remove("active");
    };

    // (B5) DRAG END - REMOVE ALL HIGHLIGHTS
    i.ondragend = () => {
      for (const it of items) {
        it.classList.remove("active");
      }
    };

    // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
    i.ondragover = (evt: any) => {
      evt.preventDefault();
    };

    // (B7) ON DROP - DO SOMETHING
    i.ondrop = (evt: any) => {
      evt.preventDefault();
      if (i != current && i != previous) {
        const storeCopy = JSON.parse(JSON.stringify([...store.films]));
        // Get item's current & new index, and copy the item itself
        const currIndex = current.id.slice(-2).replace("-", "");
        const newIndex = parseInt(i.id.slice(-2).replace("-", "")) + 1;
        const movingItem = JSON.parse(
          JSON.stringify({ ...storeCopy[currIndex] })
        );
        // Remove the original item from array
        storeCopy.splice(currIndex, 1);
        // Insert it into it's new location
        storeCopy.splice(newIndex, 0, movingItem);
        // Re-assign placement for all items to account for change
        for (let x = 0; x < storeCopy.length; x++) {
          storeCopy[x].placement = x;
        }
        store.films = storeCopy;
      }
    };
  }
};
