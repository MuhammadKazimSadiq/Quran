export function useScrollTo(elem, { offset = 90 } = {}) {
  if (!elem) return;

  // elem.scrollIntoView({ behavior: "smooth", block: "center" });

  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = elem.getBoundingClientRect().top;
  const elementPos = elementRect - bodyRect;
  const offsetPos = elementPos - offset;

  window.scrollTo({
    top: offsetPos,
    behavior: "smooth",
  });
}
