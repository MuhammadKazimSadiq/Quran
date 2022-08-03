export function useIntersectionObserver({ elements, config, callback }) {
  let observer = new IntersectionObserver(callback, config);
  elements.forEach((elem) => observer.observe(elem));

  return observer;
}
