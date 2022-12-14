import { customRef } from "vue";

const focusableElementsSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const useFocusTrap = () => {
  let firstInit: boolean = true;
  let focusableElements = [];
  let $firstFocusable: any;
  let $lastFocusable: any;
  const trapRef = customRef((track, trigger) => {
    let $trapEl: any = null;
    return {
      get() {
        track();
        return $trapEl;
      },
      set(value) {
        $trapEl = value;
        value ? initFocusTrap() : clearFocusTrap();
        trigger();
      },
    };
  });

  function keyHandler(e: any) {
    const isTabPressed = e.key === "Tab";

    if (!isTabPressed) return;

    if (e.shiftKey) {
      if (document.activeElement === $firstFocusable) {
        $lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === $lastFocusable) {
        $firstFocusable.focus();
        e.preventDefault();
      }
    }
  }

  function initFocusTrap() {
    // Bail out if there is no value
    if (!trapRef.value) return;
    focusableElements = trapRef.value.querySelectorAll(
      focusableElementsSelector
    );
    $firstFocusable = focusableElements[0];
    $lastFocusable = focusableElements[focusableElements.length - 1];
    document.addEventListener("keydown", keyHandler);
    if (firstInit) $firstFocusable.focus();
    firstInit = false;
  }

  function clearFocusTrap() {
    document.removeEventListener("keydown", keyHandler);
    firstInit = true;
  }

  return {
    trapRef,
    initFocusTrap,
    clearFocusTrap,
  };
};

export default useFocusTrap;
