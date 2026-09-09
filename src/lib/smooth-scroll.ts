/**
 * Natural, calibrated smooth scroll to anchor targets.
 * Uses native browser smooth scroll with sticky header offset for a crisp, natural motion.
 */
export function smoothScrollTo(targetId: string) {
  if (typeof window === "undefined") return;

  const cleanId = targetId.replace(/^#/, "");
  const target = document.getElementById(cleanId);
  if (!target) return;

  const headerOffset = 76; // Accommodates 64px sticky navbar + breathing room
  const elementPosition = target.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });

  if (history.pushState) {
    history.pushState(null, "", `#${cleanId}`);
  }
}
