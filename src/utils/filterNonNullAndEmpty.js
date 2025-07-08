import { filterNonNull } from "neetocist";
import { isEmpty } from "ramda";

export const filterNonNullAndEmpty = params => {
  const nonNullParams = filterNonNull(params);

  return Object.fromEntries(
    Object.entries(nonNullParams).filter(([_, value]) => !isEmpty(value))
  );
};
