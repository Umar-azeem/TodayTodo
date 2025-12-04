import { useEffect } from "react";

export function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClick(event) {
      const popup = ref.current;

      const ignoreClasses = [
        "popover-content",
        "select-content",
        "cmdk-root",
        "cmdk-popover", 
      ];

      if (
        ignoreClasses.some(cls =>
          event.target.closest(`.${cls}`)
        )
      ) {
        return;
      }

      if (popup && !popup.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callback]);
}
