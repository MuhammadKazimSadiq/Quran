export function useHighlight({ search, text, highlightClasses = "" }) {
  if (!search?.length) return text;

  search = Array.isArray(search) ? search : [search];

  let patterns = [];
  // adding arabic diacritics inside [] --> optional search after each letter
  search.forEach((i) => {
    patterns.push(
      i
        ?.split("")
        ?.reduce(
          (acc, char) =>
            (acc += !char.match(/\s/g) ? `${char}[ًٌٍَُِّْ]*` : " "),
          ""
        )
    );
  });

  let displayText = text;
  patterns?.forEach((pattern) => {
    const regex = new RegExp(pattern, "g");
    const matches = text.match(regex);

    matches?.forEach((match) => {
      displayText = displayText.replace(
        match,
        `<span class="${highlightClasses}">${match}</span>`
      );
    });
  });

  return displayText;
}
