// import { useEffect } from "react";

// export function useOutsideClick(ref, callback) {
//   useEffect(() => {
//     function handleClick(event) {
//       const popup = ref.current;
//       if (!popup) return;

//       const target = event.target as HTMLElement;

//       // 🔴 Radix UI portals ko ignore karo
//       if (
//         target.closest("[data-radix-portal]") ||
//         target.closest("[data-radix-popover-content]") ||
//         target.closest("[data-radix-select-content]") ||
//         target.closest("[cmdk-root]")
//       ) {
//         return; // ❌ popup close mat karo
//       }

//       // ✅ real outside click → close popup
//       if (!popup.contains(target)) {
//         callback();
//       }
//     }

//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, [ref, callback]);
// }
