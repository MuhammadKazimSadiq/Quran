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
import Reciter from "../model/Reciter";

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
  Reciter,
};

export function useFetch(
  resource,
  {
    forceFetch = false,
    storeName = null,
    modelName = null,
    group = false,
    groupConfig = {},
    toObject = false,
    toObjectConfig = {},
  } = {}
) {
  // store
  const store = useStore();

  return new Promise((resolve, reject) => {
    // plural version of resource
    const pluralResource =
      storeName ?? useStringManipulate(resource, "pluralize");
    // capitalize first letter of resource
    const resourceModel =
      modelName ?? useStringManipulate(resource, "capitalize");

    console.log(`message: Fetching ${pluralResource}...`);

    if (!forceFetch && store[pluralResource] && store[pluralResource].length)
      return resolve(`message: ${pluralResource} already exist`);

    classes[resourceModel]
      .all()
      .then((result) => {
        // if toObject = true --> convert array to object
        if (toObject) {
          store[pluralResource] = result.reduce((acc, row) => {
            let name = toObjectConfig?.name ?? row.name;
            let value = toObjectConfig?.value ?? row.value;

            acc[name] = JSON.parse(value);
            return acc;
          }, {});
        } else {
          store[pluralResource] = !group
            ? result
            : useGroup(result, groupConfig);
        }
        resolve();
      })
      .catch((err) => reject(err));
  });
}
