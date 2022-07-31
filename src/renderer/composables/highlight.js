export function useHighlight({ search, text, highlightClasses = "" }) {
  if (!search?.length) return text;

  // adding arabic diacritics inside [] --> optional search after each letter
  const pattern = search
    ?.split("")
    ?.reduce(
      (acc, char) => (acc += !char.match(/\s/g) ? `${char}[ًٌٍَُِّْ]*` : " "),
      ""
    );

  const regex = new RegExp(pattern, "g");
  const matches = text.match(regex);

  let displayText = text;
  matches?.forEach((match) => {
    displayText = displayText.replace(
      match,
      `<span class="${highlightClasses}">${match}</span>`
    );
  });

  return displayText;
}
