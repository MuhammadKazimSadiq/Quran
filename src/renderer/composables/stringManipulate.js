export function useStringManipulate(string, fn) {
  const methods = {
    pluralize: (string) => {
      if (string.endsWith("s")) return string;
      return `${string}s`;
    },
    capitalize: (string) => string.charAt(0).toUpperCase() + string.slice(1),
  };

  return methods[fn](string);
}
