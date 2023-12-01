import { deburr, isArray, lowerCase, orderBy } from "lodash";
import { BestMatch, findBestMatch, Rating } from "string-similarity";

interface ScoredSearchProps {
  originalArr: any[];
  strSearch: string;
  fieldSearch: string | string[];
  qtdRetItem?: number;
  minRate?: number;
}

/**
 * A function to make a search in an array of objects and return the best matches.
 *
 * @param options An object with the following properties:
 * - `options.originalArr` Array of elements to be searched.
 * - `options.strSearch` The string that will be used to search.
 * - `options.fieldSearch` The field or fields that will be compared with the search string.
 * - `options.qtdRetItem` The number of items to be returned.
 * - `options.minRate` The minimum rate of the search (a number between 0 and 1).
 *
 * @typeParam Type of the returned array.
 *
 * @returns The array of elements that best match the search string.
 */
export function scoredSearch<T>({
  originalArr,
  strSearch,
  fieldSearch,
  qtdRetItem = 4,
  minRate = 0.3,
}: ScoredSearchProps): T[] {
  if (originalArr.length === 0 || strSearch === "") {
    return originalArr;
  }

  const cleanString = (str: string): string => {
    return lowerCase(deburr(str));
  };

  const fields = isArray(fieldSearch) ? fieldSearch : [fieldSearch];

  let ret = originalArr.filter((f) =>
    fields.reduce<boolean>(
      (bool, field) =>
        cleanString(f[field]).indexOf(cleanString(strSearch)) > -1 || bool,
      false
    )
  );

  if (ret.length > 0) {
    return ret;
  }

  ret = [];

  const bms = fields.reduce<BestMatch[]>((arr, field) => {
    const arrOpt = originalArr.map((item) => item[field] ?? "");
    return [...arr, findBestMatch(strSearch, arrOpt)];
  }, []);

  const ratings = bms.reduce<Rating[]>(
    (arr, bm) => [...arr, ...bm.ratings],
    []
  );
  const sortedBm = orderBy(ratings, ["rating"], ["desc"]);

  for (let i = 0; i < qtdRetItem; i++) {
    if (sortedBm[i]) {
      const it = originalArr.filter((f) =>
        fields.reduce<boolean>(
          (bool, field) =>
            (f[field] === sortedBm[i].target && sortedBm[i].rating > minRate) ||
            bool,
          false
        )
      );
      ret.push(...it);
    }
  }

  return ret;
}
