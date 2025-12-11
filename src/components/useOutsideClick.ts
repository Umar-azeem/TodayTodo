import { useEffect } from "react";

export function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClick(event) {
      const popup = ref.current;

      // elements that should NOT trigger close
      const ignoreSelectors = [
        "[data-radix-popover-content-wrapper]",
        "[data-radix-popover-content]",
        ".popover-content",
        ".cmdk-root",
        ".cmdk-popover",
        ".select-content",
      ];

      // click inside popover → ignore
      if (ignoreSelectors.some(sel => event.target.closest(sel))) {
        return;
      }

      // click outside popup → close
      if (popup && !popup.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callback]);
}
