// store
import { useStore } from "../store/store";

// models
import Chapter from "../model/Chapter";
import Verse from "../model/Verse";
import Bookmark from "../model/Bookmark";
import Vocabulary from "../model/Vocabulary";
import Translation from "../model/Translation";
import Setting from "../model/Setting";
import Topic from "../model/Topic";
import VerseTopic from "../model/VerseTopic";

// composables
import { useStringManipulate } from "./stringManipulate";
import { useGroup } from "./group";

const classes = {
  Chapter,
  Verse,
  Bookmark,
  Vocabulary,
  Translation,
  Setting,
  Topic,
  VerseTopic,
};

export function useReplace(
  resource,
  id,
  {
    replaceWithIndex = false,
    indexColumn = null,
    storeName = null,
    modelName = null,
    group = false,
    groupConfig = {},
  }
) {
  const store = useStore();

  return new Promise((resolve, reject) => {
    // plural version of resource
    const pluralResource =
      storeName ?? useStringManipulate(resource, "pluralize");
    // capitalize first letter of resource
    const resourceModel =
      modelName ?? useStringManipulate(resource, "capitalize");

    classes[resourceModel]
      .get(id)
      .then((result) => {
        const newResource = !group ? result : useGroup(result, groupConfig);

        const index = !replaceWithIndex
          ? id - 1
          : store[pluralResource].findIndex(
              (r) => r[indexColumn] === newResource[0][indexColumn]
            );

        store[pluralResource].splice(index, 1, newResource[0]);

        console.log(`message: ${pluralResource} replaced`);
        resolve();
      })
      .catch((err) => reject(err));
  });
}
